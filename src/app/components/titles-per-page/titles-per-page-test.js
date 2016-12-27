/**
 * Created by kenei on 21/12/2016.
 */


import React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
var TitlesPerPage = require('./titles-per-page');

describe("A test suite for titles per page component", function() {

    it("should contain props with defined properties", function() {
        const wrapper = shallow(<TitlesPerPage />);
        expect(wrapper.props().onUserSelect).to.be.defined;
        expect(wrapper.props().perPage).to.be.defined;
    });

});