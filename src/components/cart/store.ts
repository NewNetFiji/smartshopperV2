import { Product } from "../../generated/graphql";
import { devtools, persist } from "zustand/middleware";
import create from "zustand";

export interface Item {
  id: number;
  product: Product;
  discount: number;
  qty: number;
  price: number;
}

const updateCart = (
  cartItems: Item[],
  id: number,
  product?: Product,
  qty?: number,
  discount?: number,
  price?: number
): Item[] =>
  cartItems.map((item) => ({
    ...item,
    product: item.id === id && product ? product : item.product,
    discount: item.id === id && discount ? discount : item.discount,
    qty: item.id === id && qty ? qty : item.qty,
    price: item.id === id && price ? price : item.price,
  }));

const incrementQty = (cartItems: Item[], id: number, qty: number): Item[] =>
  cartItems.map((item) => ({
    ...item,
    qty: item.id === id ? item.qty + qty : item.qty,
  }));

const removeItem = (cartItems: Item[], id: number): Item[] =>
  cartItems.filter((item) => item.id !== id);

const addItem = (
  cartItems: Item[],
  product: Product,
  qty: number,
  discount: number,
  price: number
): Item[] => [
  ...cartItems,
  {
    id: Math.max(0, Math.max(...cartItems.map(({ id }) => id))) + 1,
    product,
    qty,
    discount,
    price,
  },
];

type Cart = {
  cartItems: Item[];
  setCart: (items: Item[]) => void;
  addItem: (
    product: Product,
    qty: number,
    discount: number,
    price: number
  ) => void;
  incrementQty: (id: number, qty: number) => void;
  updateCart: (
    id: number,
    product?: Product,
    qty?: number,
    discount?: number,
    price?: number
  ) => void;
  removeItem: (id: number) => void;
};

export const useCart = create<Cart>(
  persist(
    devtools(
      (set): Cart => ({
        cartItems: [],
        setCart: (items: Item[]) =>
          set((state) => ({
            ...state,
            cartItems: items,
          })),
        incrementQty: (id: number, qty: number) =>
          set((state) => ({
            ...state,
            cartItems: incrementQty(state.cartItems, id, qty),
          })),
        removeItem: (id: number) =>
          set((state) => ({
            ...state,
            cartItems: removeItem(state.cartItems, id),
          })),
        updateCart: (
          id: number,
          product?: Product,
          qty?: number,
          discount?: number,
          price?: number
        ) =>
          set((state) => ({
            ...state,
            cartItems: updateCart(
              state.cartItems,
              id,
              product,
              qty,
              discount,
              price
            ),
          })),
        addItem: (
          product: Product,
          qty: number,
          discount: number,
          price: number
        ) =>
          set((state) => ({
            ...state,
            cartItems: addItem(state.cartItems, product, qty, discount, price),
          })),
      })
    ),
    { name: "cart" }
  )
);
