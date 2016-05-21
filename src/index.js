import React from 'react'
import {render} from 'react-dom'
import {Router, Route, Link, browserHistory} from 'react-router'
import Form from 'rf-form';
import * as buildOptions from 'rf-bootstrap3';

import 'bootstrap/dist/css/bootstrap.css';

import App from './pages/app';
import SetDefaultComponentSuitPage from './pages/set-default-component-suit';
import BasicUsage from './pages/basic-usage';
import FieldText from './pages/field-text';
import FieldTextarea from './pages/field-textarea';
import FieldNumber from './pages/field-number';
import FieldPassword from './pages/field-password';
import FieldDate from './pages/field-date';
import FieldDatetimeLocal from './pages/field-datetime-local';
import FieldCheckbox from './pages/field-checkbox';
import FieldCheckboxGroup from './pages/field-checkbox-group';
import FieldRadioGroup from './pages/field-radio-group';
import FieldSelect from './pages/field-select';
import FieldMultipleSelect from './pages/field-multiple-select';
import FieldFile from './pages/field-file';
import FieldInput from './pages/field-input';
import Array from './pages/array';
import Group from './pages/group';
import InfiniteArrayGroup from './pages/infinite-array-group';
import ConnectForms from './pages/connect-forms';
import ControlledForm from './pages/controlled-form';
import DisabledForm from './pages/disabled-form';

Form.defaultProps.buildOptions = buildOptions;

render((
    <Router>
        <Route path="/" component={App}>
            <Route path="set-default-component-suit" component={SetDefaultComponentSuitPage}/>
            <Route path="basic-usage" component={BasicUsage}/>
            <Route path="field-text" component={FieldText}/>
            <Route path="field-textarea" component={FieldTextarea}/>
            <Route path="field-number" component={FieldNumber}/>
            <Route path="field-password" component={FieldPassword}/>
            <Route path="field-date" component={FieldDate}/>
            <Route path="field-datetime-local" component={FieldDatetimeLocal}/>
            <Route path="field-checkbox" component={FieldCheckbox}/>
            <Route path="field-checkbox-group" component={FieldCheckboxGroup}/>
            <Route path="field-radio-group" component={FieldRadioGroup}/>
            <Route path="field-select" component={FieldSelect}/>
            <Route path="field-multiple-select" component={FieldMultipleSelect}/>
            <Route path="field-file" component={FieldFile}/>
            <Route path="field-input" component={FieldInput}/>
            <Route path="array" component={Array}/>
            <Route path="group" component={Group}/>
            <Route path="infinite-array-group" component={InfiniteArrayGroup}/>
            <Route path="connect-forms" component={ConnectForms}/>
            <Route path="controlled-form" component={ControlledForm}/>
            <Route path="disabled-form" component={DisabledForm}/>
        </Route>
    </Router>
), document.getElementById('root'));