import React from 'react';
import Form from 'rf-form';

const schema = {
    text: {
        type: 'Text',
        label: 'Text',
        validate(v) {
            if (!v) return 'no input.'
        },
        options: {
            placeholder: 'input something...'
        }
    }
};

const code = `const schema = {
    text: {
        type: 'Text',
        label: 'Text',
        validate(v) {
            if (!v) return 'no input.'
        },
        options: {
            placeholder: 'input something...'
        }
    }
};

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                text: 'pre-defined value'
            }
        }
    }

    render() {
        return <Form {...{
            schema: schema,
            value: this.state.value,
            onChange: (value, summary, defail)=> this.setState({value: value}),
            onSubmit: (value, summary, detail)=> console.log({value, summary, detail})
        }}>
            <button className="btn btn-primary">Submit</button>
        </Form>
    }
}`;

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                text: 'pre-defined value'
            }
        }
    }

    render() {
        return <div>
            <h2>Controlled Form</h2>

            <p>If you specify value to a form, it will work in controlled mode.</p>

            <h3>Code</h3>
            
            <pre>{code}</pre>
            
            <h3>Demo</h3>
            
            <Form {...{
                schema: schema,
                value: this.state.value,
                onChange: (value, summary, defail)=> this.setState({value: value}),
                onSubmit: (value, summary, detail)=> console.log({value, summary, detail})
            }}>
                <button className="btn btn-primary">Submit</button>
            </Form>
        </div>
    }
}