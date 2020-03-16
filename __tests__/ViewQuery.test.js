import React from 'react';
import { shallow } from 'enzyme';
import ViewQuery from '../src/ViewQuery';

describe('Testing ViewQuery Component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <ViewQuery />
        );

        expect(wrapper).toMatchSnapshot();
    });
});