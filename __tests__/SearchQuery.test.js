import React from 'react';
import { render } from 'enzyme';
import SearchQuery from '../src/SearchQuery';

describe('Testing SearchQuery component', () => {
    it('Should render SearchQuery input correctly', () => {
        render(<SearchQuery onChange={() => {}}/>);
    });
});