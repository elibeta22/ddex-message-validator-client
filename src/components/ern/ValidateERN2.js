import React from 'react';
import { Panel } from 'react-bootstrap';
import ValidationForm from './ValidationForm';

class ValidateERN2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = { schemaPanel: "Schema Panel", schematronPanel: "Schematron Panel" };
     this.schematronHandler = this.schematronHandler.bind(this)
  }

  schematronHandler(value) {

    var html = '';
    for(var i in value)    {
         var msg = value[i].msg;
         var role = value[i].role;
         html = html + msg + '\n\n'
    }

    this.setState({
          schematronPanel: html,
          schemaPanel: 'Valid'
          //schematronPanel: value
        })
  }

  render() {
    return (
      <div>
        <Panel>
          <ValidationForm  schematronHandler = {this.schematronHandler} />
        </Panel>

        <Panel className="bg-primary" header="Schema Validation (XSD)">
        <p> className="bg-primary">
          { this.state.schemaPanel }
        </p>
        </Panel>

        <Panel header="Schematron Validation">
        <xmp>
          { this.state.schematronPanel }
         </xmp>
        </Panel>
      </div>
    );
  }
}

export default ValidateERN2;
