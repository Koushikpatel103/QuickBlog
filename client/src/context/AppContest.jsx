import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      if (data.success) setBlogs(data.blogs);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();

    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/admin");
  };

  return (
    <AppContext.Provider
      value={{
        axios,
        navigate,
        token,
        setToken,
        blogs,
        setBlogs,
        input,
        setInput,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);