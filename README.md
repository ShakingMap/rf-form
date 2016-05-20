# RF Form
build react form with validations in a better way.

## Features
- build React form with validations easily
- schema based
- support recursive structures
- support circle schema definition
- support connected forms
- support manipulations of array of fields
- support top level and individual controls of readOnly, disabled
- enable validations of fields automatically
- support extensions of form components (wrapper, group, array, fields)

## Installation
- install React via npm
- install this package via npm: `npm install rf-form --save`
- optionally install some [form components suit](https://github.com/ShakingMap/rf-form#components-suits-list)

## Basic Usage
    
    require('bootstrap/dist/css/bootstrap.css');
    import {Wrapper, Group, Array, fields} from 'rf-bootstrap3';
    import Form from 'rf-form';
    
    import React from 'react';
    import ReactDOM from 'react-dom';
    
    Form.defaultProps.buildOptions = {Wrapper, Group, Array, fields};
    
    const schema = {
        age: {
            type: 'Number',
            label: 'Age',
            validate(v) {
                if (v < 18) return 'age must >= 18'
            }
        },
        account: {
            label: 'Account',
            group: {
                username: {
                    type: 'Text',
                    label: 'Username',
                    validate(v) {
                        if (v === 'bob') return 'no bob!'
                    },
                    options: {
                        placeholder: 'input username'
                    }
                },
                password: {
                    type: 'Password',
                    label: 'Password',
                    validate(v) {
                        if (!v || v.length < 6) return 'password must have at least 6 bits.'
                    }
                }
            }
        },
        friends: {
            label: 'Friends',
            validate(v) {
                if (v && v.length > 2) return 'too many friends!'
            },
            array: {
                group: {
                    name: {
                        type: 'Text',
                        label: 'Name'
                    }
                }
            }
        }
    };
    
    schema.friends.array.group.friends = schema.friends;
    
    class TestPage extends React.Component {
        render() {
            return <Form {...{
                schema,
                onSubmit: (value, summary, validation)=> console.log({value, summary, validation})
            }}>
                <button className="btn btn-primary">Submit</button>
            </Form>
        }
    }

## APIs

If you are not interested in creating form component, you can only have a look at the apis of *Form*.

### Common Concepts
- validation state - one of 'success', 'warning', 'error' or falsy

### Form
#### Props
- schema - the *group* field of a [field schema](https://github.com/ShakingMap/rf-form#field-schema) 
- buildOptions - an object of schema components spread as {Wrapper, Group, Array, fields}
- value - if undefined, this will be an uncontrolled form
- onChange - func(value, summary, detail), summary is {success: count, warning: count, error: count}, details are all validation results
- onSubmit - func(value, summary, detail), summary is {success: count, warning: count, error: count}, details are all validation results
- subForms - func(), return a group of sub forms in an object, such as {form1: this.refs.form1, ...}
- readOnly - bool
- disabled - bool
- enableValidation - bool or 'auto', default to 'auto', which will enable validation of a field if the onChange of the field is triggered
- type - string, default to 'form'

### Wrapper
A Wrapper is a form component which is responsible to render label, field component and validation message.
#### Props
- id - field id, usually used as *htmlFor* prop of label
- label - optional string
- validationState - see *validation state* of common concepts
- validationMessage - string
- children - field

### Group
A Group is a form component which is responsible to organize a group of fields
#### Props
- children - field
- validationState - see *validation state* of common concepts
- readOnly - usually no effect
- disabled - usually no effect

### Array
An Array is a form component which is responsible to organize an array of same fields
#### Props
- children - field
- validationState - see *validation state* of common concepts
- readOnly - usually no effect
- disabled - the array manipulation operations should be disabled
- onInsert - func(index)
- onRemove - func(index)
- onMove - func(from, to)

### Field
A field is a form component which is responsible to manage the this field
#### Props
- id - field id, usually used as *id* props of inner input
- validationState - see *validation state* of common concepts
- value - any value this field needs. 
- onChange - func(value, event)
- readOnly - bool, usually implemented by text field
- disabled - bool, field should be disabled
- ... - field component can define other props it needs, passed in from the corresponding schema.options

#### Methods
- cleanValue - func(value, options): compatibleValue. return a value that is compatible with this field.

## Field Schema
A field schema is an object of following keys:

- type - string or field component. if string, it will be mapped into a field component by form.props.buildOptions.fields. if this schema has array or group key, type key can be omitted
- wrapper - optional string or wrapper component. if string, it will be mapped into a wrapper component by form.props.buildOptions.fields
- label - optional string
- options - will be spread to the props of corresponding form component
- validate - optional func(value, formValue): result. standard result format is {state: validationState, message: validationMessage}. if result is not standard, it will be converted as:
    - falsy -> {state: 'success', message: ''}
    - string -> {state: 'error', message: string}
    - array -> {state: array[0], message: array[1]}
- array - optional field schema. if exists, this schema indicates an array field
- group - optional object as {key: field schema}. if exists, this schema indicates a group field
- ignoreValue - optional bool. only available for field in a group. if true, the value of this field won't be included in the form value and form validation on submit

## Components Suits List
- [rf-bootstrap3](https://github.com/ShakingMap/rf-bootstrap3) - form components suit for bootstrap3
- [rf-materialize](https://github.com/ShakingMap/rf-materialize) - form components suit for materialize

## Q&A
### How to connect forms?
for example

    <Form {...{
        subForms: ()=> {
            return {
                form1: this.refs.form1,
                form2: this.refs.form2
            }
        },
        onSubmit: (value, summary, validation)=> console.log({value, summary, validation})
    }}>
        <Form {...{
            type: 'div',
            ref: 'form1',
            ...
        }}/>
        <Form {...{
            type: 'div',
            ref: 'form2',
            ...
        }}/>
        <button className="btn btn-primary">Submit</button>
    </Form>

you can separate your form and use this manner to layout it.

## License
ISC

## Let's Build It Together!
If you like this project, welcome to give any helps and supports! Thanks!
