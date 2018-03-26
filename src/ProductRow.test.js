import React from 'react';
import { mount } from "enzyme";
import ReactDOM from 'react-dom';
import ProductRow from './ProductRow';


describe('ProductRow', () => {
	let props; 
	let mountedProductRow;

	const productRow = () => {
		if(!mountedProductRow){ 
			mountedProductRow = mount(
				<ProductRow {...props} />
			)
		}
		// this function returns an enzyme ReactWrapper
		return mountedProductRow;
	}


	beforeEach(() => {
		//resets the props and variables before every test so that state from one test doesn't leak into another
		props = {
			product: "",
			onRemove: undefined
		}
		mountedProductRow = undefined;
	});


	//tests:
	it('always renders a tr element', () => {
		const tr = productRow().find('tr');
		expect(tr.length).toBeGreaterThan(0);
	});


	it('renders without crashing', () => {
	  const table = document.createElement('table');
	  ReactDOM.render(<ProductRow />, table);
	  ReactDOM.unmountComponentAtNode(table);
	});

}); //describe