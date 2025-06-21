import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '../assets/img/6531811.png';
import LogoD from '../assets/img/6531812.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  'Branding',
  'Illustration',
  'Web design',
  'Accessoires',
  'Typographie',
  'Manga',
];

export default function NavBar({ onSearch, onThemeSwitch, theme }) {
  const searchInput = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch(searchInput.current.value);
    }
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    onSearch(selection);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const getInitial = (user) => {
    if (user?.displayName) return user.displayName.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-glass-light dark:bg-glass-dark backdrop-blur-xs shadow-lg transition-all duration-500 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.img
              className="w-12 h-12"
              src={theme === 'dark' ? LogoD : Logo}
              alt="Logo"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
          </Link>

          {/* Barre de recherche */}
          <div className="hidden md:flex flex-1 mx-8 max-w-lg">
            <div className="relative w-full group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors">
                <ion-icon name="search-outline" className="text-2xl"></ion-icon>
              </span>
              <Input
                ref={searchInput}
                onKeyDown={handleKeyPress}
                className="pl-12 pr-4 py-3 w-full rounded-full bg-white/20 dark:bg-gray-800/30 text-gray-900 dark:text-white border border-gray-300/50 dark:border-gray-700/50 focus:ring-2 focus:ring-primary focus:border-transparent shadow-inner transition-all duration-300"
                type="search"
                placeholder="Explorez l'inspiration..."
                aria-label="Rechercher des images"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={onThemeSwitch}
                className="text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary rounded-full"
                aria-label={`Passer au thème ${theme === 'dark' ? 'clair' : 'sombre'}`}
              >
                {theme === 'dark' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </Button>
            </motion.div>
            {currentUser ? (
              <>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary rounded-full"
                    aria-label="Ajouter une image"
                  >
                    <Link to="/upload">
                      <ion-icon name="add-circle-outline" className="text-3xl"></ion-icon>
                    </Link>
                  </Button>
                </motion.div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-2 hover:bg-primary/20 rounded-full"
                        aria-label="Menu profil"
                      >
                        <Avatar className="w-10 h-10 border-2 border-primary/50">
                          <AvatarFallback className="bg-primary text-white font-bold text-lg">
                            {getInitial(currentUser)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-60 bg-glass-light dark:bg-glass-dark backdrop-blur-xs border border-gray-300/50 dark:border-gray-700/50 shadow-2xl rounded-xl mt-2"
                    align="end"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <DropdownMenuLabel className="text-gray-900 dark:text-white font-bold text-lg px-4 py-3">
                        {currentUser.displayName || currentUser.email}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-300/50 dark:bg-gray-700/50" />
                      <DropdownMenuItem asChild>
                        <Link
                          to="/profile"
                          className="w-full text-gray-700 dark:text-gray-200 hover:bg-primary/20 hover:text-primary cursor-pointer px-4 py-3 text-base font-medium"
                        >
                          Mon profil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/upload"
                          className="w-full text-gray-700 dark:text-gray-200 hover:bg-primary/20 hover:text-primary cursor-pointer px-4 py-3 text-base font-medium"
                        >
                          Téléverser une image
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="w-full text-red-600 dark:text-red-400 hover:bg-red-600/20 hover:text-red-700 cursor-pointer px-4 py-3 text-base font-medium"
                      >
                        Déconnexion
                      </DropdownMenuItem>
                    </motion.div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    asChild
                    className="text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/20 rounded-full px-4 py-2 text-base font-medium"
                  >
                    <Link to="/login">Se connecter</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary rounded-full px-6 py-2 text-base font-bold shadow-lg"
                  >
                    <Link to="/signup">S'inscrire</Link>
                  </Button>
                </motion.div>
              </>
            )}
          </div>

          {/* Menu mobile */}
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-4xl text-gray-600 dark:text-gray-300 hover:text-primary"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <ion-icon name={isMenuOpen ? 'close-outline' : 'menu-outline'}></ion-icon>
            </Button>
          </motion.div>
        </div>

        {/* Menu mobile slide-in */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-0 right-0 w-4/5 h-full bg-glass-light dark:bg-glass-dark backdrop-blur-xs shadow-2xl z-50"
            >
              <div className="flex flex-col p-8 space-y-6 bg-gradient-to-b from-primary/10 to-transparent">
                <div className="flex justify-between items-center">
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    <motion.img
                      className="w-12 h-12"
                      src={theme === 'dark' ? LogoD : Logo}
                      alt="Logo"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    />
                  </Link>
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMenu}
                      className="text-4xl text-gray-600 dark:text-gray-300 hover:text-primary"
                    >
                      <ion-icon name="close-outline"></ion-icon>
                    </Button>
                  </motion.div>
                </div>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500 group-hover:text-primary">
                    <ion-icon name="search-outline" className="text-2xl"></ion-icon>
                  </span>
                  <Input
                    ref={searchInput}
                    onKeyDown={handleKeyPress}
                    className="pl-12 pr-4 py-3 w-full rounded-full bg-white/20 dark:bg-gray-800/30 text-gray-900 dark:text-white border border-gray-300/50 dark:border-gray-700/50 focus:ring-2 focus:ring-primary focus:border-transparent"
                    type="search"
                    placeholder="Rechercher..."
                    aria-label="Rechercher des images"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    onClick={onThemeSwitch}
                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary rounded-lg w-full justify-start px-4 py-3 text-lg font-medium"
                    aria-label={`Passer au thème ${theme === 'dark' ? 'clair' : 'sombre'}`}
                  >
                    <ion-icon
                      name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
                      className="text-2xl"
                    ></ion-icon>
                    <span>{theme === 'dark' ? 'Clair' : 'Sombre'}</span>
                  </Button>
                </motion.div>
                {currentUser ? (
                  <>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        asChild
                        className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary rounded-lg w-full justify-start px-4 py-3 text-lg font-medium"
                      >
                        <Link to="/upload" onClick={() => setIsMenuOpen(false)}>
                          <ion-icon name="add-circle-outline" className="text-2xl"></ion-icon>
                          <span>Ajouter</span>
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="flex items-center space-x-3 text-red-600 dark:text-red-400 hover:bg-red-600/20 hover:text-red-700 rounded-lg w-full justify-start px-4 py-3 text-lg font-medium"
                      >
                        <ion-icon name="log-out-outline" className="text-2xl"></ion-icon>
                        <span>Déconnexion</span>
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        asChild
                        className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary rounded-lg w-full justify-start px-4 py-3 text-lg font-medium"
                      >
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                          <ion-icon name="log-in-outline" className="text-2xl"></ion-icon>
                          <span>Se connecter</span>
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        asChild
                        className="flex items-center space-x-3 bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary rounded-lg w-full justify-start px-4 py-3 text-lg font-bold"
                      >
                        <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                          <ion-icon name="person-add-outline" className="text-2xl"></ion-icon>
                          <span>S'inscrire</span>
                        </Link>
                      </Button>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Catégories centrées */}
      <div className="bg-white dark:bg-gray-900 pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center overflow-x-auto hide-scroll-bar gap-3 py-2">
            {CATEGORIES.map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => handleSelection(item)}
                  className="flex-shrink-0 rounded-full bg-white/10 dark:bg-gray-800/10 text-gray-800 dark:text-gray-200 hover:bg-primary hover:text-white border border-gray-300/50 dark:border-gray-700/50 text-base font-semibold px-6 py-2 shadow-sm transition-all duration-300"
                  aria-label={`Rechercher ${item}`}
                >
                  {item}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}