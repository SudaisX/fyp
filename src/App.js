import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import PhrasesPage from "./pages/PhrasesPage";
import ErrorPage from "./pages/ErrorPage";
import SubCategoriesPage from "./pages/SubCategoriesPage";
import Navbar from "./components/Navbar";
import LanguageContext from "./context";
import { useAuth } from "./authContext";
import LoginScreen from "./pages/Login";
import SignupScreen from "./pages/Signup";
import setAuthToken from "./utils/setAuthToken";
import ProfilePage from "./pages/ProfilePage";
// import phrases from "./data/phrases.js";

function App() {
  const [language, setLanguage] = useState("urdu-roman");
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const { loadUser } = useAuth(); // Using the useAuth hook to access loadUser

  useEffect(() => {
    if (localStorage.token) {
      loadUser(); // Call loadUser when the component mounts
    }
  }, [loadUser]); // Dependency array with loadUser to ensure it's called only once or when loadUser changes

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<CategoriesPage />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<SignupScreen />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/phrases' element={<PhrasesPage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/categories/:categoryId' element={<SubCategoriesPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageContext.Provider>
  );
}

export default App;
