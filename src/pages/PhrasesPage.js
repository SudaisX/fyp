// components/PhrasesPage.js
import { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, TextField, Chip, Paper } from "@mui/material";
// import phrases from "./data/phrases";
import phrases from "../data/phrases";
// import data from "src/data/phrases";

const PhrasesPage = ({ category = "Category Name" }) => {
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

  const totalPages = Math.ceil(phrases.length / itemsPerPage);
  const currentPhrases = phrases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    console.log(currentPhrases);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          paddingBottom: 0,
        }}
      >
        {/* Title with the category on the left */}
        <Typography variant='h5'>{category}</Typography>

        {/* Chip box moved to the right */}
        <div>
          🔉 <Chip icon={"🔉"} label={text} variant='outlined' />
        </div>
      </Box>

      <div className='container'>
        <Button variant='contained' disabled={currentPage < 2} sx={{ height: "220px", width: "140px" }} onClick={handlePrevious}>
          Previousss
        </Button>

        <Grid container spacing={3} sx={{ padding: 5, paddingTop: "20px" }}>
          {currentPhrases.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                className='eye-select'
                sx={{
                  height: "220px",
                  width: "100%",
                  flex: "1 0 auto",
                  cursor: "pointer",
                  transition: "0.3s",
                  boxShadow: 1, // Default shadow
                  "&:hover": {
                    boxShadow: 6, // Elevated shadow on hover
                    "& .MuiCardContent-root .MuiTypography-root": {
                      // Target Typography within CardContent
                      fontWeight: "bold", // Bold text on hover
                    },
                  },
                }}
                onClick={() => setText(card.phrase)}
              >
                <CardMedia component='img' alt={card.phrase} height='140' image={card.image.path} />
                <CardContent>
                  <Typography variant='h6' align='center'>
                    {card.urdu_phrase}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Button variant='contained' sx={{ height: "220px", width: "140px" }} onClick={handleNext}>
          Next
        </Button>
      </div>
    </>
  );
};

export default PhrasesPage;
