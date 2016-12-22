/**
 * Created by kenei on 21/12/2016.
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

class ListTitles extends React.Component {
     constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleArrowDisplay = this.handleArrowDisplay.bind(this);
    }

    handleClick() {
        var self = this;
        var sortValue = self.props.pageSort === 'asc' ? 'desc' : 'asc';
        
        self.props.onUserSort(
            sortValue
        );
    }
    
    handleArrowDisplay(){
        var self = this;
        return self.props.pageSort === 'asc' ? 'fa-long-arrow-up' : 'fa-long-arrow-down';
    }
    render() {
        var self = this;
        var titles  = self.props.titles.map(function(title) {
            if (title.titleText.toLowerCase().indexOf(self.props.filterText.toLowerCase()) === -1) {
                return;
            }

            return <tr key={title.id}><td><b>{title.id}</b></td><td>{title.titleText}</td></tr>;
        });

        return (
            <table className="mui-table mui-table--bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th onClick={this.handleClick} className="sortHeader">
                            <i 
                                className="fa fa-long-arrow-up" 
                                aria-hidden="true" 
                                style={{display: self.props.pageSort === 'asc' ? 'inline' : 'none' }}></i> 
                            <i 
                                className="fa fa-long-arrow-down" 
                                aria-hidden="true" 
                                style={{display: self.props.pageSort === 'desc' ? 'inline' : 'none' }}></i> 
                                &nbsp; Title</th>
                    </tr>
                </thead>
             <tbody>
                {titles}
             </tbody>
           </table>
        );
    }
}


module.exports =  ListTitles;