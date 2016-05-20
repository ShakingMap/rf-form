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
    birthday: {
        type: 'DatetimeLocal',
        label: 'Birthday'
    },
    account: {
        label: 'Account',
        group: {
            username: {
                type: 'Text',
                label: 'Username',
                validate(v, fv) {
                    if (v === 'bob') return 'no bob!'
                },
                options: {
                    placeholder: 'input username'
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

const schema2 = {
    name: {
        type: 'Text',
        label: 'Name',
        validate(v) {
            if (!v) return 'you must have a name.'
        }
    }
};

schema.friends.array.group.friends = schema.friends;

class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                age: 10,
                account: {
                    username: 'bob',
                    password: '123'
                },
                friends: [
                    {name: 'alan'},
                    {name: 'doge', friends: [{name: 'cate'}]}
                ]
            }
        }
    }

    render() {
        return <div>
            <Form {...{
                ref: 'form1',
                schema,
                value: this.state.value,
                onChange: (v, e)=>this.setState({value: v})
            }}/>
            <Form {...{
                ref: 'form2',
                schema: schema2
            }}/>
            <Form {...{
                subForms: ()=> {
                    return {
                        form1: this.refs.form1,
                        form2: this.refs.form2
                    }
                },
                onSubmit: (value, summary, validation)=> console.log({value, summary, validation})
            }}>
                <button className="btn btn-primary">提交</button>
            </Form>
        </div>
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

