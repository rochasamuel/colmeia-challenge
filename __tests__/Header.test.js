import React from 'react';
import { shallow } from 'enzyme';
import Header from '../src/Header';

describe('Testing Header Component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Header />
        );

        expect(wrapper).toMatchSnapshot();
    });
});