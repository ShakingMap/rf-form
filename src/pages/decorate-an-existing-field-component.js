import React from 'react';
import Form from 'rf-form';
import {fields} from 'rf-bootstrap3';

const ButtonTextField = (props)=> {
    const {buttonText, onClickButton, ...otherProps} = props;
    return <div style={{display: 'flex'}}>
        <div style={{flexGrow: 1}}>
            <fields.Text {...otherProps}/>
        </div>
        <button type="button"
                className="btn btn-primary"
                onClick={()=>onClickButton(props.value)}>
            {buttonText}
        </button>
    </div>
};
ButtonTextField.cleanValue = fields.Text.cleanValue;

const schema = {
    email: {
        type: ButtonTextField,
        label: 'Email',
        options: {
            buttonText: 'Send Code',
            onClickButton: v=> alert('verify code has been sent to ' + v + '.')
        }
    }
};

const code = `import {fields} from 'rf-bootstrap3';

const ButtonTextField = (props)=> {
    const {buttonText, onClickButton, ...otherProps} = props;
    return <div style={{display: 'flex'}}>
        <div style={{flexGrow: 1}}>
            <fields.Text {...otherProps}/>
        </div>
        <button type="button"
                className="btn btn-primary"
                onClick={()=>onClickButton(props.value)}>
            {buttonText}
        </button>
    </div>
};
ButtonTextField.cleanValue = fields.Text.cleanValue;

const schema = {
    email: {
        type: ButtonTextField,
        label: 'Email',
        options: {
            buttonText: 'Send Code',
            onClickButton: v=> alert('verify code has been sent to ' + v + '.')
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
            <h2>Decorate an existing field component</h2>

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