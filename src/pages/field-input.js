import React from 'react';
import Form from 'rf-form';

const schema = {
    range: {
        type: 'Input',
        label: 'Range',
        options: {
            type: 'range'
        }
    },
    color: {
        type: 'Input',
        label: 'Color',
        options: {
            type: 'color'
        }
    }
};

const code = `const schema = {
    range: {
        type: 'Input',
        label: 'Range',
        options: {
            type: 'range'
        }
    },
    color: {
        type: 'Input',
        label: 'Color',
        options: {
            type: 'color'
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
            <h2>Field: Input</h2>
            
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