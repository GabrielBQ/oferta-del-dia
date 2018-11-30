import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
  static propTypes = {
    addFish: PropTypes.func.isRequired
  };
  /*
  state = {
    name: "",
    price: "",
    status: "",
    desc: "",
    image: ""
  };

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };

  handleChangePrice = event => {
    this.setState({ price: event.target.value });
  };
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChangeName}
          placeholder="Name"
        />
        <input
          type="text"
          name="price"
          value={this.state.price}
          onChange={this.handleChangePrice}
          placeholder="Price"
        />

*/

  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = event => {
    // 1. Stop the <form> from submitting
    event.preventDefault();

    // 2. Create fish with form data
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    };

    // 3. Send fish to App component (where state lives)
    this.props.addFish(fish);

    // 4. Refresh the form
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input
          type="text"
          name="name"
          ref={this.nameRef}
          placeholder="Name Fish"
        />
        <input
          type="text"
          name="price"
          ref={this.priceRef}
          placeholder="Price"
        />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Description" />
        <input
          type="text"
          ref={this.imageRef}
          name="image"
          placeholder="Image"
        />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
