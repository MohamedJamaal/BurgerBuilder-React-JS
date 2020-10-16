import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() });

describe('<NavigationItems/>', () => { // describe takes items which want to test and test logic
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        // our expectaions 
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('should render Three <NavigationItem /> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({ isAuthenticated: true });
        // our expectaions 
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })
    it('should find logout elements if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });

        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })
})