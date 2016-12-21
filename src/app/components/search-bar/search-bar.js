/**
 * Created by kenei on 21/12/2016.
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';


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
                    hint="Search titles..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                    />
            </Form>
        );
    }
}



module.exports =  SearchBar;