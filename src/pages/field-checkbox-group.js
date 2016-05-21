import React from 'react';
import Form from 'rf-form';

const schema = {
    checkboxGroup1: {
        type: 'CheckboxGroup',
        label: 'Checkbox Group',
        options: {
            items: {
                a: 'A',
                b: 'B',
                c: {label: 'C', disabled: true}
            }
        }
    },
    checkboxGroup2: {
        type: 'CheckboxGroup',
        label: 'Checkbox Group(inline)',
        options: {
            items: {
                a: 'A',
                b: 'B',
                c: {label: 'C', disabled: true}
            },
            inline: true
        }
    }
};

const code = `const schema = {
    checkboxGroup1: {
        type: 'CheckboxGroup',
        label: 'Checkbox Group',
        options: {
            items: {
                a: 'A',
                b: 'B',
                c: {label: 'C', disabled: true}
            }
        }
    },
    checkboxGroup2: {
        type: 'CheckboxGroup',
        label: 'Checkbox Group(inline)',
        options: {
            items: {
                a: 'A',
                b: 'B',
                c: {label: 'C', disabled: true}
            },
            inline: true
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
            <h2>Field: CheckboxGroup</h2>

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