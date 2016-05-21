import React from 'react';
import {Link} from 'react-router'

export default class App extends React.Component {
    render() {
        return <div className="container">
            <h1>RF Form Demo</h1>
            <p>
                <a href="https://github.com/ShakingMap/rf-form">RF Form </a>
                is a library which helps you build React form with validations in an easy way.
            </p>
            <p>
                This demo site assumes you choose the
                <a href="https://github.com/ShakingMap/rf-bootstrap3"> rf-bootstrap3 </a>
                as the default form components suit.
            </p>
            <p>You can click on the items below to view different demo.</p>
            <ul>
                <li><Link to="set-default-component-suit">Set Default Form Components Suit</Link></li>
                <li><Link to="basic-usage">Basic Usage</Link></li>
                <li><Link to="field-text">Field: Text</Link></li>
                <li><Link to="field-textarea">Field: Textarea</Link></li>
                <li><Link to="field-number">Field: Number</Link></li>
                <li><Link to="field-password">Field: Password</Link></li>
                <li><Link to="field-date">Field: Date</Link></li>
                <li><Link to="field-datetime-local">Field: DatetimeLocal</Link></li>
                <li><Link to="field-checkbox">Field: Checkbox</Link></li>
                <li><Link to="field-checkbox-group">Field: CheckboxGroup</Link></li>
                <li><Link to="field-radio-group">Field: RadioGroup</Link></li>
                <li><Link to="field-select">Field: Select</Link></li>
                <li><Link to="field-multiple-select">Field: MultipleSelect</Link></li>
                <li><Link to="field-file">Field: File</Link></li>
                <li><Link to="field-input">Field: Input</Link></li>
                <li><Link to="array">Array</Link></li>
                <li><Link to="group">Group</Link></li>
                <li><Link to="infinite-array-group">Infinite Array Group</Link></li>
                <li><Link to="connect-forms">Connect Forms</Link></li>
                <li><Link to="controlled-form">Controlled Form</Link></li>
                <li><Link to="disabled-form">disabled Form</Link></li>
            </ul>
            {this.props.children}
            <p style={{marginTop: '10px', cursor: 'pointer'}}><a onClick={()=>document.body.scrollTop=0}>Back to Top</a></p>
        </div>
    }
}