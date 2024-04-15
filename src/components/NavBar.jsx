import React from 'react'

export default function NavBar() {
  return (
    <>
        <nav>
            <div className='w-full flex justify-between items-center  text-[#939393] py-2 pl-5 border-b border-[#939393]'>
                <div className='flex items-center w-[72%]'>
                    <h1 className='text-black text-[22pt] font-bold'>Logo</h1>
                    <div className='w-full flex items-center ml-6 bg-[#E9E9E9] py-2 px-4 rounded-full '>
                        <span className='text-[16pt] mr-3'><ion-icon name="search-outline"></ion-icon></span>
                        <input className='bg-transparent text-[11pt] w-full outline-0 text-black' type="search" placeholder='Rechercher...'/>
                    </div>
                </div>
                <ul className='flex justify-center items-center text-[11pt]'>
                    <div className='flex justify-center items-center'>
                        <li className='mx-1 py-2 px-4 rounded-full cursor-pointer hover:bg-[#E9E9E9]'>Créer</li>
                        <li className='mx-1 py-2 px-4 rounded-full cursor-pointer hover:bg-[#E9E9E9]'>A propos</li>
                        <li className='mx-1  text-black text-[14pt] py-2 px-4 rounded-full cursor-pointer'><ion-icon name="moon"></ion-icon></li>
                    </div>
                    <li className='ml-2  px-7 py-3 border-l border-[#939393] cursor-pointer'>Connexion</li>
                </ul>
            </div>
            <ul className='flex justify-center items-center text-[11pt] font-semibold py-8'>
                <li className='mx-1 py-2 px-4 rounded-full cursor-pointer hover:bg-[#E9E9E9]'>Branding</li>
                <li className='mx-1 py-2 px-4 rounded-full cursor-pointer hover:bg-[#E9E9E9]'>Illustration</li>
                <li className='mx-1 py-2 px-4 rounded-full cursor-pointer hover:bg-[#E9E9E9]'>Web design</li>
                <li className='mx-1 py-2 px-4 rounded-full cursor-pointer hover:bg-[#E9E9E9]'>Accessoirs</li>
                <li className='mx-1 py-2 px-4 rounded-full cursor-pointer hover:bg-[#E9E9E9]'>Typographie</li>
                <li className='mx-1 py-2 px-4 rounded-full cursor-pointer hover:bg-[#E9E9E9]'>Manga</li>
            </ul>
        </nav>
    </>
  )
}
