import React from 'react';

import { currencyFormat } from '../../utils/formatter';
import './Card.css';

export default class Card extends React.Component {

  render() {
    const formattedAmount = currencyFormat(this.props.amount);
    return (
      <div className="main-card category-card">
        <div className="box">
          <div className="media-content">
            <div className="card-name">
              <p>{this.props.cardName}</p>
            </div>
            <div className="amount-container">
              <span className="amount">{formattedAmount}</span>
              <span className="currency">원</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}