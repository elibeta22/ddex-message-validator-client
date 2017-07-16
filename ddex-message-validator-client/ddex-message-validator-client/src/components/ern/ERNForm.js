import request from 'superagent/lib/client'
import React from 'react';
import {Panel, Button, Form, FormGroup, ControlLabel,Grid } from 'react-bootstrap';
import ActionCreator from '../../actions/AppActions';
import Store from '../../stores/ValidateStore';
import Loader from 'react-loader';
var $ = require('jquery');

class ERNForm extends React.Component {

  constructor() {
    super();
    this.state = { ernFile: undefined, schemaValidation: '', schematronValidation: [] };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

  }


  render() {
    return (
    <div>
        <Grid>

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
          <div>
          <Panel header="Schema Validation (XSD)">
              <xmp>
                 <p>
                    {this.state.schemaValidation}
                 </p>
              </xmp>
           </Panel>
          </div>
           <Panel bsStyle="success" header="Schematron Validation">
              <xmp>
              <div>
                {this.state.schematronValidation.map((schematronValidate) => (
                                               <p>{schematronValidate.msg}  {schematronValidate.role}</p>
                                                 ))}
              </div>
              </xmp>
           </Panel>
          </div>
      </Grid>
  </div>
    );
  }

   handleChange(event) {
     this.setState({ernFile: event.target.value});
     ActionCreator.reset();
   }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentDidUpdate() {
    if (this.state.schemaValidation == 'Document is valid'){
      console.log('its valid mofo');
      var form = $('#ern-validate-form')[0];
      var formData = new FormData(form);
      ActionCreator.schematronValidate(formData);
      this.setState({ ernFile: '', schemaValidation:'DOCUMENT IS VALID'});
    }
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
      this.setState({ schemaValidation: Store.getSchemaValidation(), schematronValidation: Store.getSchematronValidation() });
  }

  handleSubmit(e){
      e.preventDefault();
      // we use FormData as superagent does not support mulitpart on the client
      var form = $('#ern-validate-form')[0];
      var formData = new FormData(form);
      ActionCreator.schemaValidate(formData);
  }

}

export default ERNForm;
