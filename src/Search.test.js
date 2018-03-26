import React from 'react';
import { mount, shallow } from "enzyme";
import ReactDOM from 'react-dom';
import Search from './Search';


describe('Search', () => {
	let props; 
	let mountedSearch;

	const searchForm = () => {
		if(!mountedSearch){ 
			mountedSearch = mount(
				<Search {...props} />
			)
		}
		// this function returns an enzyme ReactWrapper
		return mountedSearch;
	}


	beforeEach(() => {
		//resets the props and variables before every test so that state from one test doesn't leak into another
		props = {
			searchFilter: undefined,
			inStock: false
		}
		mountedSearch = undefined;
	});


	//tests:
	it('always renders a form element', () => {
		const form = searchForm().find('form');
		expect(form.length).toBeGreaterThan(0);
	});


	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Search />, div);
	  ReactDOM.unmountComponentAtNode(div);
	});

	test('checkbox label text changes on click', () => {
		const label = shallow(<label htmlFor="in-stock">Only show products in stock</label>);
		const checkbox = shallow(<input type="checkbox" name="in-stock" value="false" />);
		expect(checkbox.value).toEqual(false); //reading undefined!!!???
		// expect(checkbox.value).toBeFalsy;
		checkbox().simulate('change', {target: {checked: true}});
		expect(label.text()).toEqual('Only show products in stock');
		checkbox.find('[type="checkbox"]').simulate('change', { target: { checked: false } });
		expect(checkbox.value).toEqual(true);
		expect(label.text()).toEqual('Current products');
	});

	

}); //describe
