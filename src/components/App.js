import React from "react";
import Inventory from "./Inventory";
import Order from "./Order";
import Menu from "./Menu";
import sampleFishes from "../sample-fishes";
import base from "../base";
import PropTypes from "prop-types";

class App extends React.Component {
  static propTypes = {
    storeId: PropTypes.string
  };

  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    // Read from localStorage
    const localStorageRef = localStorage.getItem(this.props.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    // Sync data from Firebase
    const config = {
      context: this,
      state: "fishes"
    };
    this.ref = base.syncState(`${this.props.storeId}/fishes`, config);
  }

  componentDidUpdate() {
    // Save to localStorage
    localStorage.setItem(this.props.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = newFish => {
    // 1. Take a copy of the existing `state`
    const newFishes = { ...this.state.fishes };
    // 2. Add our newFish to newFishes
    newFishes[`fish${Date.now()}`] = newFish;
    // 3. Set newFishes as the new `state`
    this.setState({ fishes: newFishes });
  };

  updateFish = (fishKey, updatedFish) => {
    // 1. Take a copy of the existing `state`
    const updatedFishes = { ...this.state.fishes };
    // 2. Update our updatedFish in updatedFishes
    updatedFishes[fishKey] = updatedFish;
    // 3. Set updatedFishes as the new `state`
    this.setState({ fishes: updatedFishes });
  };

  deleteFish = fishKey => {
    const fishes = { ...this.state.fishes };
    // The `null` bit is needed by Firebase
    // a reasonable alternative would be `delete fishes[fishKey]`
    fishes[fishKey] = null;
    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = orderKey => {
    // 1. Take a copy of the existing `state`
    const newOrder = { ...this.state.order };
    // 2. Either add our order item to newOrder or update quantity
    newOrder[orderKey] = newOrder[orderKey] ? newOrder[orderKey] + 1 : 1;
    // 3. Set newOrder as the new `state`
    this.setState({ order: newOrder });
  };

  removeFromOrder = orderKey => {
    const order = { ...this.state.order };
    delete order[orderKey];
    this.setState({ order: order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <Menu fishes={this.state.fishes} addToOrder={this.addToOrder} />
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
