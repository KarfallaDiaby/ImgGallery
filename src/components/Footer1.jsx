import React from 'react'
import './Footer1.css'

export default function Footer1() {
  return (
    <footer className="footer">
    <div className="owl-carousel">
        <a href="#" className="gallery__photo">
        <img
            src="https://images.unsplash.com/photo-1587354246490-7e26e63fcaa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGhhaWxhbmR8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
        />
        <div className="gallery__fade">
            <i className="gallery__icon" data-feather="instagram" />
        </div>
        </a>
        <a href="#" className="gallery__photo">
        <img
            src="https://images.unsplash.com/photo-1510872893374-80379d91fc92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
        />
        <div className="gallery__fade">
            <i className="gallery__icon" data-feather="instagram" />
        </div>
        </a>
        <a href="#" className="gallery__photo">
        <img
            src="https://images.unsplash.com/photo-1590785204309-9888edf27ab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHRoYWlsYW5kfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
        />
        <div className="gallery__fade">
            <i className="gallery__icon" data-feather="instagram" />
        </div>
        </a>
        <a href="#" className="gallery__photo">
        <img
            src="https://images.unsplash.com/photo-1507646227500-4d389b0012be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
        />
        <div className="gallery__fade">
            <i className="gallery__icon" data-feather="instagram" />
        </div>
        </a>
        <a href="#" className="gallery__photo">
        <img
            src="https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
        />
        <div className="gallery__fade">
            <i className="gallery__icon" data-feather="instagram" />
        </div>
        </a>
        <a href="#" className="gallery__photo">
        <img
            src="https://images.unsplash.com/photo-1541048162979-c9ca04d625d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dGhhaWxhbmR8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
        />
        <div className="gallery__fade">
            <i className="gallery__icon" data-feather="instagram" />
        </div>
        </a>
    </div>
    <div className="footer__redes">
        <ul className="footer__redes-wrapper">
        <li>
            <a href="#" className="footer__link">
            <i className="fab fa-facebook-f" />
            facebook
            </a>
        </li>
        <li>
            <a href="#" className="footer__link">
            <i className="fab fa-twitter" />
            twitter
            </a>
        </li>
        <li>
            <a href="#" className="footer__link">
            <i className="fab fa-instagram" />
            instagram
            </a>
        </li>
        <li>
            <a href="#" className="footer__link">
            <i className="fab fa-youtube" />
            youtube
            </a>
        </li>
        </ul>
    </div>
    <div className="separador" />
    <p className="footer__texto">Copyright @ 2022</p>
    </footer>

  )
}
