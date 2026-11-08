import React, { useState } from 'react';
import { usePhotosStore } from './usePhotosStore'; 

const PhotoCard = ({ title, thumbnailUrl }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="photo-card" style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
      <div 
        className="image-container" 
        style={{ 
          position: 'relative', 
          width: '150px', 
          height: '150px', 
          backgroundColor: '#e0e0e0', 
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      >
        {!isImageLoaded && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666' }}>
            Загрузка...
          </div>
        )}
        <img
          src={thumbnailUrl}
          alt={title}
          onLoad={() => setIsImageLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isImageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      </div>
      <h4 style={{ fontSize: '14px', marginTop: '8px', maxHeight: '40px', overflow: 'hidden' }}>{title}</h4>
    </div>
  );
};

export const Gallery = () => {
  const { photos, isLoading, error, fetchPhotos } = usePhotosStore();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Галерея фотографий</h2>

      <button 
        onClick={fetchPhotos} 
        disabled={isLoading}
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          cursor: isLoading ? 'not-allowed' : 'pointer',
          backgroundColor: isLoading ? '#ccc' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        {isLoading ? 'Загрузка...' : 'Загрузить фото'}
      </button>

      {isLoading && (
        <div style={{ margin: '20px 0', fontSize: '18px', color: '#007bff' }}>
          Загрузка данных галереи...
        </div>
      )}

      {error && (
        <div style={{ color: 'red', margin: '20px 0', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>
          Ошибка: {error}
        </div>
      )}

      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
          gap: '16px', 
          marginTop: '20px' 
        }}
      >
        {!isLoading && photos.map((photo) => (
          <PhotoCard 
            key={photo.id} 
            title={photo.title} 
            thumbnailUrl={photo.thumbnailUrl} 
          />
        ))}
      </div>
    </div>
  );
};