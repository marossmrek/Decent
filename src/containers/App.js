import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

import Form from '../service/form-service';
import MaterialUiForm from '../components/ReduxForm';

import {connect} from "react-redux";
import {setSnackBarMsg} from "../actions/snackAction";

class App extends React.Component {

    async sendFormData(values) {
        var result = await Form.submit(values);
        result.status === 204 ? this.props.setSnackBarMsg("Send data successfully") : this.props.setSnackBarMsg("Something wrong, please try late")

    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Paper className="form-container" zDepth={3} rounded={false}>
                        <MaterialUiForm onSubmit={this.sendFormData.bind(this)}/>
                    </Paper>
                    <Snackbar
                        open={this.props.snack.isOpen}
                        message={this.props.snack.msg}
                        autoHideDuration={50000}
                        className="snackbar"
                    />
                </div>
            </MuiThemeProvider>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        snack: state.snack,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSnackBarMsg: (msg) => {
            dispatch(setSnackBarMsg(msg));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
