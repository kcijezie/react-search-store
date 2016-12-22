/**
 * Created by kenei on 21/12/2016.
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'muicss/lib/react/form';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';

class TitlesPerPage extends React.Component {
   constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onUserSelect(
            e.target.value
        );
    }
  render() {
    return (
      <Form>
        <Select 
          defaultValue="5"
          onChange={this.handleChange}
        >
          <Option value="5" label="Show 5 Titles Per Page" />
          <Option value="10" label="Show 10 Titles Per Page" />
          <Option value="25" label="Show 25 Titles Per Page" />
        </Select>
        <br />
      </Form>
    );
  }
}


module.exports =  TitlesPerPage;