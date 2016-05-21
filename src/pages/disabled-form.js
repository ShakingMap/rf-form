import React from 'react';
import Form from 'rf-form';

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

const code = `const schema = {
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

<Form {...{
    disabled: true,
    schema: schema,
    onSubmit: (value, summary, detail)=> console.log({value, summary, detail})
}}>
    <button className="btn btn-primary">Submit</button>
</Form>`;

export default class Page extends React.Component {
    render() {
        return <div>
            <h2>Disabled Form</h2>
            <p>You can disable the whole form.</p>
            <h3>Code</h3>
            <pre>{code}</pre>
            <h3>Demo</h3>
            <Form {...{
                disabled: true,
                schema: schema,
                onSubmit: (value, summary, detail)=> console.log({value, summary, detail})
            }}>
                <button className="btn btn-primary">Submit</button>
            </Form>
        </div>
    }
}