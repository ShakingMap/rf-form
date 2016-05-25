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

## Demo
[Demo Site](http://shakingmap.github.io/rf-form)

## Installation
- install React via npm
- install this package via npm: `npm install rf-form --save`
- optionally install some [form components suit](https://github.com/ShakingMap/rf-form#components-suits-list)

## Basic Usage

For more usages, please refer to the [Demo Site](http://shakingmap.github.io/rf-form).

First, import *Form* and any *Form Components Suit* you choose.

    import Form from 'rf-form';
    import * as buildOptions from 'rf-bootstrap3';

Then, you can optionally set the *Form Components Suit* as default props of the *Form*, or you can pass it as a prop when you render the form.

    Form.defaultProps.buildOptions = buildOptions;

Then, define your [schema](https://github.com/ShakingMap/rf-form#field-schema).

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

Finally, render the form

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

## APIs

If you are not interested in creating form component, you can only have a look at the apis of *Form*.

### Common Concepts
- validation state - one of 'success', 'warning', 'error' or falsy

### Form
#### Props
- schema - the *group field* of a [field schema](https://github.com/ShakingMap/rf-form#field-schema) 
- buildOptions - an object as {Wrapper, Group, Array, fields}, being used to build the form, often provided by some *form components suit package*.
- value - if undefined, the form will be uncontrolled.
- onChange - func(value, summary, details), summary is {success: count, warning: count, error: count}, details are all validation results.
- onSubmit - func(value, summary, details), summary is {success: count, warning: count, error: count}, details are all validation results.
- subForms - func(), return a group of sub forms in an object, such as {form1: this.refs.form1, form2: this.refs.form2, ...}.
- readOnly - bool
- disabled - bool
- enableValidation - bool or 'auto', default to 'auto', which will enable validation of a field if the onChange of the field is triggered
- type - string, default to 'form'

### Wrapper
A Wrapper is a form component which is responsible for rendering label, field component and validation message.
#### Props
- id - field id, usually used as *htmlFor* prop of label
- label - optional string
- validationState - see *validation state* of common concepts
- validationMessage - string
- children - field

### Group
A Group is a form component which is responsible for organizing a group of fields
#### Props
- children - field
- validationState - see *validation state* of common concepts
- validationMessage - string
- readOnly - usually no effect
- disabled - usually no effect

### Array
An Array is a form component which is responsible for organizing an array of same fields
#### Props
- children - field
- validationState - see *validation state* of common concepts
- validationMessage - string
- readOnly - usually no effect
- disabled - the array manipulation operations should be disabled
- onInsert - func(index)
- onRemove - func(index)
- onMove - func(from, to)

### Field
A field is a form component which is responsible for managing the this field
#### Props
- id - field id, usually used as *id* props of inner input
- validationState - see *validation state* of common concepts
- validationMessage - string
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
- options - all options will be spread to the props of corresponding form component. you should only set allowed options such as `readOnly`, `disabled` and any alllowed options defined by specific field component(usually addressed in its doc).  
- validate - optional func(value, formValue): result. standard result format is {state: validationState, message: validationMessage}. if result is not standard, it will be converted as below:
    - falsy -> {state: 'success', message: ''}
    - string -> {state: 'error', message: string}
    - array -> {state: array[0], message: array[1]}
- array - optional *field schema*. if exists, this schema indicates an array field.
- group - optional object as {key: *field schema*}. if exists, this schema indicates a group field.
- ignoreValue - optional bool. only available for field in a group. if true, the value of this field won't be included in the form value and form validation on submit

## Components Suits List
- [rf-bootstrap3](https://github.com/ShakingMap/rf-bootstrap3) - form components suit for bootstrap3
- [rf-materialize](https://github.com/ShakingMap/rf-materialize) - form components suit for materialize
- [rf-material-ui](https://github.com/ShakingMap/rf-material-ui) - form components suit for material-ui

## Q&A
### How to connect forms?
For example

    <Form {...{
        subForms: ()=> {
            return {
                form1: this.refs.form1,
                form2: this.refs.form2
            }
        },
        onSubmit: (value, summary, detail)=> console.log({value, summary, detail})
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

You can separate your form into many sub forms and layout them in this way.

## License
ISC

## Let's Build It Together!
If you like this project, welcome to give any helps and supports! Thanks!
