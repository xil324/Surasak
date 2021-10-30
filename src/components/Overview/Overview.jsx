/* eslint-disable react/sort-comp */
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
      id: 37311,
      product: {},
      styles: [],
      currentStyle: {},
      category: '',
      price: '',
      isOnSale: '',
    };
    this.getProductInfo = this.getProductInfo.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.setPrice = this.setPrice.bind(this);
  }

  componentDidMount() {
    this.getProductInfo();
    this.getStyles();
    this.setPrice(this.state.currentStyle);
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
    this.setState({
      currentStyle: style,
      isOnSale: !!style.sale_price,
    });
  }

  setPrice(style) {
    this.setState({
      price: !!style.sale_price,
    });
  }

  render() {
    let price;
    if (this.state.isOnSale) {
      price = (
        <>
          <span>${this.state.currentStyle.sale_price}</span> {' '}
          <span style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
            ${this.state.currentStyle.original_price}
          </span>
        </>
      );
    } else {
      price = <span>${this.state.currentStyle.original_price}</span>;
    }
    return (
      <div>
        <span>⭐️⭐️⭐️⭐️⭐️</span>
        <a>Read all reviews</a>
        <br />
        <span>{this.state.category.toUpperCase()}</span>
        <h2>{this.state.product.name}</h2>
        {price}
        <StyleSelector
          styles={this.state.styles}
          currentStyle={this.state.currentStyle}
          updateStyle={this.updateStyle}
        />
        <ProductDescription product={this.state.product} />
      </div>
    );
  }
}

export default Overview;
