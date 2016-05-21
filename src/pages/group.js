import React from 'react';
import Form from 'rf-form';

const schema = {
    account: {
        label: 'Account',
        validate(v){
            if (v.password !== v.confirmPassword) return 'password does not match'
        },
        group: {
            username: {
                type: 'Text',
                label: 'Username',
                validate(v) {
                    if (!v) return 'username cannot be empty.'
                }
            },
            password: {
                type: 'Password',
                label: 'Password',
                validate(v) {
                    if (!v || v.length < 6) return 'password length must >= 6.'
                }
            },
            confirmPassword: {
                type: 'Password',
                label: 'Confirm Password',
                validate(v, fv) {
                    if (!v || v.length < 6) return 'confirm password length must >= 6.';
                    if (v !== fv.account.password) return 'password does not match'
                }
            }
        }
    }
};

const code = `const schema = {
    account: {
        label: 'Account',
        validate(v){
            if (v.password !== v.confirmPassword) return 'password does not match'
        },
        group: {
            username: {
                type: 'Text',
                label: 'Username',
                validate(v) {
                    if (!v) return 'username cannot be empty.'
                }
            },
            password: {
                type: 'Password',
                label: 'Password',
                validate(v) {
                    if (!v || v.length < 6) return 'password length must >= 6.'
                }
            },
            confirmPassword: {
                type: 'Password',
                label: 'Confirm Password',
                validate(v, fv) {
                    if (!v || v.length < 6) return 'confirm password length must >= 6.';
                    if (v !== fv.account.password) return 'password does not match'
                }
            }
        }
    }
};

<Form {...{
    schema: schema,
    onSubmit: (value, summary, detail)=> console.log({value, summary, detail})
}}>
    <button className="btn btn-primary">Submit</button>
</Form>`;

export default class Page extends React.Component {
    render() {
        return <div>
            <h2>Group</h2>
            
            <h3>Code</h3>
            
            <pre>{code}</pre>
            
            <h3>Demo</h3>
            
            <Form {...{
                schema: schema,
                onSubmit: (value, summary, detail)=> console.log({value, summary, detail})
            }}>
                <button className="btn btn-primary">Submit</button>
            </Form>
        </div>
    }
}