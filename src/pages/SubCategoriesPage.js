// components/SubCategoriesPage.js
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, TextField, Chip, Paper } from "@mui/material";
import CategoryCard from "../components/CategoryCard";
import data from "../data/data";
import LanguageContext from "../context";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const SubCategoriesPage = () => {
  let { categoryId } = useParams();
  const navigate = useNavigate();

  const languageContext = useContext(LanguageContext);

  const [phrase, setPhrase] = useState("");
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Displaying 6 items per page

  const speakText = () => {
    if (!window.speechSynthesis) {
      alert("Your browser does not support speech synthesis.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (text) {
      speakText();
    }
  }, [text]);

  const phrases = data.find((item) => parseInt(item.id) === parseInt(categoryId))
    ? data.find((item) => parseInt(item.id) === parseInt(categoryId)).data
    : null;
  const category = data.find((item) => parseInt(item.id) === parseInt(categoryId))
    ? data.find((item) => parseInt(item.id) === parseInt(categoryId)).category
    : null;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentPhrases = phrases ? phrases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : null;
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    console.log(phrase);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return phrases ? (
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
        <div className='back-prev-btns'>
          <Button
            variant='contained'
            sx={{ height: "150px", width: "200px", marginLeft: 2, marginBottom: 3 }}
            onClick={() => navigate("/categories")}
            className='eye-select'
          >
            Back
          </Button>
          <Button variant='contained' disabled={currentPage < 2} sx={{ height: "220px", width: "200px", marginLeft: 2 }} onClick={handlePrevious}>
            <ArrowBackIosIcon />
          </Button>
        </div>

        <div className='card-container'>
          {currentPhrases.map((card, index) => (
            // <CategoryCard categoryName={card.phrase} categoryImg={card.image.path} setText phrase={card.phrase} />
            <div className='card eye-select' onClick={() => setText(languageContext.language === "english" ? card.phrase_english : card.phrase)}>
              <img
                className='phrase-card-img'
                src={card.image.path}
                alt={languageContext.language === "english" ? card.phrase_english : card.phrase}
              />
              <div class='phrase-text-overlay'>
                {languageContext.language === "english" ? card.phrase_english : languageContext.language === "urdu" ? card.urdu_phrase : card.phrase}
              </div>
            </div>
          ))}
        </div>
        <Button variant='contained' className='eye-select' sx={{ height: "220px", width: "200px", marginRight: 2 }} onClick={handleNext}>
          {/* Next */}
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </>
  ) : (
    <h1>Error</h1>
  );
};

export default SubCategoriesPage;
