import React from 'react';
import Dropzone from 'react-dropzone'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import Form from './Service/form-service';

import GoogleLogin from 'react-google-login';

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
            formErrors: {},
            isLogin: false,
            snackBar: {
                isOpen: false,
                msg: ""
            }
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
            },
            snackBar: {
                isOpen: false,
                msg: ""
            }
        }));
    }

    handleSubmit() {
        this.simpleValidate();
    }

    sendForm(isValid) {
        isValid && this.sendFormData();
    }

    async sendFormData() {
        var result = await Form.submit(this.state.formData);
        if (result) {
            if (result.status === 200 && result.data) {
                this.setState({
                    formErrors: {
                        ...result.data
                    }
                });
            } else if (result.status === 204) {
                this.setState({
                    formData: {
                        name: "",
                        email: "",
                        numberOfKids: null,
                        accepted: false,
                        files: []
                    },
                    snackBar: {
                        isOpen: true,
                        msg: "Send data successfully"
                    }
                })
            } else if (result.status === 500) {
                this.setState({
                    snackBar: {
                        isOpen: true,
                        msg: "Something wrong, please try late"
                    }
                })
            }
        }
    }

    simpleValidate() {
        const formErrors = {};

        const formData = this.state.formData;

        const reqExEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        formErrors.name = formData.name.trim().length < 5 && "Name needs to be at least 5 characters long";

        formErrors.email = !reqExEmail.test(formData.email) && "Not valid email";

        formErrors.numberOfKids = formData.numberOfKids === null && "Number of kids is required";

        formErrors.accepted = !formData.accepted && "Must be accepted";

        formErrors.files = formData.files.length === 0 && "Image is required";

        let validForm = formErrors.name || formErrors.email || formErrors.numeberOfKids ||
        formErrors.accepted || formErrors.files ? false : true;

        this.setState({
            formErrors: {
                ...formErrors
            }
        }, this.sendForm(validForm));
    };

    render() {
        const {formData, formErrors} = this.state;
        return (
            <MuiThemeProvider>
                <div>
                    <Paper className="form-container" zDepth={3} rounded={false}>
                        <TextField onChange={this.handleTextChange.bind(this)}
                                   name="name"
                                   fullWidth={true}
                                   value={formData.name}
                                   hintText="Name"
                                   errorText={formErrors.name}
                                   errorStyle={{textAlign: "left"}}/>
                        <TextField onChange={this.handleTextChange.bind(this)}
                                   name="email"
                                   fullWidth={true}
                                   value={formData.email}
                                   hintText="Email"
                                   errorText={formErrors.email}
                                   errorStyle={{textAlign: "left"}}/>
                        <SelectField
                            onChange={this.handleSelectChange.bind(this)}
                            name="numberOfKids"
                            fullWidth={true}
                            value={formData.numberOfKids}
                            hintText="Number of kids"
                            errorText={formErrors.numberOfKids}
                            errorStyle={{textAlign: "left"}}
                            selectedMenuItemStyle={{color: "#00BCD4"}}
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
                            <Dropzone multiple={true} onDrop={this.onDrop.bind(this)} accept="image/png"
                                      className="dropzone">
                                {({acceptedFiles, rejectedFiles}) => {
                                    return acceptedFiles.length || rejectedFiles.length
                                        ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                                        : "Try dropping some png";
                                }}
                            </Dropzone>
                            <div className="error">{formErrors.files}</div>
                        </div>
                        <div>
                            {
                                !this.state.isLogin ?
                                    <GoogleLogin
                                        clientId="333261271673-dpbki5e39148gtpaqisni0sv8qttejrt.apps.googleusercontent.com"
                                        buttonText="Login with Google"
                                        className="loginBtn loginBtn-google"
                                        onSuccess={() => this.setState({
                                            isLogin: true,
                                            snackBar: {
                                                isOpen: true,
                                                msg: "Google authetification success, please submit form"
                                            }
                                        })}
                                    /> :
                                    <RaisedButton label="Submit" primary={true} onClick={this.handleSubmit.bind(this)}/>
                            }
                        </div>
                    </Paper>
                    <Snackbar
                        open={this.state.snackBar.isOpen}
                        message={this.state.snackBar.msg}
                        autoHideDuration={50000}
                        className="snackbar"
                    />
                </div>
            </MuiThemeProvider>
        );
    }

}

export default App;
