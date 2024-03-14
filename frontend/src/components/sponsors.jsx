import React from 'react';
import '../css/sponsors.css';

const CardCarousel = ({ cardData }) => {
  return (
    <div className="card-carousel-container">
      <div className="card-carousel-wrapper">
        {/* Map through the card data and create a card for each item */}
        {cardData.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.imageUrl} alt={item.title} />
            <div className="card-content">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
