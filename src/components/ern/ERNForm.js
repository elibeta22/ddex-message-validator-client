import request from 'superagent/lib/client'
import React from 'react';
import {Panel, Button, Form, FormGroup, ControlLabel, Grid, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import ActionCreator from '../../actions/AppActions';
import Store from '../../stores/ValidateStore';
import Loader from 'react-loader';
var $ = require('jquery');

class ERNForm extends React.Component {

  constructor() {
    super();
    this.state = { ernFile: undefined,
                   schemaValidation: '',
                   schematronValidation: [],
                   schemaVersion: 'schemaVersion',
                   schematronVersion: 'schematronVersion',
                   productVersion: 'productVersion'};


    this.handleErnFileChange = this.handleErnFileChange.bind(this);
    this.handleSchemaVersionChange = this.handleSchemaVersionChange.bind(this);
    this.handleSchematronVersionChange = this.handleSchematronVersionChange.bind(this);
    this.handleProductVersionChange = this.handleProductVersionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
    <div>
      <Grid>

        <div>
          <Panel header="Insert Document">
            <Form inline id="ern-validate-form" onSubmit={this.handleSubmit}>

              <FormGroup onClick={this.handleSchemaVersionChange}>
                 <ButtonToolbar>
                   <DropdownButton title={this.state.schemaVersion} bsSize="small" id="dropdown-size-small">
                    <MenuItem title="3.4.1">3.4.1</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem title="3.7.1">3.7.1</MenuItem>
                    <MenuItem divider />
                    <MenuItem title="3.9.1">3.9.1</MenuItem>
                  </DropdownButton>
                </ButtonToolbar>
              </FormGroup>

              <FormGroup onClick={this.handleSchematronVersionChange}>
                 <ButtonToolbar>
                   <DropdownButton title={this.state.schematronVersion} bsSize="small" id="dropdown-size-small">
                    <MenuItem title="14">14</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem title="17">17</MenuItem>
                  </DropdownButton>
                </ButtonToolbar>
              </FormGroup>

              <FormGroup onClick={this.handleProductVersionChange}>
                 <ButtonToolbar>
                   <DropdownButton title={this.state.productVersion} bsSize="small" id="dropdown-size-small">
                    <MenuItem title="AudioAlbumMusicOnly">AudioAlbumMusicOnly</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem title="AudioSingle">AudioSingle</MenuItem>
                  </DropdownButton>
                </ButtonToolbar>
              </FormGroup>
              <br/>
              <FormGroup>
                  <ControlLabel></ControlLabel>
                  {' '}
                  <input type="file" name="ernFile" value={this.state.ernFile} onChange={this.handleErnFileChange} />
              </FormGroup>
                {' '}
                <br/>
                <br/>
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

   handleErnFileChange(event) {
     this.setState({ernFile: event.target.value});
     ActionCreator.reset();
   }

    handleSchemaVersionChange(event) {
      event.preventDefault();
      this.setState({schemaVersion: event.target.title});
      console.log(this.state.schemaVersion);
    }

   handleSchematronVersionChange(event) {
        event.preventDefault();
        this.setState({schematronVersion: event.target.title});
        console.log(this.state.schematronVersion);
      }

   handleProductVersionChange(event) {
        event.preventDefault();
        this.setState({productVersion: event.target.title});
        console.log(this.state.productVersion);
      }


  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentDidUpdate() {
    if (this.state.schemaValidation == 'Document is valid' &&
       (this.state.schematronVersion !== 'schematronVersion' ||
        this.state.schematronVersion !== '' ||
        this.state.productVersion !== 'productVersion' ||
        this.state.productVersion !== '') ){

      console.log('its valid mofo');
      var form = $('#ern-validate-form')[0];
      var formData = new FormData(form);
      formData.append("schematronVersion", this.state.schematronVersion);
      formData.append("productVersion", this.state.productVersion);

      ActionCreator.schematronValidate(formData);
      this.setState({ ernFile: '', schemaValidation:'DOCUMENT IS VALID'});
    }

    if (this.state.schemaVersion == ''){
       this.setState({ schemaVersion:'schemaVersion', schemaValidation: []});
    }

    if (this.state.schematronVersion == ''){
       this.setState({ schematronVersion:'schematronVersion', schematronValidation: []});
    }

    if (this.state.productVersion == ''){
          this.setState({ productVersion:'productVersion', schematronValidation: []});
    }

    if (this.state.schemaValidation == 'Document is valid' &&
       (this.state.schematronVersion == 'schematronVersion' ||
        this.state.schematronVersion == '' ||
        this.state.productVersion == 'productVersion' ||
        this.state.productVersion == '') ){

           this.setState({  schematronValidation:[{'msg':'You must choose schematron and product version if you want to use schematron validation.'}]});

            }



  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
      this.setState({ schemaValidation: Store.getSchemaValidation(), schematronValidation: Store.getSchematronValidation().reverse() });
  }

  handleSubmit(e){
      e.preventDefault();
      // we use FormData as superagent does not support mulitpart on the client

      var form = $('#ern-validate-form')[0];
      var formData = new FormData(form);
      formData.append("schemaVersion", this.state.schemaVersion);
      if (this.state.ernFile == undefined || this.state.ernFile == ''){
         this.setState({ schemaValidation:'PLease insert a document to validate.'});
      }

      if(this.state.schemaVersion == 'schemaVersion'){
         this.setState({ schemaValidation:'You must choose a schema version.', schematronValidation:[]});
      }else{
        ActionCreator.schemaValidate(formData);
      }

  }
}

export default ERNForm;
