import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // --- STATE INITIALIZATION ---
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // --- SAVE TO LOCALSTORAGE ---
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // --- 1. ADD TO CART ---
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.STYLE === product.STYLE);
    if (existingItem) {
      setCart(cart.map(item => 
        item.STYLE === product.STYLE 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      toast.info(`Increased quantity of ${product.STYLE_NAME}`);
    } else {
      // Naya item add karte waqt selectedVariant ko null rakhenge
      setCart([...cart, { ...product, quantity: 1, selectedVariant: null }]);
      toast.success(`${product.STYLE_NAME} added to cart!`);
    }
  };

  // --- 2. REMOVE ITEM ---
  const removeFromCart = (style) => {
    setCart(cart.filter(item => item.STYLE !== style));
    toast.error('Item removed from cart');
  };

  // --- 3. UPDATE QUANTITY ---
  const updateQuantity = (style, quantity) => {
    if (quantity <= 0) {
        removeFromCart(style);
    } else {
        setCart(cart.map(item => item.STYLE === style ? { ...item, quantity } : item));
    }
  };

  // --- 4. NEW FUNCTION: UPDATE VARIANT (SIZE) ---
  // Ye function Cart.jsx se call hoga jab user size dropdown change karega
  const updateVariant = (style, variant) => {
    setCart(prevCart => prevCart.map(item => 
      item.STYLE === style ? { ...item, selectedVariant: variant } : item
    ));
  };

  // --- 5. CLEAR CART ---
  const clearCart = () => setCart([]);
  
  // --- CALCULATIONS ---
  const cartTotal = cart.reduce((sum, item) => sum + (item.MRP * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      updateVariant, // <--- Ye naya function export kiya
      clearCart, 
      cartTotal, 
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);