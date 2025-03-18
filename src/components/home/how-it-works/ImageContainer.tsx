
import { useState } from 'react';
import FloatingChat from './FloatingChat';

interface ImageContainerProps {
  imageUrl: string;
  alt: string;
}

const ImageContainer = ({ imageUrl, alt }: ImageContainerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-radial from-iaeva-purple/10 to-transparent rounded-3xl"></div>
      
      {/* Show skeleton while image is loading */}
      {!imageLoaded && !imageError && (
        <div className="w-full h-80 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-3xl"></div>
      )}
      
      {/* Show actual image once loaded */}
      <img
        src={imageUrl}
        alt={alt}
        className={`w-full h-auto rounded-3xl shadow-soft object-cover z-10 relative ${!imageLoaded && !imageError ? 'invisible' : 'visible'}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(false);
        }}
      />
      
      {/* Show fallback image on error */}
      {imageError && (
        <div className="w-full h-80 bg-gray-200 rounded-3xl flex items-center justify-center">
          <span className="text-gray-500">Imagen no disponible</span>
        </div>
      )}
      
      <FloatingChat />
    </div>
  );
};

export default ImageContainer;
