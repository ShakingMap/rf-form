import React from 'react';
import Form from 'rf-form';

const schema = {
    number: {
        type: 'Number',
        label: 'Number',
        validate(v) {
            if (v > 10) return 'cannot > 10'
        },
        options: {
            placeholder: 'input something...'
        }
    }
};

const code = `const schema = {
    number: {
        type: 'Number',
        label: 'Number',
        validate(v) {
            if (v > 10) return 'cannot > 10'
        },
        options: {
            placeholder: 'input something...'
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
            <h2>Field: Number</h2>
            
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