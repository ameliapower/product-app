import React, { Component } from 'react';

export default class CategoryRow extends Component{

	render(){
		return(
			<tr className="category-row">
				<td>{this.props.cat}</td>
			</tr>
		)
	}
}