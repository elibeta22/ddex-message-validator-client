import React, { Component } from 'react';
import {Jumbotron, Button } from 'react-bootstrap';


class Help extends Component {
  render() {
    return (
    <div>
      <Jumbotron>
        <h1>Help</h1>
        <p>This is a where help should go , a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <p><Button bsStyle="primary">Learn more</Button></p>
      </Jumbotron>
    </div>
    );
  }
}

export default Help;
