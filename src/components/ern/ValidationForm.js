import React from 'react';
import {Panel, Button, Form, FormGroup, ControlLabel,Grid, ButtonToolbar,DropdownButton,MenuItem } from 'react-bootstrap';

class ValidationForm extends React.Component {

  render() {
    return (
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
    );
  }

  }


export default ValidationForm;
