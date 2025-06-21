import React, { useState } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import SharePopup from './SharePopup';
import { saveAs } from 'file-saver';

export default function Articles({ id, urls, user, created_at, likes, links, description, width, height, color, sponsorship }) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleShare = () => {
    setIsOpenPopup(true);
  };

  const handleClosePopup = () => {
    setIsOpenPopup(false);
  };

  return (
    <>
      <div
        onClick={() => setIsOpenDetails(true)}
        className="w-full mx-auto mb-8 rounded-3xl group relative cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/30 sm:mb-6 md:mb-7 z-10 bg-card"
      >
        <div className="relative z-10 w-full" style={{ paddingTop: '133.33%' }}>
          <img
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={urls.regular}
            alt={description || `Image by ${user.username}`}
            loading="lazy"
            style={{ objectPosition: 'center' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70 z-20"></div>
        <div className="px-6 py-5 absolute inset-0 flex flex-col justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30">
          <div className="flex items-center">
            <img
              src={user.profile_image.small}
              alt={`Profile of ${user.username}`}
              className="rounded-full mr-3 w-14 md:w-12"
            />
            <ul>
              <li className="text-base text-white font-bold">{user.name}</li>
              <li className="text-sm text-white opacity-80">
                {format(new Date(created_at), 'dd MMMM yyyy')}
              </li>
            </ul>
          </div>
          <div className="flex justify-end items-center">
            <button
              onClick={(e) => { e.stopPropagation(); handleShare(); }}
              className="mr-6 text-5xl text-white cursor-pointer hover:text-[#77B0AA]"
              aria-label="Partager l'image"
            >
              <ion-icon name="share-social"></ion-icon>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); saveAs(urls.full, 'image.jpg'); }}
              className="text-5xl text-white cursor-pointer hover:text-[#77B0AA]"
              aria-label="Télécharger l'image"
            >
              <ion-icon name="download"></ion-icon>
            </button>
          </div>
        </div>
      </div>

      {/* Modale des détails */}
      <AnimatePresence>
        {isOpenDetails && (
          <Dialog open={isOpenDetails} onOpenChange={setIsOpenDetails}>
            <DialogOverlay className="bg-black/60 backdrop-blur-xs z-50" />
            <DialogContent className="bg-glass-light dark:bg-glass-dark backdrop-blur-xs border border-gray-300/50 dark:border-gray-700/50 rounded-3xl p-0 max-w-4xl w-full mx-4 my-8 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto hide-scroll-bar"
              >
                {/* Image */}
                <div className="lg:w-2/3 relative">
                  <img
                    src={urls.regular}
                    alt={description || `Image by ${user.username}`}
                    className="w-full h-full object-contain rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
                    loading="lazy"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
                    onClick={() => setIsOpenDetails(false)}
                    aria-label="Fermer la modale"
                  >
                    <ion-icon name="close-outline" className="text-3xl"></ion-icon>
                  </Button>
                </div>

                {/* Détails */}
                <div className="lg:w-1/3 p-6 flex flex-col space-y-4 bg-card">
                  <div className="flex items-center">
                    <img
                      src={user.profile_image.medium}
                      alt={`Profile of ${user.username}`}
                      className="rounded-full w-10 h-10 mr-3"
                    />
                    <div>
                      <a
                        href={user.links.html}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-bold text-gray-900 dark:text-white hover:text-primary"
                      >
                        {user.name}
                      </a>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {format(new Date(created_at), 'dd MMMM yyyy')}
                      </p>
                    </div>
                  </div>

                  {description && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Dimensions</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{width} × {height}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Couleur</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: color }}></div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{color}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Likes</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{likes}</p>
                    </div>
                  </div>

                  {sponsorship && (
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Sponsorisé par</p>
                      <a
                        href={sponsorship.tagline_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {sponsorship.sponsor.name} - {sponsorship.tagline}
                      </a>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <Button
                      onClick={handleShare}
                      className="flex-1 bg-primary text-white hover:bg-primary-dark rounded-full text-sm py-2"
                      aria-label="Partager l'image"
                    >
                      <ion-icon name="share-social" className="text-lg mr-2"></ion-icon>
                      Partager
                    </Button>
                    <Button
                      onClick={() => saveAs(urls.full, 'image.jpg')}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full text-sm py-2"
                      aria-label="Télécharger l'image"
                    >
                      <ion-icon name="download" className="text-lg mr-2"></ion-icon>
                      Télécharger
                    </Button>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* SharePopup */}
      <AnimatePresence>
        {isOpenPopup && (
          <Dialog open={isOpenPopup} onOpenChange={setIsOpenPopup}>
            <DialogOverlay className="bg-white/20 backdrop-blur-xs z-50" />
            <DialogContent className="bg-glass-light dark:bg-glass-dark backdrop-blur-xs border border-gray-300/50 dark:border-gray-700/50 rounded-3xl p-6 max-w-md w-full mx-4">
              <SharePopup shareUrl={links.html} onClose={handleClosePopup} />
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}