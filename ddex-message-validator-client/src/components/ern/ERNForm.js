import request from 'superagent/lib/client'
import React from 'react';
import {Panel, Button, Form, FormGroup, ControlLabel } from 'react-bootstrap';
import ActionCreator from '../../actions/AppActions';
import Store from '../../stores/ValidateStore';

var $ = require('jquery');

class ERNForm extends React.Component {

  constructor() {
    super();
    this.state = { ernFile: undefined, validation: []}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

  }


  render() {
    return (
          <div>
          <Panel>
          <Form inline id="ern-validate-form" onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel></ControlLabel>
              {' '}
              <input type="file" name="ernFile" value={this.state.ernFile} onChange={this.handleChange} />
            </FormGroup>
            {' '}
            <Button bsStyle="primary" type="submit">Validate</Button>
          </Form>
          </Panel>

          <Panel header="Schema Validation (XSD)">
           <p>
           </p>
           </Panel>

           <Panel bsStyle="success" header="Schematron Validation">
              <xmp>
                 <div>
                    {this.state.validation.map((validate) => (
                               <p>{validate.msg}  {validate.role}</p>
                                 ))}
                 </div>
              </xmp>
           </Panel>

          </div>
    );

  }

    handleChange(event) {
      this.setState({ernFile: event.target.value});
    }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
      this.setState({ validation: Store.getValidation() });
  }


  handleSubmit(e){
      e.preventDefault();

      // we use FormData as superagent does not support mulitpart on the client
      var form = $('#ern-validate-form')[0];

      var formData = new FormData(form);

      ActionCreator.validate(formData);

      this.setState({
        ernFile: ''
      });




}



}

export default ERNForm;
