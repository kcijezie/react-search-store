/**
 * Created by kenei on 21/12/2016.
 */


import React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
var TitlesPagination = require('./titles-pagination');

describe("A test suite for titles pagination component", function() {

    it("should contain props with defined properties", function() {
        const wrapper = shallow(<TitlesPagination />);
        expect(wrapper.props().page).to.be.defined;
        expect(wrapper.props().totalPages).to.be.defined;
        expect(wrapper.props().onUserClick).to.be.defined;
    });

});