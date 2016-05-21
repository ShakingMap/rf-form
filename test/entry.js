require('bootstrap/dist/css/bootstrap.css');

import React from 'react';
import ReactDOM from 'react-dom';

import * as buildOptions from 'rf-bootstrap3';
import Form from '../lib';

Form.defaultProps.buildOptions = buildOptions;

const schema = {
    name: {
        type: 'Text',
        label: 'Name',
        validate(v) {
            if (!v) return 'Name is required.'
        }
    },
    birthday: {
        type: 'Date',
        label: 'Birthday'
    },
    sex: {
        type: 'RadioGroup',
        label: 'Sex',
        options: {
            items: {
                male: 'Male',
                female: 'Female',
                unknown: {label: 'Unknown', disabled: true}
            }
        },
        validate(v) {
            if (!v) return 'Sex is required.'
        }
    },
    friends: {
        label: 'Friends',
        array: {
            type: 'Text',
            label: 'Friend Name'
        },
        validate(v) {
            if (v.length > 3) return 'You have too much friends.'
        }
    },
    account: {
        label: 'Account',
        group: {
            username: {
                type: 'Text',
                label: 'Username',
                validate(v) {if (!v) return 'Username is required.'}
            },
            password: {
                type: 'Password',
                label: 'Password',
                validate(v) {if (!v || v.length < 6) return 'Password length must be >= 6.'}
            },
            confirmPassword: {
                type: 'Password',
                label: 'Confirm Password',
                validate(v, fv /*form value*/) {
                    if (v !== fv.account.password) return 'Password does not match.'
                }
            }
        }
    }
};

class TestPage extends React.Component {
    render() {
        return <Form {...{
            schema: schema,
            onSubmit: (value, summary, detail)=> console.log({value, summary, detail})

            // you can specify value and onChange props to make the form work in controlled mode.
            // value: ...
            // onChange: (value, summary, detail)=> ...
        }}>
            <button className="btn btn-primary">Submit</button>
        </Form>
    }
}

let root = document.getElementById('root');
if (!root) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
}

ReactDOM.render(
    <TestPage/>,
    root
);

