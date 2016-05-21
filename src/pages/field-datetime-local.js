import React from 'react';
import Form from 'rf-form';

const schema = {
    localDate: {
        type: 'DatetimeLocal',
        label: 'Local Datetime'
    },
    utcDate: {
        type: 'DatetimeLocal',
        label: 'UTC Datetime',
        options: {
            display: 'utc'
        }
    }
};

const code = `const schema = {
    localDate: {
        type: 'DatetimeLocal',
        label: 'Local Datetime'
    },
    utcDate: {
        type: 'DatetimeLocal',
        label: 'UTC Datetime',
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
            <h2>Field: Datetime</h2>
            
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