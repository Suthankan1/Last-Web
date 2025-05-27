import React from "react";

// Assume images are imported dynamically or referenced from public folder
const Card = ({ img, alt, title }) => {
  return (
    <div className="card">
      <img src={process.env.PUBLIC_URL + "/images/" + img} alt={alt} />
      <h3>{title}</h3>
    </div>
  );
};

export default Card;
