/**
 * Created by kenei on 21/12/2016.
 */


import React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
var ListTitle = require('./list-title');

describe("A test suite for list title component", function() {

    it("should contain props with defined properties", function() {
        const wrapper = shallow(<ListTitle/>);
        expect(wrapper.props().titles).to.be.defined;
        expect(wrapper.props().filterText).to.be.defined;
        expect(wrapper.props().pageSort).to.be.defined;
        expect(wrapper.props().onUserSort).to.be.defined;
    });

});