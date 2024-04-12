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
                        <input className='bg-transparent text-[11pt] w-full outline-0 text-black' type="text" placeholder='Rechercher...'/>
                    </div>
                </div>
                <ul className='flex justify-center items-center text-[11pt]'>
                    <div className='flex justify-center items-center'>
                        <li className='mx-5'>Créer</li>
                        <li className='mx-5'>A propos</li>
                        <li className='mx-5  text-black text-[14pt]'><ion-icon name="moon"></ion-icon></li>
                    </div>
                    <li className='ml-2  px-7 py-3 border-l border-[#939393]'>Connexion</li>
                </ul>
            </div>
            <ul className='flex justify-center items-center text-[11pt] font-semibold py-8'>
                <li className='mx-3'>Branding</li>
                <li className='mx-3'>Illustration</li>
                <li className='mx-3'>Web design</li>
                <li className='mx-3'>Accessoirs</li>
                <li className='mx-3'>Typographie</li>
                <li className='mx-3'>Manga</li>
            </ul>
        </nav>
    </>
  )
}
