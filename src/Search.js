import React, { Component } from 'react';

export default class Search extends Component{
	constructor(props){
		super(props);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleStockChange = this.handleStockChange.bind(this);
	}

	handleSearchChange(e){
		 //passing the value entered to prop onSearchChange, (onSearchChange is prop sent from parent)
		this.props.onSearchChange(e.target.value)
	}
	handleStockChange(e){
		this.props.onStockChange(e.target.value) //(onStockChange is prop sent from parent)
		if(e.target.previousSibling.innerHTML === "Only show products in stock"){
			e.target.previousSibling.innerHTML = "Current products";
		}else{
			e.target.previousSibling.innerHTML = "Only show products in stock";
		}
	}

	render(){
		const searchFilter = this.props.searchFilter;
   		const inStock = this.props.inStock;
		return(
			<form>
				<label htmlFor="search">Search</label>
				<input name="search" type="text" 
					value={searchFilter} 
					onChange={this.handleSearchChange}
					placeholder="Search..." />
				<label htmlFor="in-stock">Only show products in stock</label>
				<input id="stocked" name="in-stock" 
					value={inStock} 
					onChange={this.handleStockChange}
					type="checkbox"/>
					{' '}
			</form>
		)
	}
}