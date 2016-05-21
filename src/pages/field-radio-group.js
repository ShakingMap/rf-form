import React from 'react';
import Form from 'rf-form';

const schema = {
    radioGroup1: {
        type: 'RadioGroup',
        label: 'Radio Group',
        options: {
            items: {
                a: 'A',
                b: 'B',
                c: {label: 'C', disabled: true}
            }
        }
    },
    radioGroup2: {
        type: 'RadioGroup',
        label: 'Radio Group(inline)',
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
    radioGroup1: {
        type: 'RadioGroup',
        label: 'Radio Group',
        options: {
            items: {
                a: 'A',
                b: 'B',
                c: {label: 'C', disabled: true}
            }
        }
    },
    radioGroup2: {
        type: 'RadioGroup',
        label: 'Radio Group(inline)',
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
            <h2>Field: RadioGroup</h2>

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