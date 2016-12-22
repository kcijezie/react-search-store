/**
 * Created by kenei on 21/12/2016.
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';

class TitlesPagination extends React.Component {
     constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e)
        this.props.onUserClick(
            e.target.textContent
        );
    }
    
  render() {
    var self = this;
      var html = [];
      for(var i = 1; i <= self.props.totalPages; i++){
          html.push(
            <Button key={i} disabled={self.props.page === i} color="primary" onClick={this.handleChange}>{i}</Button>
         );
      }
        
    return (
    <Container>    
      <div className="mui--text-center">    
          {html}
      </div>
    </Container>    
    );
  }
}

module.exports =  TitlesPagination;