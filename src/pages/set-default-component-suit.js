import React from 'react';

const code = `import Form from 'rf-form';
import * as buildOptions from 'rf-bootstrap3';

Form.defaultProps.buildOptions = buildOptions;`;

export default class Page extends React.Component {
    render() {
        return <div>
            <h2>Set Default Component Suit</h2>
            <p>You can set a components suit as a default prop of rf-form.</p>
            <p>Otherwise you will need to specify it every time you render a form.</p>
            <pre>{code}</pre>
        </div>
    }
}