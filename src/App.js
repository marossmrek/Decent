import React from 'react';
import Dropzone from 'react-dropzone'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: "",
                email: "",
                numberOfKids: null,
                accepted: false,
                files: []
            },
            formErrors: {}
        }
    }

    handleTextChange(event) {
        this.handleAllTypeInputChange(event.target.name, event.target.value)
    }

    handleSelectChange(event, index, value) {
        this.handleAllTypeInputChange("numberOfKids", value)
    }

    updateCheck(event) {
        this.handleAllTypeInputChange("accepted", !this.state.formData.accepted)
    }

    onDrop(files) {
        this.handleAllTypeInputChange("files", files);
    }

    handleAllTypeInputChange(formDataType, formDataValue) {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [formDataType]: formDataValue
            }
        }));
    }

    handleSubmit() {
        this.simpleValidate();
    }

    simpleValidate() {
        const formErrors = {
            name: "",
            email: "",
            numeberOfKids: "",
            accepted: "",
            files: ""
        };

        const formData = this.state.formData;
        const reqExEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        formErrors.name = formData.name.trim().length < 5 && "Name needs to be at least 5 characters long";

        formErrors.email = !reqExEmail.test(formData.email) && "Not valid email";

        formErrors.numeberOfKids = formData.numberOfKids === null && "Number of kids is required";

        formErrors.accepted = !formData.accepted && "Must be accepted";

        formErrors.files = formData.files.length === 0 && "Image is required";

        this.setState({
            formErrors: {
                ...formErrors
            }
        });
    };

    render() {
        const {formData, formErrors} = this.state;
        return (
            <MuiThemeProvider>
                <Paper className="form-container" zDepth={3} rounded={false}>
                    <TextField onChange={this.handleTextChange.bind(this)}
                               name="name"
                               fullWidth={true}
                               value={formData.name}
                               hintText="Name"
                               errorText={formErrors.name}
                               errorStyle={{textAlign:"left"}}/>
                    <TextField onChange={this.handleTextChange.bind(this)}
                               name="email"
                               fullWidth={true}
                               value={formData.email}
                               hintText="Email"
                               errorText={formErrors.email}
                               errorStyle={{textAlign:"left"}}/>
                    <SelectField
                        onChange={this.handleSelectChange.bind(this)}
                        name="numberOfKids"
                        fullWidth={true}
                        value={formData.numberOfKids}
                        hintText="Number of kids"
                        errorText={formErrors.numeberOfKids}
                        errorStyle={{textAlign:"left"}}
                        selectedMenuItemStyle={{color:"#00BCD4"}}
                        className="form-type"
                    >
                        <MenuItem key={1} value={1} primaryText="One"/>
                        <MenuItem key={2} value={2} primaryText="Two"/>
                        <MenuItem key={3} value={3} primaryText="Three"/>
                        <MenuItem key={4} value={4} primaryText="Four"/>
                        <MenuItem key={5} value={5} primaryText="Five"/>
                    </SelectField>
                    <div className="form-type">
                        <Checkbox
                            name="test"
                            label="I accept everything"
                            checked={formData.accepted}
                            onCheck={this.updateCheck.bind(this)}
                        />
                        <div className="error">{formErrors.accepted}</div>
                    </div>
                    <div>
                        {console.log(this.state.formData.files)}
                        <Dropzone multiple={true} onDrop={this.onDrop.bind(this)} accept="image/png" className="dropzone">
                            {({ acceptedFiles, rejectedFiles }) => {
                                return acceptedFiles.length || rejectedFiles.length
                                    ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                                    : "Try dropping some png";
                            }}
                        </Dropzone>
                        <div className="error">{formErrors.files}</div>
                    </div>
                    <RaisedButton label="Submit" backgroundColor="#00BCD4" onClick={this.handleSubmit.bind(this)}/>
                </Paper>
            </MuiThemeProvider>
        );
    }

}

export default App;
