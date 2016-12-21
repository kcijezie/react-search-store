/**
 * Created by kenei on 21/12/2016.
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var SearchBar= require('../search-bar/search-bar');
var ListTitles= require('../list-title/list-title');
import Container from 'muicss/lib/react/container';

var TitleCollection = React.createClass({
        loadTitlesFromServer: function() {
            var self = this;
            $.ajax({
                url: '/api/titles/',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    self.setState({
                        titles: data
                    });



                },
                error: function (data) {
                    console.log('Error = '+data)

                }
            });
        },

        getInitialState: function() {
            return { titles: [], filterText: "" };
        },

        handleUserInput: function(filterText){
            this.setState({
                filterText: filterText
            });

        },
        componentDidMount: function() {
            this.loadTitlesFromServer();
        },

        render: function() {
            return (
                <div className="mui-container-fluid">
                    <SearchBar
                        filterText={this.state.filterText}
                        onUserInput={this.handleUserInput}
                        />
                
                    <ListTitles
                            titles={this.state.titles}
                            filterText={this.state.filterText}
                            />
                </div>
            );
}
});


module.exports =  TitleCollection;