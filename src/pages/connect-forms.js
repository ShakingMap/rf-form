import React from 'react';
import Form from 'rf-form';

const schema1 = {
    name: {
        type: 'Text',
        label: 'Name'
    }
};

const schema2 = {
    age: {
        type: 'Number',
        label: 'Age'
    }
};

const code = `const schema1 = {
    name: {
        type: 'Text',
        label: 'Name'
    }
};

const schema2 = {
    age: {
        type: 'Number',
        label: 'Age'
    }
};

<Form {...{
    subForms: ()=> {
        return {
            form1: this.refs.form1,
            form2: this.refs.form2
        }
    },
    onSubmit: (value, summary, detail)=> console.log({value, summary, detail})
}}>
    <div className="row">
        <div className="col col-xs-6">
            <Form {...{
                type: 'div',
                ref: 'form1',
                schema: schema1
            }}/>
        </div>
        <div className="col col-xs-6">
            <Form {...{
                type: 'div',
                ref: 'form2',
                schema: schema2
            }}/>
        </div>
    </div>
    <button className="btn btn-primary">Submit</button>
</Form>`;

export default class Page extends React.Component {
    render() {
        return <div>
            <h2>Connect Forms</h2>

            <p>You can separate a form into many sub forms and connect them together, gaining a chance to layout them.</p>

            <h3>Code</h3>

            <pre>{code}</pre>

            <h3>Demo</h3>

            <Form {...{
                subForms: ()=> {
                    return {
                        form1: this.refs.form1,
                        form2: this.refs.form2
                    }
                },
                onSubmit: (value, summary, detail)=> console.log({value, summary, detail})
            }}>
                <div className="row">
                    <div className="col col-xs-6">
                        <Form {...{
                            type: 'div',
                            ref: 'form1',
                            schema: schema1
                        }}/>
                    </div>
                    <div className="col col-xs-6">
                        <Form {...{
                            type: 'div',
                            ref: 'form2',
                            schema: schema2
                        }}/>
                    </div>
                </div>
                <button className="btn btn-primary">Submit</button>
            </Form>
        </div>
    }
}