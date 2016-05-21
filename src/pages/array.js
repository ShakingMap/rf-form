import React from 'react';
import Form from 'rf-form';

const schema = {
    friends: {
        label: 'Friends',
        validate(v) {
            if (v.length > 3) return 'you have too many friends.'
        },
        array: {
            type: 'Text',
            label: 'Friend Name'
        }
    }
};

const code = `const schema = {
    friends: {
        label: 'Friends',
        validate(v) {
            if (v.length > 3) return 'you have too many friends.'
        },
        array: {
            type: 'Text',
            label: 'Friend Name'
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
            <h2>Array</h2>
            
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