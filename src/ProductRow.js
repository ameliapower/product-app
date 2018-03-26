import React, { Component } from 'react';

export default class ProductRow extends Component{
	constructor(props){
		super(props);

		this.removeItem = this.removeItem.bind(this);
	}

	removeItem(){
		this.props.onRemove(this.props.product.id)
		// console.log(this.props.product);
	}

	render(){
		const product = this.props.product;
		const stocked = this.props.stocked;
		const prod_name = this.props.productName;
		const prod_price = this.props.productPrice;
		const pId = this.props.pId;
		

		const name = stocked ? prod_name : 
			<span className="alert">{prod_name}</span>

		return(
			<tr>
				<td><strong>{pId}.</strong> {name}</td>
				<td>{prod_price}</td>
				<td className="btn" onClick={this.removeItem}>x</td>
			</tr>
		)
	}
}