import React from 'react'
import Articles from './Articles'
import { useState, useEffect } from 'react'

export default function GetImg() {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(
            `https://api.unsplash.com/photos?client_id=EfRDUo9VRhmNd3bzyYBB9uvgd77e2hJc9dArA8eWgpo`
            )
            const data = await response.json()
            console.log(data)
            setImages(data)
        }
        fetchImages()
    }, [])

    useEffect(() => {
      // Simuler un chargement asynchrone
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, []);

  return (
    <>  
        {loading ? (
          <div className='w-full flex justify-center'>
            <div class="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
          </div>
          
        ) : (
            <ul className="[column-count:4] gap-x-[20px][@media(max-width:1200px)]: [@media(max-width:1200px)]:[column-count:3] [@media(max-width:1200px)]:gap-x-[20px] [@media(max-width:800px)]: [@media(max-width:800px)]:[column-count:2] [@media(max-width:800px)]:gap-x-[20px] [@media(max-width:600px)]: [@media(max-width:600px)]:[column-count:1]">
                <li className="">
                    {images.map((image) => (
                    <Articles key={image.id} {...image} />
                    ))}
                </li>
            </ul>
            
            








            
        )}
    </>
  )
}
