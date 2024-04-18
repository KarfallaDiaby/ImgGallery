import React from 'react'
import { format } from "date-fns"
import { useState } from 'react';
import SharePopup from './SharePopup';
import FileSaver, { saveAs } from 'file-saver';

export default function Articles({ id, urls, user, created_at, likes, links }) {

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [valeurRecuperee, setValeurRecuperee] = useState("");

  const handleClick = (valeur) => {
    setValeurRecuperee(valeur); // Mettre à jour l'état avec la valeur récupérée
    document.getElementById('my_modal_2').showModal(); // Afficher le dialogue
    /*console.log(valeur); // Afficher la valeur dans la console*/
  };


  return (
    <>
    <div>
      <div class="w-full h-auto mx-[auto] mb-[20px] rounded-[25px] group relative items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 [@media(max-width:800px)]:mb-12px] [@media(max-width:1200px)]:mb-[14px]">
        <div class="">
          <img 
            class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
            src={urls.regular}
            alt={user.username}
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
        <div class="px-5 py-4 absolute inset-0 flex flex-col justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className='flex items-center'>
            <img
                src={user.profile_image.small}
                alt={user.username}
                className="rounded-full mr-2 w-10 md:w-auto"
            />
            <ul>
              <li className="text-[10pt] text-white font-bold">{user.name}</li>
              <li className="text-[8pt] text-white opacity-80">
                {format(new Date(created_at), "dd MMMM yyyy")}
              </li>
            </ul>
          </div>
          <div className='flex justify-end items-center'>
            <span onClick={() => handleClick(user.name)} className='mr-6 text-4xl text-white cursor-pointer hover:text-[#77B0AA]'><ion-icon name="share-social"></ion-icon></span>
            <span onClick={() => {
              FileSaver.saveAs(urls.full, "image.jpg")
            }} className='text-4xl text-white cursor-pointer hover:text-[#77B0AA]'><ion-icon name="download"></ion-icon></span>
          </div>
        </div>
      </div>

      <SharePopup valeur={valeurRecuperee}/>
      
    </div>
    </>
  )
}
