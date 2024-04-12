import React from 'react'
import { format } from "date-fns"

export default function Articles({ id, urls, user, created_at, likes }) {
  return (
    <>
        <img
            src={urls.regular}
            alt={user.username}
            className="w-full h-auto mx-[auto] my-[4%] cursor-pointer rounded-lg hover:bg"
        />
        <div className='flex items-center'>
            <img
                src={user.profile_image.medium}
                alt={user.username}
                className="rounded-full mr-2 w-10 md:w-auto"
            />
            <ul>
                <li className="text-slate-800 font-bold">{user.name}</li>
                <li className="text-sm text-slate-800 opacity-75">
                  {format(new Date(created_at), "dd MMMM yyyy")}
                </li>
              </ul>
        </div>
        
    </>
  )
}
