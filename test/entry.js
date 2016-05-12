require('bootstrap/dist/css/bootstrap.css');

import React from 'react';
import ReactDOM from 'react-dom';

import {Wrapper, Group, Array, fields} from 'rf-bootstrap3';

class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
            password: null,
            file: null,
            textarea: null,
            date: null,
            datetimeLocal: null,
            number: null,
            checkbox: null,
            checkboxGroup: null,
            radioGroup: null,
            select: null,
            multipleSelect: null
        }
    }

    render() {
        return <div>
            <Wrapper {...{
                label: 'Text',
                validationState: 'success',
                validationMessage: 'ok',
                id: 'text-field'
            }}>
                <fields.Text {...{
                    id: 'text-field',
                    validationState: 'error',
                    value: this.state.text,
                    onChange: (value)=>this.setState({text: value})
                    //value: undefined,
                    //onChange: (value)=>console.log(value)
                }}/>
            </Wrapper>
            <Wrapper {...{
                label: 'Password',
                validationState: 'success',
                validationMessage: 'ok',
                id: 'password-field'
            }}>
                <fields.Password {...{
                    id: 'password-field',
                    validationState: 'error',
                    value: this.state.password,
                    onChange: (value)=>this.setState({password: value})
                    //value: undefined,
                    //onChange: (value)=>console.log(value)
                }}/>
            </Wrapper>
            <Wrapper {...{
                label: 'Textarea',
                validationState: 'success',
                validationMessage: 'ok',
                id: 'textarea-field'
            }}>
                <fields.Textarea {...{
                    id: 'textarea-field',
                    validationState: 'error',
                    value: this.state.textarea,
                    onChange: (value)=>this.setState({textarea: value})
                    //value: undefined,
                    //onChange: (value)=>console.log(value)
                }}/>
            </Wrapper>
            <Wrapper {...{
                label: 'File',
                validationState: 'success',
                validationMessage: 'ok',
                id: 'file-field'
            }}>
                <fields.File {...{
                    id: 'file-field',
                    validationState: 'error',
                    value: this.state.file,
                    onChange: (value)=>this.setState({file: value})
                    //value: undefined,
                    //onChange: (value)=>console.log(value)
                }}/>
            </Wrapper>
            <Wrapper {...{
                label: 'Date',
                validationState: 'success',
                validationMessage: 'ok',
                id: 'date-field'
            }}>
                <fields.Date {...{
                    id: 'date-field',
                    validationState: 'error',
                    value: this.state.date,
                    onChange: (value)=>this.setState({date: value})
                    //value: undefined,
                    //onChange: (value)=>console.log(value)
                }}/>
            </Wrapper>
            <Wrapper {...{
                label: 'Datetime Local',
                validationState: 'success',
                validationMessage: 'ok',
                id: 'datetime-local-field'
            }}>
                <fields.DatetimeLocal {...{
                    id: 'datetime-local-field',
                    validationState: 'error',
                    value: this.state.datetimeLocal,
                    onChange: (value)=>this.setState({datetimeLocal: value})
                    //value: undefined,
                    //onChange: (value)=>console.log(value)
                }}/>
            </Wrapper>
            <Wrapper {...{
                label: 'Number',
                validationState: 'success',
                validationMessage: 'ok',
                id: 'number-field'
            }}>
                <fields.Number {...{
                    id: 'number-field',
                    validationState: 'error',
                    value: this.state.number,
                    onChange: (value)=>this.setState({number: value})
                    //value: undefined,
                    //onChange: (value)=>console.log(value)
                }}/>
            </Wrapper>
            <Wrapper {...{
                label: 'Checkbox',
                validationState: 'success',
                validationMessage: 'ok',
                id: 'checkbox-field'
            }}>
                <fields.Checkbox {...{
                    id: 'checkbox-field',
                    validationState: 'error',
                    label: '?',
                    value: this.state.checkbox,
                    onChange: (value)=>this.setState({checkbox: value})
                    //value: undefined,
                    //onChange: (value)=>console.log(value)
                }}/>
            </Wrapper>
            <Wrapper {...{
                label: 'Checkbox Group',
                validationState: 'success',
                validationMessage: 'ok',
                id: 'checkbox-group-field'
            }}>
                <fields.CheckboxGroup {...{
                    id: 'checkbox-group-field',
                    validationState: 'error',
                    items: {
                        a: {label: 'A'},
                        b: {label: 'B'},
                        c: {label: 'C', readOnly: true},
                        d: {label: 'D', disabled: true}
                    },
                    inline: true,
                    value: this.state.checkboxGroup,
                    onChange: (value)=>this.setState({checkboxGroup: value})
                    //value: undefined,
                    //onChange: (value)=>console.log(value)
                }}/>
            </Wrapper>
            <Wrapper {...{
                label: 'Radio Group',
                validationState: 'success',
                validationMessage: 'ok',
                id: 'radio-group-field'
            }}>
                <fields.RadioGroup {...{
                    id: 'radio-group-field',
                    validationState: 'error',
                    items: {
                        a: {label: 'A'},
                        b: {label: 'B'},
                        c: {label: 'C', readOnly: true},
                        d: {label: 'D', disabled: true}
                    },
                    inline: true,
                    value: this.state.radioGroup,
                    onChange: (value)=>this.setState({radioGroup: value})
                    //value: undefined,
                    //onChange: (value)=>console.log(value)
                }}/>
            </Wrapper>
            <Wrapper {...{
                label: 'Select',
                validationState: 'success',
                validationMessage: 'ok',
                id: 'select-field'
            }}>
                <fields.Select {...{
                    id: 'select-field',
                    validationState: 'error',
                    items: {
                        a: {label: 'A'},
                        b: {label: 'B'},
                        c: {label: 'C', readOnly: true},
                        d: {label: 'D', disabled: true}
                    },
                    placeholder: '请选择',
                    value: this.state.select,
                    onChange: (value)=>this.setState({select: value})
                    //value: undefined,
                    //onChange: (value)=>console.log(value)
                }}/>
            </Wrapper>
            <Wrapper {...{
                label: 'Multiple Select',
                validationState: 'success',
                validationMessage: 'ok',
                id: 'multiple-select-field'
            }}>
                <fields.MultipleSelect {...{
                    id: 'multiple-select-field',
                    validationState: 'error',
                    items: {
                        a: {label: 'A'},
                        b: {label: 'B'},
                        c: {label: 'C', readOnly: true},
                        d: {label: 'D', disabled: true}
                    },
                    value: this.state.multipleSelect,
                    onChange: (value)=>this.setState({multipleSelect: value})
                    //value: undefined,
                    //onChange: (value)=>console.log(value)
                }}/>
            </Wrapper>
            <Wrapper {...{
                label: 'Group',
                validationState: 'success',
                validationMessage: 'ok'
            }}>
                <Group>
                    <Wrapper {...{
                        label: 'Text',
                        validationState: 'success',
                        validationMessage: 'ok',
                        id: 'text-field'
                    }}>
                        <fields.Text {...{
                            id: 'text-field',
                            validationState: 'error',
                            value: this.state.text,
                            onChange: (value)=>this.setState({text: value})
                            //value: undefined,
                            //onChange: (value)=>console.log(value)
                        }}/>
                    </Wrapper>
                    <Wrapper {...{
                        label: 'Password',
                        validationState: 'success',
                        validationMessage: 'ok',
                        id: 'password-field'
                    }}>
                        <fields.Password {...{
                            id: 'password-field',
                            validationState: 'error',
                            value: this.state.password,
                            onChange: (value)=>this.setState({password: value})
                            //value: undefined,
                            //onChange: (value)=>console.log(value)
                        }}/>
                    </Wrapper>
                </Group>
            </Wrapper>
            <Wrapper {...{
                label: 'Array',
                validationState: 'success',
                validationMessage: 'ok'
            }}>
                <Array {...{
                    onInsert: index=>console.log('insert at ' + index),
                    onRemove: index=>console.log('remove at ' + index),
                    onMove: (from, to)=>console.log(`move from ${from} to ${to}`)
                }}>
                    <Wrapper {...{
                        label: 'Group',
                        validationState: 'success',
                        validationMessage: 'ok'
                    }}>
                        <Group>
                            <Wrapper {...{
                                label: 'Text',
                                validationState: 'success',
                                validationMessage: 'ok',
                                id: 'text-field'
                            }}>
                                <fields.Text {...{
                                    id: 'text-field',
                                    validationState: 'error',
                                    value: this.state.text,
                                    onChange: (value)=>this.setState({text: value})
                                    //value: undefined,
                                    //onChange: (value)=>console.log(value)
                                }}/>
                            </Wrapper>
                            <Wrapper {...{
                                label: 'Password',
                                validationState: 'success',
                                validationMessage: 'ok',
                                id: 'password-field'
                            }}>
                                <fields.Password {...{
                                    id: 'password-field',
                                    validationState: 'error',
                                    value: this.state.password,
                                    onChange: (value)=>this.setState({password: value})
                                    //value: undefined,
                                    //onChange: (value)=>console.log(value)
                                }}/>
                            </Wrapper>
                        </Group>
                    </Wrapper>
                    <Wrapper {...{
                        label: 'Group',
                        validationState: 'success',
                        validationMessage: 'ok'
                    }}>
                        <Group>
                            <Wrapper {...{
                                label: 'Text',
                                validationState: 'success',
                                validationMessage: 'ok',
                                id: 'text-field'
                            }}>
                                <fields.Text {...{
                                    id: 'text-field',
                                    validationState: 'error',
                                    value: this.state.text,
                                    onChange: (value)=>this.setState({text: value})
                                    //value: undefined,
                                    //onChange: (value)=>console.log(value)
                                }}/>
                            </Wrapper>
                            <Wrapper {...{
                                label: 'Password',
                                validationState: 'success',
                                validationMessage: 'ok',
                                id: 'password-field'
                            }}>
                                <fields.Password {...{
                                    id: 'password-field',
                                    validationState: 'error',
                                    value: this.state.password,
                                    onChange: (value)=>this.setState({password: value})
                                    //value: undefined,
                                    //onChange: (value)=>console.log(value)
                                }}/>
                            </Wrapper>
                        </Group>
                    </Wrapper>
                </Array>
            </Wrapper>
        </div>
    }
}

let root = document.getElementById('root');
if (!root) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
}

ReactDOM.render(
    <TestPage/>,
    root
);
