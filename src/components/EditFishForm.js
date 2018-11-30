import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired,
    updateFish: PropTypes.func.isRequired,
    fishKey: PropTypes.string.isRequired,
    deleteFish: PropTypes.func.isRequired,
  }
  handleChange = event => {
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    };

    this.props.updateFish(this.props.fishKey, updatedFish);
  };

  handleDelete = _event => {
    this.props.deleteFish(this.props.fishKey);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={this.handleDelete}>Remove Fish</button>
      </div>
    );
  }
}

export default EditFishForm;
