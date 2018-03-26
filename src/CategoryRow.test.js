import React from 'react';
import { mount } from "enzyme";
import ReactDOM from 'react-dom';
import CategoryRow from './CategoryRow';


describe('CategoryRow', () => {
	let props; //cat prop
	let mountedCategoryRow;

	const catRow = () => {
		if(!mountedCategoryRow){ 
			mountedCategoryRow = mount(
				<CategoryRow {...props} />
			)
		}
		// this function returns an enzyme ReactWrapper
		return mountedCategoryRow;
	}


	beforeEach(() => {
		//resets the props and variables before every test so that state from one test doesn't leak into another
		props = {
			cat: undefined
		}
		mountedCategoryRow = undefined;
	});


	//tests:
	it('always renders a tr element', () => {
		const tr = catRow().find('tr');
		expect(tr.length).toBeGreaterThan(0);
	});


	it('renders without crashing', () => {
	  const tbody = document.createElement('tbody');
	  ReactDOM.render(<CategoryRow />, tbody);
	  ReactDOM.unmountComponentAtNode(tbody);
	});

}); //describe