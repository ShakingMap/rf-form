import React from 'react';
import Form from 'rf-form';

const schema = {
    localDate: {
        type: 'Date',
        label: 'Local Date'
    },
    utcDate: {
        type: 'Date',
        label: 'UTC Date',
        options: {
            display: 'utc'
        }
    }
};

const code = `const schema = {
    date1: {
        type: 'Date',
        label: 'Date'
    },
    date2: {
        type: 'Date',
        label: 'Date',
        options: {
            display: 'utc'
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
            <h2>Field: Date</h2>
            
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