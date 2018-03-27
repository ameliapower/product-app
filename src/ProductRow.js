import React, { Component } from 'react';
// import PropTypes from 'prop-types';


export default class ProductRow extends Component{
	constructor(props){
		super(props);

		this.removeItem = this.removeItem.bind(this);
		this.editItem = this.editItem.bind(this);
		this.updateProduct = this.updateProduct.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleStockChange = this.handleStockChange.bind(this);

		this.state = {
			newName: this.props.productName,
			newPrice: this.props.productPrice,
			newCategory: this.props.cat,
			newStock: this.props.stocked
	    };
	}

	removeItem(){
		// console.log(this.props.prodID)
		this.props.onRemove(this.props.prodID)
	}

	editItem(){
		this.setState((prevState) => ({
			isEditing: !prevState.isEditing
		}))
	}

	updateProduct(e){
		e.preventDefault();
		this.props.updateItem(this.props.prodID, this.state.newCategory,
		this.state.newPrice, this.state.newStock, this.state.newName);

		this.setState({
			isEditing: false
		})
	}

	handleNameChange(e){
		// console.log(e.target.value)
		this.setState({
			newName : e.target.value
		})
	}
	handlePriceChange(e){
		this.setState({
			newPrice : e.target.value
		})
	}
	handleCategoryChange(e){
		this.setState({
			newCategory : e.target.value
		})
	}
	handleStockChange(e){
		console.log('in stock???')
		console.log(e.target.value)
		console.log(typeof e.target.value)
		this.setState({
			newStock : e.target.value
		})
	}

	renderForm(){
		return(
			<tr><td>
			<form onSubmit={this.updateProduct}>
				<input type="text" value={this.state.newCategory} onChange={this.handleCategoryChange} />
				<input type="text" value={this.state.newPrice} onChange={this.handlePriceChange} />
				<input type="checkbox" value={this.state.newStock} onChange={this.handleStockChange} />
				<input type="text" value={this.state.newName} onChange={this.handleNameChange} />
				<button type="submit">Update</button>
			</form>
			</td></tr>
		)
	}

	renderItem(){
		const product = this.props.product;
		const stocked = this.props.stocked;
		const prod_name = this.props.productName;
		const prod_price = this.props.productPrice;
		const prod_id = this.props.prodID;

		const name = stocked ? prod_name : 
			<span className="alert">{prod_name}</span>

		return(
			<tr>
				<td><strong>{prod_id}.</strong> {name}</td>
				<td>{prod_price}</td>
				<td className="btn" onClick={this.removeItem}>x</td>
				<td className="btn" onClick={this.editItem}>Edit</td>
			</tr>
		)
	}

	render(){
		const {isEditing} = this.state;
		return(
			isEditing ? this.renderForm() : this.renderItem()
		)
	}
}

// ProductRow.propTypes = {
// 	productName: PropTypes.string,
// 	productPrice: PropTypes.string,
// 	// newCategory: PropTypes.string,
// 	stocked: PropTypes.bool
// };