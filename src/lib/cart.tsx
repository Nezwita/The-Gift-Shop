'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  city: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export interface OrderInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  orderNumber: string;
  total: number;
  shippingCost: number;
  shippingMethod: string;
  estimatedDelivery: string;
  items: CartItem[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  orderInfo: OrderInfo | null;
  setOrderInfo: (info: OrderInfo) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderInfo, setOrderInfoState] = useState<OrderInfo | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('curated-cities-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    
    const savedOrder = localStorage.getItem('curated-cities-order');
    if (savedOrder) {
      try {
        setOrderInfoState(JSON.parse(savedOrder));
      } catch (e) {
        console.error('Failed to parse order', e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('curated-cities-cart', JSON.stringify(cart));
  }, [cart]);

  const setOrderInfo = (info: OrderInfo) => {
    setOrderInfoState(info);
    localStorage.setItem('curated-cities-order', JSON.stringify(info));
  };

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id);
      if (existingItem) {
        return prevCart.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart => 
      prevCart.map(i => i.id === id ? { ...i, quantity } : i)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal,
      cartCount,
      orderInfo,
      setOrderInfo
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
