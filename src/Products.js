import React, { Component } from 'react';
import { ProductList } from './ProductList';
import Search from './Search';
import CategoryRow from './CategoryRow';
import ProductRow from './ProductRow';
import response from './data.json'; //if using local data source

export default class Products extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoading: false,
			products: [],
			searchFilter : "",
      		inStock : false
		}

		this.updateItem = this.updateItem.bind(this);
		this.updateProduct = this.updateProduct.bind(this);
		this.handleSearchFilter = this.handleSearchFilter.bind(this);
    	this.handleInStock = this.handleInStock.bind(this);
    	this.handleDestroy = this.handleDestroy.bind(this);
	}

	componentDidMount(){
		this.setState({
			isLoading: true
		})

		// console.log(response);
		fetch(response)
		.then(products => response.data) //local source doesn't need json parsing
		.then(products => this.setState({
		  products,
		  isLoading: false
		}))
		.catch(isError => this.setState({
		    isError: 'error getting data'
		}))

	} //ComponentDidMount


	updateProduct(newValue){
		console.log(newValue)
		this.setState({
			currentProduct: newValue.target.value,
		});
	}

	
	updateItem(id, newCategory, newPrice, newStock, newName){
		this.setState((prevstate) => {
			// console.log(prevstate)
			const copiedProducts = prevstate.products.slice(0)
			let thisObj = copiedProducts.find((e) => {
				return e.id === id
			})
			// console.log(thisObj.category)
			thisObj['category'] = newCategory;
			thisObj['price'] = newPrice;
			thisObj['stocked']= newStock;
			thisObj['name'] = newName;
			return {
				products: copiedProducts
			}
		})
	}


	handleDestroy(id){
		console.log(id)
		this.setState((prevState) => {
			let products = prevState.products;
			products = products.filter(e => e.id !== id)
			return { products };
	    });
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

	render(){
		const searchFilter = this.state.searchFilter;
   		const inStock = this.state.inStock;
   		const products = this.state.products;

 
		return(
			<div>
				<Search 
		          //sending initially set state 
		          searchFilter={searchFilter}
		          inStock={inStock}
		          //sending event props onSearchChange and onStockChange to child
		          onSearchChange={this.handleSearchFilter}
		          onStockChange={this.handleInStock} 
		        />
		        <ProductList 
		          products={products}
		          updateItem={this.updateItem}
		          searchFilter={searchFilter}
		          inStock={inStock}
		          onRemove={this.handleDestroy}
		        />
	        </div>
		);
	}
}

// To Do: 
// change stocked prop to boolean on update
// update
// isLoading
// add
// sort
