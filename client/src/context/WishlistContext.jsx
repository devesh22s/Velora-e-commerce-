import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (err) { return []; }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add or Remove Logic
  const toggleWishlist = (product) => {
    const exists = wishlist.find(item => item.STYLE === product.STYLE);
    
    if (exists) {
      setWishlist(wishlist.filter(item => item.STYLE !== product.STYLE));
      toast.info(`${product.STYLE_NAME} removed from Wishlist`);
    } else {
      setWishlist([...wishlist, product]);
      toast.success(`${product.STYLE_NAME} added to Wishlist ❤️`);
    }
  };

  const isInWishlist = (styleCode) => {
    return wishlist.some(item => item.STYLE === styleCode);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);