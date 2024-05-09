import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ categoryName, categoryImg, categoryId }) => {
  const navigate = useNavigate();

  return (
    <div className='card-cat eye-select' onClick={() => navigate(`/categories/${categoryId}`)}>
      <img className='card-img card' src={categoryImg} alt={categoryName} />
    </div>
  );
};

export default CategoryCard;
