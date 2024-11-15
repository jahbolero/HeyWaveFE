import React from 'react';

function RecipientCard({ recipient, onPlaceBid }) {
  return (
    <div className="recipient-card">
      <h3>{recipient.name}</h3>
      <p className="category">{recipient.category}</p>
      <p className="expertise">{recipient.expertise}</p>
      <p className="description">{recipient.description}</p>
      <div className="bid-section">
        <span className="minimum-bid">Minimum Bid: ${recipient.bidMinimum}</span>
        <button 
          onClick={() => onPlaceBid(recipient)}
          className="bid-button"
        >
          Place a Bid
        </button>
      </div>
    </div>
  );
}

export default RecipientCard; 