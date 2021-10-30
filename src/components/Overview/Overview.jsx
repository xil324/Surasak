/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import ProductDescription from './ProductDescription.jsx';
import StyleSelector from './StyleSelector.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: this.props.id,
      id: 37315,
      product: {},
      styles: [],
      currentStyle: null,
      category: '',
      price: '',
    };
    this.getProductInfo = this.getProductInfo.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
  }

  componentDidMount() {
    this.getProductInfo();
    this.getStyles();
  }

  getProductInfo() {
    axios.get(`/products/${this.state.id}`)
      .then((product) => {
        this.setState({
          product: product.data,
          category: product.data.category,
          price: product.data.default_price.slice(0, product.data.default_price.indexOf('.')),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getStyles() {
    axios.get(`/products/${this.state.id}/styles`)
      .then((styleList) => {
        this.setState({
          styles: styleList.data.results,
          currentStyle: styleList.data.results[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateStyle(style) {
    console.log(style);
    this.setState({
      currentStyle: style,
    });
  }

  render() {
    return (
      <div>
        <span>⭐️⭐️⭐️⭐️⭐️</span>
        <a>Read all reviews</a>
        <br />
        <span>{this.state.category.toUpperCase()}</span>
        <h2>{this.state.product.name}</h2>
        <span>${this.state.price}</span>
        <StyleSelector styles={this.state.styles} updateStyle={this.updateStyle} />
        <ProductDescription product={this.state.product} />
      </div>
    );
  }
}

export default Overview;
