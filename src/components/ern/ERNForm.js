import request from 'superagent/lib/client'
import React from 'react';
import {Panel, Button, Form, FormGroup, ControlLabel, Grid, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import '../../styles/App.css';


class ERNForm extends React.Component{
  render(){
    return(
          <Panel header="Insert Document">
            <Form inline id="ern-validate-form" onSubmit={this.props.handleSubmit}>

              <FormGroup onClick={this.props.handleERNVersionChange}>
                 <ButtonToolbar>
                   <DropdownButton title={this.props.ernVersion} bsSize="small" id="dropdown-size-small">
                    <MenuItem name="ERN 3.4.1" title="3.4.1">ERN 3.4.1</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="ERN 3.7.1" title="3.7.1">ERN 3.7.1</MenuItem>
                  </DropdownButton>
                </ButtonToolbar>
              </FormGroup>

              <FormGroup onClick={this.props.handleProfileVersionChange}>
                 <ButtonToolbar>
                   <DropdownButton title={this.props.profileVersion} bsSize="small" id="dropdown-size-small">
                    <MenuItem title="1.4">1.4</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem title="1.7">1.7</MenuItem>
                  </DropdownButton>
                </ButtonToolbar>
              </FormGroup>

              <FormGroup onClick={this.props.handleReleaseVersionChange}>
                 <ButtonToolbar>
                   <DropdownButton title={this.props.releaseVersion} bsSize="small" id="dropdown-size-small">
                    <MenuItem id="dropdownRelease">
                    <MenuItem name="Audio Album" title="AudioAlbum">Audio Album</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Audio Album (Music Only)" title="AudioAlbumMusicOnly">Audio Album (Music Only)</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Audio Book" title="AudioBook">Audio Book</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Audio Single" title="AudioSingle">Audio Single</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Business Profile" title="BusinessProfile">Business Profile</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Digital Boxed Set" title="DigitalBoxedSet">Digital Boxed Set</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Digital Classical Audio Album" title="DigitalClassicalAudioAlbum">Digital Classical Audio Album</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Film Bundle" title="FilmBundle">Film Bundle</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Longform Video" title="LongformVideo">Longform Video</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Midi Ringtone" title="MidiRingtone">Midi Ringtone</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Mixed Media Bundle" title="MixedMediaBundle">Mixed Media Bundle</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Ringtone" title="Ringtone">Ringtone</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Simple Video Single" title="SimpleVideoSingle">Simple Video Single</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Single Resource Release" title="SingleResourceRelease">Single Resource Release</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Single Resource Release (Cover Art)" title="SingleResourceReleaseWithCoverArt">Single Resource Release (Cover Art)</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="TV Series" title="TVSeries">TV Series</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Video Album" title="VideoAlbum">Video Album</MenuItem>
                    <MenuItem  divider/>
                    <MenuItem name="Video Single" title="VideoSingle">Video Single</MenuItem>
                    </MenuItem>
                  </DropdownButton>
                </ButtonToolbar>
              </FormGroup>
              <br/>
              <FormGroup>
                  <ControlLabel></ControlLabel>
                  {' '}
                  <input type="file" name="ernFile" value={this.props.ernFile} onChange={this.props.handleErnFileChange} />
              </FormGroup>
                {' '}
                <br/>
                <br/>
              <Button bsStyle="primary" type="submit">Validate</Button>
            </Form>
          </Panel>

      );
    }
  }

export default ERNForm;
