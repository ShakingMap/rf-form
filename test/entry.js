require('bootstrap/dist/css/bootstrap.css');

import React from 'react';
import ReactDOM from 'react-dom';

import * as buildOptions from 'rf-bootstrap3';
import Form from '../lib';

Form.defaultProps.buildOptions = buildOptions;

const schema = {
    age: {
        type: 'Number',
        label: 'Age',
        validate(v) {
            if (v < 18) return 'age must >= 18'
        }
    },
    account: {
        label: 'Group',
        group: {
            username: {
                type: 'Text',
                label: 'Username',
                validate(v) {
                    if (v === 'bob') return 'no bob!'
                }
            },
            password: {
                type: 'Password',
                label: 'Password'
            }
        }
    },
    friends: {
        label: 'Friends',
        validate(v) {
            if (v && v.length > 2) return 'too many friends!'
        },
        array: {
            // label: ...
            group: {
                name: {
                    type: 'Text',
                    label: 'Name',
                    validate(v) {
                        if (v !== 'bob') return 'must be bob!'
                    }
                }
            }
        }
    }
};

schema.friends.array.group.friends = schema.friends;

const initValues = {
    age: 10,
    account: {
        username: 'bob',
        password: '123'
    },
    friends: [
        {name: 'alan'},
        {name: 'doge', friends: [{name: 'cate'}]}
    ]
};

class TestPage extends React.Component {
    render() {
        return <Form {...{
            schema,
            initValues,
            onSubmit: (value, vd)=> console.log(value, vd)
        }}>
            <button className="btn btn-primary">提交</button>
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

