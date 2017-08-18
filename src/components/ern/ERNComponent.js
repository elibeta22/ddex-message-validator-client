import request from 'superagent/lib/client';
import React from 'react';
import {Panel, Button, Form, FormGroup, ControlLabel, Grid, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import ActionCreator from '../../actions/AppActions';
import ERNPanels from './ValidatorPanels';
import ERNForm from './ERNForm';
import Store from '../../stores/ValidateStore';
import Loader from 'react-loader';
var $ = require('jquery');

class ERNComponent extends React.Component {

  constructor() {
    super();
    this.state = { ernFile: undefined,
                   schemaValidation: '',
                   schemaPanel: 'Schema Validation (XSD)',
                   schematronPanel: 'Schematron Validation',
                   schematronValidation: [],
                   ernVersion: 'ERN Version',
                   profileVersion: 'Profile Version',
                   releaseVersion: 'Release Version'};


    this.handleErnFileChange = this.handleErnFileChange.bind(this);
    this.handleERNVersionChange = this.handleERNVersionChange.bind(this);
    this.handleProfileVersionChange = this.handleProfileVersionChange.bind(this);
    this.handleReleaseVersionChange = this.handleReleaseVersionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
    <div>
      <Grid>
        <div>

            <ERNForm handleSubmit={this.handleSubmit}
                     handleERNVersionChange={this.handleERNVersionChange}
                     ernVersion={this.state.ernVersion}
                     handleProfileVersionChange={this.handleProfileVersionChange}
                     profileVersion={this.state.profileVersion}
                     handleReleaseVersionChange={this.handleReleaseVersionChange}
                     releaseVersion={this.state.releaseVersion}
                     ernFile={this.state.ernFile}
                     handleErnFileChange={this.handleErnFileChange}/>

            <ERNPanels schematronValidation={this.state.schematronValidation}
                      schematronPanel={this.state.schematronPanel}
                      schemaValidation={this.state.schemaValidation}
                      schemaPanel={this.state.schemaPanel}/>
          </div>
      </Grid>
  </div>
    );
  }

   handleErnFileChange(event) {
     this.setState({ernFile: event.target.value, schemaPanel: 'Schema Validation (XSD)', schematronValidation: [], schemaValidation: ''});
     ActionCreator.reset();
   }

    handleERNVersionChange(event) {
      event.preventDefault();
      this.setState({ernVersion: event.target.name, realERNVersion: event.target.title});
    }

   handleProfileVersionChange(event) {
        event.preventDefault();
        this.setState({profileVersion: event.target.title});
      }

   handleReleaseVersionChange(event) {
        event.preventDefault();
        this.setState({releaseVersion: event.target.name, realReleaseVersion: event.target.title});
        console.log(this.state.realReleaseVersion);
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

       if (this.state.ernVersion == ''){
           this.setState({ ernVersion:'ERN Version', schemaValidation: '', schemaPanel: 'Schema Validation (XSD)'});
        }

        if (this.state.profileVersion == ''){
           this.setState({ profileVersion:'Profile Version', schematronValidation: []});
        }

        if (this.state.releaseVersion == ''){
              this.setState({ releaseVersion:'Release Version', schematronValidation: []});
        }
  }

  handleSubmit(e){
      e.preventDefault();

      // we use FormData as superagent does not support mulitpart on the client
      if (this.state.ernVersion === "ERN Version" ||
          this.state.releaseVersion === "Release Version" ||
          this.state.profileVersion === "Profile Version"){
                    this.setState({ schemaValidation:'Please choose a schemaVersion, schematronVersion and Profile Version to begin validating your XML Document.'});
                    return false;
      }
      if(this.state.ernFile === '' || this.state.ernFile === undefined){
            this.setState({ schemaValidation:'Please insert Document', schematronValidation:[], schemaPanel: 'Schema Validation (XSD)'});
            return false;
      }
      this.setState({ schemaPanel: 'Schema Validation (XSD) - ' + this.state.ernFile.replace(/^.*[\\\/]/, '')});
      var form = $('#ern-validate-form')[0];
      var formData = new FormData(form);
      formData.append("ernVersion", this.state.realERNVersion);
      formData.append("profileVersion", this.state.profileVersion);
      formData.append("releaseVersion", this.state.realReleaseVersion);
      ActionCreator.ValidateXML(formData);
      this.setState({ ernFile:''});

}

}
export default ERNComponent;
