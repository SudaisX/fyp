import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ categoryName, categoryImg, categoryId }) => {
  const navigate = useNavigate();

  return (
    <div className='card eye-select' onClick={() => navigate(`/categories/${categoryId}`)}>
      <img className='card-img' src={categoryImg} alt={categoryName} />
    </div>
  );
};

export default CategoryCard;
