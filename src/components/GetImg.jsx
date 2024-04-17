import React from 'react'
import Articles from './Articles'
import { useState, useEffect } from 'react'

export default function GetImg({images}) {
    //const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true);

    /*useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(
            `https://api.unsplash.com/photos?client_id=${import.meta.env.VITE_API_KEY}`
            )
            const data = await response.json()
            console.log(data)
            setImages(data)
        }
        fetchImages()
    }, [])*/

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
            <div class="rounded-md h-12 w-12 border-4 border-t-4 border-[#77B0AA] animate-spin absolute"></div>
          </div>
          
        ) : (
            <ul className="[@media(min-width:2000px)]:px-[300px] [column-count:4] gap-x-[20px] [@media(min-width:1200px)]:px-2 [@media(max-width:1200px)]:[column-count:3] [@media(max-width:1200px)]:px-4 [@media(max-width:1200px)]:gap-x-[10px] [@media(max-width:800px)]: [@media(max-width:800px)]:[column-count:2] [@media(max-width:800px)]:gap-x-[10px] [@media(max-width:800px)]:px-2 [@media(max-width:600px)]: [@media(max-width:600px)]:[column-count:1]">
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
