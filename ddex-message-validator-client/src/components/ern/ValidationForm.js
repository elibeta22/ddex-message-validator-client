import React from 'react';
import { Button, Form} from 'react-bootstrap';

class ValidationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ernFile: undefined }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  render() {
    return (
          <Form inline acceptCharset="utf-8" onSubmit={this.handleSubmit} onChange={this.handleChange} id="validateERNForm">
            <div className="form-group">
              <label htmlFor="ernFile">Choose ERN</label>
              {' '}
              <input type="file" className="form-control" name="ernFile" id="ernFile" value={this.state.ernFile} />
              <input type="hidden" className="form-control" name="testParam" id="testParam" value={this.state.testParam}/>
            </div>
            {' '}
            <Button bsStyle="primary" type="submit">Validate</Button>
          </Form>
    );
  }

    handleChange(event) {
      this.setState({ernFile: event.target.value});
    }

  handleSubmit(e) {
      //we don't want the form to submit, so we prevent the default behavior
      e.preventDefault();
        // Get form
        var form = $('#validateERNForm')[0];
        var data = new FormData(form);

		// If you want to add an extra field for the FormData
        data.append("testParam", "This is some extra data, testing");

     $.ajax({
            url: 'http://localhost:6060/api/json/validate',
            enctype: 'multipart/form-data',
            type: 'POST',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function(data) {
              console.log(data);
              this.props.schematronHandler(data);
              //this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });

      this.setState({
        ernFile: ''
      });
  }
}

export default ValidationForm;
