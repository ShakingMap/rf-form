import React from 'react';
import Form from 'rf-form';

const schema = {
    select: {
        type: 'Select',
        label: 'Select',
        options: {
            items: {
                a: 'A',
                b: 'B',
                c: {label: 'C', disabled: true}
            },
            placeholder: 'select one item...'
        }
    }
};

const code = `const schema = {
    select: {
        type: 'Select',
        label: 'Select',
        options: {
            items: {
                a: 'A',
                b: 'B',
                c: {label: 'C', disabled: true}
            },
            placeholder: 'select one item...'
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
            <h2>Field: Select</h2>

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