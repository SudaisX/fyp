import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import PhrasesPage from "./pages/PhrasesPage";
import ErrorPage from "./pages/ErrorPage";
import SubCategoriesPage from "./pages/SubCategoriesPage";
// import phrases from "./data/phrases.js";

function App() {
  const [real, setReal] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CategoriesPage />} />
        <Route path='/phrases' element={<PhrasesPage />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/categories/:categoryId' element={<SubCategoriesPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
