/**
 * Created by kenei on 21/12/2016.
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

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
            <table className="mui-table mui-table--bordered">
                <thead><tr><th>Id</th><th>Title</th></tr></thead>
                 <tbody>
                    {titles}
                 </tbody>
           </table>
        );
    }
}


module.exports =  ListTitles;