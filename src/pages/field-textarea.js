import React from 'react';
import Form from 'rf-form';

const schema = {
    textarea: {
        type: 'Textarea',
        label: 'Textarea',
        validate(v) {
            if (!v) return 'no input.'
        },
        options: {
            placeholder: 'input something...',
            rows: '10'
        }
    }
};

const code = `const schema = {
    textarea: {
        type: 'Textarea',
        label: 'Textarea',
        validate(v) {
            if (!v) return 'no input.'
        },
        options: {
            placeholder: 'input something...',
            rows: '10'
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
            <h2>Field: Textarea</h2>
            
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