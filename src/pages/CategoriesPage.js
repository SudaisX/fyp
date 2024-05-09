// components/CategoriesPage.js
import { useState, useEffect } from "react";

import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, TextField, Chip, Paper } from "@mui/material";
import CategoryCard from "../components/CategoryCard";
import data from "../data/data";
import LanguageContext from "../context";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";

const CategoriesPage = ({ category = "Categories" }) => {
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Displaying 6 items per page

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentCategories = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    console.log("");
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid black",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          margin: "20px 150px 0 150px",
          padding: "10px",
        }}
      >
        <Typography variant='h5'>{category}</Typography>

        <div>
          🔉 <Chip icon={"🔉"} label={text} variant='outlined' />
        </div>
      </Box>

      <div className='container'>
        <Button
          variant='contained'
          className='eye-select'
          disabled={currentPage < 2}
          sx={{ height: "220px", width: "200px", marginLeft: 2 }}
          onClick={handlePrevious}
        >
          <ArrowBackIosIcon />
        </Button>

        {/* <Grid container spacing={3} sx={{ padding: 5, paddingTop: "20px" }}> */}

        {/* {currentCategories.map((card, index) => (
          // <Grid item key={index} xs={12} sm={6} md={4}>
          <CategoryCard categoryName={card.category} categoryImg={card.image} />
          // </Grid>
        ))} */}
        {/* </Grid> */}

        <div className='card-container'>
          {currentCategories.map((card, index) => (
            <CategoryCard categoryName={card.category} categoryImg={card.img} categoryId={card.id} />
          ))}
        </div>
        <Button
          disabled={currentPage >= totalPages}
          variant='contained'
          className='eye-select'
          sx={{ height: "220px", width: "200px", marginRight: 2 }}
          onClick={handleNext}
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </>
  );
};

export default CategoriesPage;
