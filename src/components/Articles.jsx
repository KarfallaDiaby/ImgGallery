import React from 'react'
import { format } from "date-fns"
import { useState } from 'react';
import SharePopup from './SharePopup';
import FileSaver, { saveAs } from 'file-saver';

export default function Articles({ id, urls, user, created_at, likes, links }) {

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [valeurRecuperee, setValeurRecuperee] = useState("");

  const handleDownload = async () => {
    try {
      // Récupérer l'image depuis son URL
      const response = await fetch(urls.full);
      const blob = await response.blob();

      // Créer une URL pour le blob
      const url = window.URL.createObjectURL(new Blob([blob]));

      // Créer un élément <a> pour le téléchargement
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', imageName);

      // Simuler un clic sur le lien pour démarrer le téléchargement
      document.body.appendChild(link);
      link.click();

      // Nettoyer
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
    }
  };

  const handleClick = (valeur) => {
    setValeurRecuperee(valeur); // Mettre à jour l'état avec la valeur récupérée
    document.getElementById('my_modal_2').showModal(); // Afficher le dialogue
    /*console.log(valeur); // Afficher la valeur dans la console*/
  };


  return (
    <>
    <div>
      <div class="w-full h-auto mx-[auto] my-[4%] rounded-lg group relative items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
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
                src={user.profile_image.medium}
                alt={user.username}
                className="rounded-full mr-2 w-10 md:w-auto"
            />
            <ul>
              <li className="text-white font-bold">{user.name}</li>
              <li className="text-sm text-white opacity-80">
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
