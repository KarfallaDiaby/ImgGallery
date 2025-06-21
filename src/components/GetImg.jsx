import React, { useState, useEffect } from 'react';
import Articles from './Articles';

// Fonction pour diviser les images en colonnes de manière équilibrée
const splitIntoColumns = (items, columns) => {
  const columnsArray = Array(columns).fill().map(() => []);
  
  // Créer un tableau pour suivre la hauteur de chaque colonne
  const columnHeights = new Array(columns).fill(0);
  
  // Pour chaque image, calculer son ratio hauteur/largeur
  const itemsWithRatio = items.map(item => ({
    ...item,
    // Utiliser le ratio de l'image si disponible, sinon utiliser un ratio par défaut
    ratio: item.height && item.width ? item.height / item.width : 1.5
  }));
  
  // Répartir les images dans les colonnes en fonction de leur hauteur
  itemsWithRatio.forEach(item => {
    // Trouver la colonne avec la plus petite hauteur
    const minHeight = Math.min(...columnHeights);
    const columnIndex = columnHeights.indexOf(minHeight);
    
    // Ajouter l'image à cette colonne
    columnsArray[columnIndex].push(item);
    
    // Mettre à jour la hauteur de la colonne (en utilisant le ratio pour estimer la hauteur)
    columnHeights[columnIndex] += item.ratio;
  });
  
  return columnsArray;
};

export default function GetImg({ images }) {
  const [columns, setColumns] = useState(3);
  
  // Mettre à jour le nombre de colonnes en fonction de la largeur de l'écran
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setColumns(4); // Grands écrans : 4 colonnes
      } else if (width >= 1024) {
        setColumns(3); // Ordinateurs portables : 3 colonnes
      } else if (width >= 640) {
        setColumns(2); // Tablettes : 2 colonnes
      } else {
        setColumns(1); // Mobiles : 1 colonne
      }
    };
    
    // Mettre à jour au chargement initial
    updateColumns();
    
    // Écouter les changements de taille de fenêtre
    window.addEventListener('resize', updateColumns);
    
    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => window.removeEventListener('resize', updateColumns);
  }, []);
  
  // Répartir les images dans les colonnes
  const columnsData = splitIntoColumns(images, columns);

  return (
    <div className="bg-white dark:bg-black transition-all duration-300 ease-out px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-row gap-2 sm:gap-4 md:gap-6 w-full">
        {columnsData.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-2 sm:gap-4 md:gap-6">
            {column.map((image) => (
              <div key={image.id} className="w-full transition-all duration-300 ease-out">
                <Articles {...image} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}