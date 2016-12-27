/**
 * Created by kenei on 21/12/2016.
 */


import React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
var SearchBar = require('./search-bar');

describe("A test suite for search bar component", function() {

    it("should contain props with defined properties", function() {
        const wrapper = shallow(<SearchBar />);
        expect(wrapper.props().filterText).to.be.defined;
        expect(wrapper.props().onUserInput).to.be.defined;
    });

});