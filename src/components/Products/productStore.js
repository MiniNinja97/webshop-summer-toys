import { create } from 'zustand';
import { getProducts } from '../../data/crud';

const useProductStore = create((set) => ({
  products: [],
  fetchProducts: async () => {
    getProducts((data) => set({ products: data }));
  },
  setProducts: (newList) => set({ products: newList }),
}));

export default useProductStore;