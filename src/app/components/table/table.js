/**
 * Created by kenei on 12/10/2016.
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
// Access all components from `muicss/react` module
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onUserInput(
            e.target.value
        );
    }

    render() {
        return (
            <Form>
                <Input
                    hint="Search logs..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                    />
            </Form>
        );
    }
}

class ListTitles extends React.Component {
    render() {
        var self = this;
        var titles  = self.props.titles.map(function(title) {
            if (title.titleText.toLowerCase().indexOf(self.props.filterText.toLowerCase()) === -1) {
                return;
            }

            return <tr key={title.id}><td><b>{title.id}</b></td><td>{title.titleText}</td></tr>;
        });

        return (
            <tbody>
             {titles}
             </tbody>
        );
    }
}

var TitleCollection = React.createClass({
        //KCIJEZIE
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
                    <table className="mui-table mui-table--bordered">
                        <thead><tr><th>Id</th><th>Title</th></tr></thead>

                        <ListTitles
                            titles={this.state.titles}
                            filterText={this.state.filterText}
                            />

                    </table>
                </div>
            );
}
});


module.exports =  TitleCollection;