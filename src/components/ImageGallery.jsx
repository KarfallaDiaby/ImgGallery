import React, { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import axios from 'axios';
import GetImg from './GetImg';

const API_URL = 'https://api.unsplash.com/search/photos';
const API_HOME_URL = 'https://api.unsplash.com/photos';
const IMAGES_PER_PAGE = 30;

export default function ImageGallery({ searchQuery, page, setPage }) {
  const [img, setImg] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const fetchImages = useCallback(async () => {
    if (loading) return;

    const cacheKey = `${debouncedSearchQuery || 'home'}-${page}`;
    if (cache[cacheKey]) {
      setImg(cache[cacheKey].images);
      setTotalPages(cache[cacheKey].totalPages);
      setLoading(false);
      setInitialLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      let data;
      if (debouncedSearchQuery) {
        const response = await axios.get(
          `${API_URL}?query=${debouncedSearchQuery}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
        );
        data = response.data;
        setImg(data.results || []);
        setTotalPages(data.total_pages || 0);
        setCache((prev) => ({
          ...prev,
          [cacheKey]: { images: data.results || [], totalPages: data.total_pages || 0 },
        }));
      } else {
        const response = await axios.get(
          `${API_HOME_URL}?page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
        );
        data = response.data;
        setImg(data || []);
        setTotalPages(data.total_pages || Infinity);
        setCache((prev) => ({
          ...prev,
          [cacheKey]: { images: data || [], totalPages: data.total_pages || Infinity },
        }));
      }
    } catch (error) {
      setError('Erreur lors du chargement des images. Veuillez réessayer.');
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [debouncedSearchQuery, page, loading, cache]);

  useEffect(() => {
    setPage(1);
    setInitialLoading(true);
  }, [debouncedSearchQuery, setPage]);

  useEffect(() => {
    fetchImages();
  }, [page, fetchImages]);

  return (
    <div className="min-h-screen">
      {initialLoading && (
        <div className="text-center py-8 text-black dark:text-white">
          Chargement...
        </div>
      )}
      {error && (
        <div className="text-center py-8 text-red-500">
          {error}
        </div>
      )}
      {!initialLoading && !error && img.length === 0 && (
        <div className="text-center py-8 text-black dark:text-white">
          Aucune image trouvée.
        </div>
      )}
      <GetImg images={img} />
      {loading && !initialLoading && (
        <div className="text-center py-8 text-black dark:text-white">
          <div className="rounded-md h-12 w-12 border-4 border-t-4 border-[#77B0AA] animate-spin mx-auto"></div>
        </div>
      )}
      <div className="flex justify-center items-center py-12 dark:bg-black dark:text-white">
        {page > 1 && (
          <button
            className="mx-4 flex justify-center items-center bg-[#77B0AA] rounded-lg p-4 hover:dark:bg-[#94dbd4] disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={loading}
            aria-label="Page précédente"
          >
            <ion-icon name="chevron-back-outline"></ion-icon>
            Précédent
          </button>
        )}
        {page < totalPages && (
          <button
            className="mx-4 flex justify-center items-center bg-[#77B0AA] rounded-lg p-4 hover:dark:bg-[#94dbd4] disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={loading}
            aria-label="Page suivante"
          >
            Suivant
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </button>
        )}
        {page >= totalPages && totalPages !== 0 && img.length > 0 && (
          <div className="text-center py-8 text-black dark:text-white">
            Plus d'images à charger.
          </div>
        )}
      </div>
    </div>
  );
}