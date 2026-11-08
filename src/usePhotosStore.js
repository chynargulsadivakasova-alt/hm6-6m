import { create } from 'zustand';

export const usePhotosStore = create((set) => ({
  photos: [],
  isLoading: false,
  error: null,

  fetchPhotos: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos');
      
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      set({ photos: data, isLoading: false });
    } catch (err) {
      set({ error: err.message || 'Что-то пошло не так', isLoading: false });
    }
  },
}));