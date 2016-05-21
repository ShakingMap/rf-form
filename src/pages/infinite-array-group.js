import React from 'react';
import Form from 'rf-form';

const schema = {
    name: {
        type: 'Text',
        label: 'Name'
    },

    friends: {
        label: 'Friends',
        array: {
            label: 'Friend'
        }
    }
};

schema.friends.array.group = schema;

const code = `const schema = {
    name: {
        type: 'Text',
        label: 'Name'
    },
    
    friends: {
        label: 'Friends',
        array: {
            label: 'Friend'
        }
    }
};

schema.friends.array.group = schema;

<Form {...{
    schema: schema,
    onSubmit: (value, summary, detail)=> console.log({value, summary, detail})
}}>
    <button className="btn btn-primary">Submit</button>
</Form>`;

export default class Page extends React.Component {
    render() {
        return <div>
            <h2>Infinite Array Group</h2>
            
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