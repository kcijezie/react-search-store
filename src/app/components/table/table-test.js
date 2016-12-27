/**
 * Created by kenei on 21/12/2016.
 */


import React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
var $ = require('jquery');
var Foo = require('./table');

describe("A test suite for table component ", function() {

    var mockData = {
  "page": 1,
  "per_page": 5,
  "total": 25,
  "total_pages": 5,
  "titles": [
    {
      "id": "9780080019727",
      "titleType": "01",
      "titleText": "Astronomical Problems",
      "author": {
        "ContributorRole": "A01",
        "NamesBeforeKey": "B. A.",
        "KeyNames": "Vorontsov-Vel'Yaminov"
      }
    },
    {
      "id": "9780000001306",
      "titleType": "01",
      "titleText": "CAM Testing: BJ Migration patch 1 2011...",
      "author": {
        "ContributorRole": "A01",
        "NamesBeforeKey": "James",
        "KeyNames": "Carne",
        "LettersAfterNames": "Phd, Msc, MBE",
        "ProfessionalAffiliation": {
          "Affiliation": "The Elsevier University of Tech, MBA,MCA, professor of Physics"
        }
      }
    },
    {
      "id": "9780030640117",
      "titleType": "01",
      "titleText": "CHILD & OTHER CULT INUENT",
      "author": {
        "ContributorRole": "A01",
        "KeyNames": "Kessell"
      }
    },
    {
      "id": "9780039105983",
      "titleType": "01",
      "titleText": "DEV PRIMARY SCHOOL CURRICULUM",
      "author": {
        "ContributorRole": "A01",
        "KeyNames": "Campbell"
      }
    },
    {
      "id": "9780039102944",
      "titleType": "01",
      "titleText": "DEVIANCE REALITY AND SOCIETY 2ED",
      "author": {
        "ContributorRole": "A01",
        "KeyNames": "Box"
      }
    }
  ],
  "sort": "asc",
  "searchString": ""
};
    
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


    it("should contain states with values", function(done) {
        const wrapper = mount(<Foo/>);
        expect(wrapper.find('.mui-container-fluid').length).to.equal(1);
        expect($.ajax.calledOnce).to.be.true; // see if the spy WASN'T called
        expect(wrapper.state().page).to.equal(1);
        expect(wrapper.state().perPage).to.equal(5);
        expect(wrapper.state().pageSort).to.equal('asc');
        expect(wrapper.state().totalPages).to.equal(5);
        expect(wrapper.state().titles.length).to.equal(5);
        done(); // let Mocha know we're done async testing
    });
});;