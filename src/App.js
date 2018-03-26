import React, { Component } from 'react';
import './App.css';
import { ProductList } from './ProductList';
import Search from './Search';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchFilter : "",
      inStock : false
    }
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.handleInStock = this.handleInStock.bind(this);
  }

  handleSearchFilter(searchFilter){
    // console.log(searchFilter);
    this.setState({
      searchFilter
    });
  }

  handleInStock(inStock){
    // console.log(inStock);
    this.setState({
      inStock: !this.state.inStock //toggle checkbox
    });
  }

  render() {
    const searchFilter = this.state.searchFilter;
    const inStock = this.state.inStock;
    
    // console.log(this.state);
    return (
      <div className="App">
        <Search 
          //sending initially set state 
          searchFilter={searchFilter}
          inStock={inStock}
          //sending event props onSearchChange and onStockChange to child
          onSearchChange={this.handleSearchFilter}
          onStockChange={this.handleInStock} 
        />
        <ProductList 
          products={this.props.products}
          searchFilter={searchFilter}
          inStock={inStock}
        />
      </div>
    );
  }
}

export default App;
