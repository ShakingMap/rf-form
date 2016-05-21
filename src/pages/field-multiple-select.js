import React from 'react';
import Form from 'rf-form';

const schema = {
    multipleSelect: {
        type: 'MultipleSelect',
        label: 'MultipleSelect',
        options: {
            items: {
                a: 'A',
                b: 'B',
                c: 'C',
                d: {label: 'D', disabled: true}
            }
        }
    }
};

const code = `const schema = {
    multipleSelect: {
        type: 'MultipleSelect',
        label: 'MultipleSelect',
        options: {
            items: {
                a: 'A',
                b: 'B',
                c: 'C',
                d: {label: 'D', disabled: true}
            }
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
            <h2>Field: MultipleSelect</h2>

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