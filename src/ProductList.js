import React, { Component } from 'react';
import ProductRow from './ProductRow';
import CategoryRow from './CategoryRow';
import response from './data.json'; //if using local data source


export class ProductList extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoading: false,
			products: []
		}
		this.handleRemove = this.handleRemove.bind(this)
	}

	componentWillMount(){
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


	handleRemove(productId){
		 this.setState((prevState) => {
			let products = prevState.products;
			console.log(products);
			console.log(productId);
			// console.log(products[productId]);
			delete products[productId];
			return { products };
	    });
	}

	render(){
		//state
		const products = this.state.products;
		const loading = this.state.isLoading;
		//props
		const searchFilter = this.props.searchFilter;
      	const inStock = this.props.inStock;
		
		// console.log(this.state);
		let rows = [];
		let lastCategory=null;


		products.map((product, i) => {
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
					key={product.name}
					onRemove={this.handleRemove}
					product={product}
					productName={product.name}
					stocked={product.stocked}
					productPrice={product.price}
					pId={product.id}
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

// To Do: 
// isLoading
// update 
// add
// sort
