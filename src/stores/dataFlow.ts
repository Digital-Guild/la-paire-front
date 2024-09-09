import { create } from "zustand";
import { ProductCard } from "../types/product";

interface DataFlowState {
  products: Array<ProductCard>;
  addProduct: (product: ProductCard) => void;
  removeProduct: (product: ProductCard) => void;
  addQuantity: (product: ProductCard) => void;
  lessQuantity: (product: ProductCard) => void;
  amInCart: (product?: ProductCard | null) => boolean;
  updateProduct: (product: ProductCard) => void;
  myVariantInCart: (product?: ProductCard | null) => boolean;
  clearCart: () => void;
}

export const useDataFlow = create<DataFlowState>((set, get) => ({
  products: [],
  addProduct: (payload: ProductCard) => {
    const currentProduct = get().products;
    const newProduct = {
      ...payload,
      quantity: 1,
    };
    const newTable = [...currentProduct, newProduct];
    set(() => ({
      products: newTable,
    }));
  },
  removeProduct: (payload: ProductCard) => {
    const currentProduct = get().products;
    const newTable = currentProduct.map((item) => {
      if (item.id === payload.id && item.size === payload.size) {
        return null;
      } else return item;
    }) as ProductCard[];
    set(() => ({
      products: newTable.filter((item) => item !== null),
    }));
  },
  addQuantity: (payload: ProductCard) => {
    const currentProduct = get().products;
    const newTable = currentProduct.map((item) => {
      if (item.id === payload.id && item.size === payload.size) {
        return {
          ...item,
          quantity: item.quantity! + 1,
        };
      } else return item;
    }) as ProductCard[];

    set(() => ({
      products: newTable,
    }));
  },
  lessQuantity: (payload: ProductCard) => {
    const currentProduct = get().products;
    const newTable = currentProduct.map((item) => {
      if (item.id === payload.id && item.size === payload.size) {
        return {
          ...item,
          quantity: item.quantity! - 1,
        };
      } else return item;
    }) as ProductCard[];
    set(() => ({
      products: newTable,
    }));
  },
  amInCart: (payload?: ProductCard | null) => {
    if (!payload) return false;
    const currentProduct = get().products;
    return currentProduct.some(
      (item) => item.id === payload.id && item.size == payload.size
    );
  },
  myVariantInCart: (payload?: ProductCard | null) => {
    if (!payload) return false;
    const currentProduct = get().products;
    return currentProduct.some(
      (item) => item.id === payload.id && item.size == payload.size
    );
  },
  updateProduct: (payload: ProductCard) => {
    const currentProduct = get().products;
    const newTable = currentProduct.map((item) => {
      if (item.id === payload.id) {
        return {
          ...item,
          ...payload,
        };
      }
      return item;
    });
    set(() => ({
      products: newTable,
    }));
  },
  clearCart: () => {
    set(() => ({
      products: [],
    }));
  },
}));
