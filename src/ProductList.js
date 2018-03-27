import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ProductRow from './ProductRow';
import CategoryRow from './CategoryRow';
import response from './data.json'; //if using local data source


export class ProductList extends Component{
	constructor(props){
		super(props);

		this.handleRemove = this.handleRemove.bind(this)
	}

	handleRemove(productId){
		// console.log(productId)
		this.props.onRemove(productId);
	}

	render(){
		//state
		const products = this.props.products;
		const loading = this.props.isLoading;
		//props
		const searchFilter = this.props.searchFilter;
      	const inStock = this.props.inStock;
		
		let rows = [];
		let lastCategory=null;

		// console.log(products)
		// console.log(Array.isArray(products))
		products.map((product, i) => {
			// console.log(product)
			//filter by search keyword
			if (product.name.indexOf(searchFilter) === -1) {
				return;
			}
			//filter with checkbox in stock items
			if (inStock && !product.stocked) {
				return;
			}
			//otherwise show all
	 		if(product.category !== lastCategory){ //don't repeat the cat
	 			rows.push(
					<CategoryRow 
 						key={i}
 						cat={product.category}
 					/>
	 			)
	 		}
	 		rows.push(
				<ProductRow 
					key={product.id}
					prodID={product.id}
					onRemove={this.handleRemove}
					updateItem={this.props.updateItem}
					cat={product.category}
					product={product}
					productName={product.name}
					stocked={product.stocked}
					productPrice={product.price}
				/>
	 		)
	 		lastCategory = product.category;
	 	}); 
		return(
			<table>
		        <thead>
		          <tr>
		            <th>Name</th>
		            <th>Price</th>
		          </tr>
		        </thead>
		        <tbody>{rows}</tbody>
		    </table>
		);
	}
}


// ProductRow.propTypes = {
// 	cat: PropTypes.string,
// 	productName: PropTypes.string,
// 	productPrice: PropTypes.string,
// 	// newCategory: PropTypes.string,
// 	stocked: PropTypes.bool
// };


// To Do: 
// change stocked prop to boolean on update
// update
// isLoading
// add
// sort

