import React from 'react';

import { Panel, Button, Form} from 'react-bootstrap';

class ValidateERN extends React.Component {
  render() {
    return (
      <div>
        <Panel>
          <Form inline acceptCharset="utf-8" onSubmit={this.handleSubmit1} id="validateERNForm">
            <div className="form-group">
              <label for="ernFile">Choose ERN</label>
              {' '}
              <input type="file" className="form-control" name="ern-file"/>
            </div>
            {' '}
            <Button bsStyle="primary" type="submit">Validate</Button>
          </Form>
        </Panel>

        <Panel header="Schema Validation (XSD)">
          Panel content
        </Panel>

        <Panel header="Schematron Validation">
          Panel content
        </Panel>
      </div>
    );
  }

    handleSubmit(e) {
      e.preventDefault();
      alert('crack');
    }

  handleSubmit1() {
      var form = $('#validateERNForm')[0];
      var data = new FormData(form);
      data.append("test-param", "This is some extra data, testing");

      e.preventDefault();
      $.ajax({
            url: 'http://localhost:6060/api/validate1',
            enctype: 'multipart/form-data',
            type: 'POST',
            data: donation,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function(data) {
              console.log('Form submitted great')
              //this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });
  }
}

export default ValidateERN;
