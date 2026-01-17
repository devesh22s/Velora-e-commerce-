import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // Default loading true hai
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // LocalStorage se data uthao
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          // JSON.parse kabhi kabhi fail ho sakta hai agar data kharab ho
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Auth Load Error:", error);
        // Agar error aaye (e.g. corrupted data), to sab clear kar do
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
      } finally {
        // --- YE SABSE IMPORTANT HAI ---
        // Chahe error aaye ya success ho, Loading ko FALSE karna hi hai.
        // Tabhi aapki website dikhegi.
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {/* Agar loading hai tab bhi children render karne ki koshish karein, 
          ya fir loading component dikhayein. 
          Par ab finally block lagne se ye safe hai. */}
      {loading ? <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>Loading App...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);