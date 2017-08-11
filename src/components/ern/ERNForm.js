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
                   schemaPanel: 'Schema Validation (XSD)',
                   schematronPanel: 'Schematron Validation',
                   schematronValidation: [],
                   schemaVersion: 'schemaVersion',
                   schematronVersion: 'schematronVersion',
                   profileVersion: 'profileVersion'};


    this.handleErnFileChange = this.handleErnFileChange.bind(this);
    this.handleSchemaVersionChange = this.handleSchemaVersionChange.bind(this);
    this.handleSchematronVersionChange = this.handleSchematronVersionChange.bind(this);
    this.handleProfileVersionChange = this.handleProfileVersionChange.bind(this);
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

              <FormGroup onClick={this.handleProfileVersionChange}>
                 <ButtonToolbar>
                   <DropdownButton title={this.state.profileVersion} bsSize="small" id="dropdown-size-small">
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
        <Panel header={this.state.schemaPanel}>
              <xmp>
              <div>
                  {this.state.schemaValidation}
              </div>
              </xmp>
        </Panel>
        </div>
        <Panel bsStyle="success" header={this.state.schematronPanel}>
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
     this.setState({ernFile: event.target.value, schemaPanel: 'Schema Validation (XSD)', schematronValidation: [], schemaValidation: ''});
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

   handleProfileVersionChange(event) {
        event.preventDefault();
        this.setState({profileVersion: event.target.title});
        console.log(this.state.profileVersion);
      }


  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }


  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
      this.setState({ schemaValidation: Store.getSchemaValidation(), schematronValidation: Store.getSchematronValidation().reverse() });
  }


  componentDidUpdate(){

       if (this.state.schemaVersion == ''){
           this.setState({ schemaVersion:'schemaVersion', schemaValidation: ''});
        }

        if (this.state.schematronVersion == ''){
           this.setState({ schematronVersion:'schematronVersion', schematronValidation: []});
        }

        if (this.state.profileVersion == ''){
              this.setState({ profileVersion:'profileVersion', schematronValidation: []});
        }


  }

  handleSubmit(e){
      e.preventDefault();
      // we use FormData as superagent does not support mulitpart on the client
      if (this.state.schemaVersion === "schemaVersion" ||
          this.state.profileVersion === "profileVersion" ||
          this.state.schematronVersion === "schematronVersion"){
                    this.setState({ schemaValidation:'Please choose a schemaVersion, schematronVersion and Profile Version to begin validating your XML Document.'});
                    return false;
      }
      if(this.state.ernFile === '' || this.state.ernFile === undefined){
            this.setState({ schemaValidation:'Please insert Document', schematronValidation:[]});
            return false;
      }
      var form = $('#ern-validate-form')[0];
      var formData = new FormData(form);
      formData.append("schemaVersion", this.state.schemaVersion);
      formData.append("schematronVersion", this.state.schematronVersion);
      formData.append("profileVersion", this.state.profileVersion);
      ActionCreator.schemaValidate(formData);
      this.setState({ ernFile:''});

}

}
export default ERNForm;
