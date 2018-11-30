import React from "react";
import { formatPrice } from "../helpers";
import PropTypes from "prop-types";

class Fish extends React.Component {
  static propTypes = {
    addToOrder: PropTypes.func.isRequired,
    index: PropTypes.string.isRequired,
    fishDetails: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired
  };

  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };

  render() {
    const { name, image, desc, price, status } = this.props.fishDetails;
    const isNotAvailable = status === "unavailable";

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name} <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={isNotAvailable} onClick={this.handleClick}>
          {isNotAvailable ? "Sold Out!" : "Add to Cart"}
        </button>
      </li>
    );
  }
}

export default Fish;
