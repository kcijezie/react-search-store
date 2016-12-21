/**
 * Created by kenei on 12/10/2016.
 */


import React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
var $ = require('jquery');
var Foo = require('./table');

describe("A suite", function() {

    var mockData = [
          {
            "id": "9780000001306",
            "titleType": "01",
            "titleText": "CAM Testing: BJ Migration patch 1 2011..."
          },
          {
            "id": "9780000001962",
            "titleType": "01",
            "titleText": "migration testing EW interface 10.5 - NOV sara"
          }
    ];
    
    // Use Sinon to replace jQuery's ajax method
    // with a spy.
    beforeEach(function() {
        sinon.stub($, 'ajax').yieldsTo('success', mockData);
    });

    // Restor jQuery's ajax method to its
    // original state
    afterEach(function() {
        $.ajax.restore();
    })

    it("contains spec with an expectation", function(done) {
        expect(shallow(<Foo />).contains(<thead><tr><th>Id</th><th>Title</th></tr></thead>)).to.equal(true);
        expect($.ajax.calledOnce).to.be.false; // see if the spy WASN'T called
        done(); // let Mocha know we're done async testing
    });

    it("contains spec with an expectation", function(done) {
        expect(mount(<Foo />).find('.mui-table').length).to.equal(1);
        expect($.ajax.calledOnce).to.be.true; // see if the spy WASN'T called
        done(); // let Mocha know we're done async testing
    });
});;