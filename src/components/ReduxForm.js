import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

const validate = values => {
    const errors = {};
    const requiredFields = [
        'name',
        'email',
        'numberOfKids',
        'accepted',
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }
    return errors
};

const renderTextField = (
    { input, label, meta: { touched, error }, ...custom },
) => (
    <TextField
        fullWidth={true}
        hintText={label}
        floatingLabelText={label}
        errorStyle={{textAlign: "left"}}
        errorText={touched && error}
        {...input}
        {...custom}
    />
);

const renderSelectField = (
    { input, label, meta: { touched, error }, children, ...custom },
) => (
    <SelectField
        fullWidth={true}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
    />
);

const MaterialUiForm = props => {
    const { handleSubmit, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name="name"
                    component={renderTextField}
                    label="Name"
                />
            </div>
            <div>
                <Field name="email" component={renderTextField} label="Email" />
            </div>
            <div>
                <Field
                    className="form-type"
                    name="numberOfKids"
                    component={renderSelectField}
                    label="Number of kids"
                >
                    <MenuItem value={1} primaryText="One" />
                    <MenuItem value={2} primaryText="Two" />
                    <MenuItem value={3} primaryText="Three" />
                    <MenuItem value={4} primaryText="Four" />
                    <MenuItem value={5} primaryText="Five" />
                </Field>
            </div>
            <div>
                <RaisedButton type="submit" disabled={pristine || submitting} label="Submit" primary={true}/>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'MaterialUiForm',
    validate
})(MaterialUiForm);
