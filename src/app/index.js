'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var TitleCollection= require('./components/table/table');
import  SingleDatePicker from './components/date-picker/single-date-picker';
import  DateRangePicker from './components/date-picker/range-date-picker';


//components like this added container added filters
//dir folder problems

ReactDOM.render(
<TitleCollection />,
    document.getElementById('container2')
);

