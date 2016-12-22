/**
 * Created by kenei on 21/12/2016.
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var SearchBar= require('../search-bar/search-bar');
var ListTitles= require('../list-title/list-title');
var TitlesPerPage= require('../titles-per-page/titles-per-page');
var TitlesPagination= require('../titles-pagination/titles-pagination');
import Container from 'muicss/lib/react/container';

var TitleCollection = React.createClass({
        loadTitlesFromServer: function(pageNo, titleCount, sort, searchString) {
            var self = this;
            var perPage = titleCount || 5;
            var pageSort = sort || 'asc';
            $.ajax({
                url: '/api/titles?pageNo='+ pageNo +'&perPage='+ perPage +'&sort='+ pageSort +'&searchString='+ searchString,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    self.setState({
                        titles: data.titles,
                        page: data.page,
                        totalPages: data.total_pages,
                        perPage: data.per_page,
                        pageSort: data.sort,
                        filterText: data.searchString
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
            this.loadTitlesFromServer(this.state.page, this.state.perPage, this.state.pageSort, filterText);
        },
    
        handleUserSelect: function(selectValue){
            this.loadTitlesFromServer(1, selectValue, this.state.pageSort, this.state.filterText);
        },
    
        handleUserClick: function(clickValue){
            this.loadTitlesFromServer(clickValue, this.state.perPage, this.state.pageSort, this.state.filterText);
        },
    
        handleUserSort: function(sortValue){
            this.loadTitlesFromServer(this.state.page, this.state.perPage, sortValue, this.state.filterText);
        },

        componentDidMount: function() {
            this.loadTitlesFromServer(1, 5, 'asc', '');
        },

        render: function() {
            return (
                <div className="mui-container-fluid">
                    <SearchBar
                        filterText={this.state.filterText}
                        onUserInput={this.handleUserInput}
                        />
                
                    <TitlesPerPage 
                        onUserSelect={this.handleUserSelect}
                        />
                
                    <ListTitles
                            titles={this.state.titles}
                            filterText={this.state.filterText}
                            pageSort={this.state.pageSort}
                            onUserSort={this.handleUserSort}
                            />
                
                    <TitlesPagination 
                        page={this.state.page}
                        totalPages={this.state.totalPages}
                        onUserClick={this.handleUserClick}
                        />
                    <br />
                </div>
            );
}
});


module.exports =  TitleCollection;