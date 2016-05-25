import React from 'react';
import _ from 'lodash';

/**
 * Some Conceptions
 *
 * build options: {fields, Wrapper, Group, Array}
 *
 * validation: func(value, formValue, form): result
 * standard result format is {state, message}
 * if result is
 * falsy -> {state: 'success', message: ''}
 * string -> {state: 'error', message: string}
 * array -> {state: array[0], message: array[1]}
 */

/**
 * Notes
 *
 * onChange is modified to pass enable validation state up.
 */

const propTypes = {
    schema: React.PropTypes.object.isRequired,
    buildOptions: React.PropTypes.object.isRequired,

    value: React.PropTypes.object,

    // func(value, summary, detail)
    onChange: React.PropTypes.func,

    // func(value, summary, detail)
    onSubmit: React.PropTypes.func,

    // func(): {key: form}
    subForms: React.PropTypes.func,

    readOnly: React.PropTypes.bool,

    disabled: React.PropTypes.bool,

    enableValidation: React.PropTypes.any,

    type: React.PropTypes.string
};

const defaultProps = {
    schema: {},
    buildOptions: {},
    // value: {}, // to support uncontrolled form, default value should be disabled
    onChange(){},
    onSubmit(){},
    readOnly: false,
    disabled: false,
    enableValidation: 'auto',
    type: 'form'
};

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enableValidation: false
        }
    }

    componentWillMount() {
        this.id = Math.random() + '';
        this.enableValidationState = null;
        this.fullValue = getFullValue(this.getFormSchema(), this.getValue(), this.props.buildOptions.fields);
        this.validationResult = getValidationResult(this.getFormSchema(), this.fullValue, this.fullValue);
    }

    componentWillUpdate(nextProps, nextState) {
        this.fullValue = getFullValue(this.getFormSchema(nextProps), this.getValue(nextProps, nextState), nextProps.buildOptions.fields);
        this.validationResult = getValidationResult(this.getFormSchema(nextProps), this.fullValue, this.fullValue)
    }

    render() {
        const {onChange, buildOptions, enableValidation, children, readOnly, disabled, type} = this.props;
        const schema = this.getFormSchema();

        return React.createElement(type, {
                onSubmit: this.onSubmit.bind(this)
            },
            this.getRenderNode({
                id: this.id,
                schema,
                value: this.fullValue,
                validation: this.validationResult.validation,
                enableValidationState: this.enableValidationState,
                onChange: (v, e, evs)=> {
                    this.enableValidationState = evs;
                    if (!this.isControlled()) this.setState({value: v});
                    const validationResult = getValidationResult(this.getFormSchema(), v, v);
                    onChange(v, validationResult.summary, validationResult.validation);
                },
                buildOptions,
                enableValidation,
                readOnly, disabled
            }),
            children
        );
    }

    getFormSchema(props) {
        props = props || this.props;
        return {
            type: EmptyGroup,
            wrapper: EmptyWrapper,
            group: props.schema
        }
    }

    getRenderNode({id, schema, value, validation, onChange, enableValidationState, buildOptions, enableValidation, readOnly, disabled}) {
        // pre-process options
        const Wrapper = typeof schema.wrapper === 'string' ? buildOptions.fields[schema.wrapper] : (schema.wrapper || buildOptions.Wrapper);
        const options = schema.options || {};
        enableValidationState = enableValidationState || {enabled: false, array: [], group: {}};
        const localEnableValidation = enableValidation === 'auto' ?
            (this.state.enableValidation || enableValidationState.enabled)
            :
            enableValidation;
        const localReadOnly = schema.readOnly || readOnly;
        const localDisabled = schema.disabled || disabled;
        const validationState = localEnableValidation ? validation.state : '';
        const validationMessage = localEnableValidation ? validation.message : '';
        
        // build node;
        let node = null;
        if (schema.array) {
            const Node = typeof schema.type === 'string' ? buildOptions.fields[schema.type] : (schema.type || buildOptions.Array);
            const validationStateForActiveArray = {
                enabled: true,
                array: enableValidationState.array || [],
                group: enableValidationState.group || {}
            };
            const children = _.map(value, (subValue, index)=>this.getRenderNode({
                id: id + '.' + index,
                schema: schema.array,
                value: subValue,
                validation: validation.array[index],
                enableValidationState: enableValidationState.array[index],
                buildOptions,
                onChange: (v, e, evs)=> onChange(
                    value.slice(0, index).concat([v], value.slice(index + 1)),
                    e,
                    {
                        enabled: true,
                        array: enableValidationState.array.slice(0, index).concat([evs], enableValidationState.array.slice(index + 1)),
                        group: enableValidationState.group || {}
                    }
                ),
                enableValidation, readOnly, disabled
            }));
            node = <Node {...options} {...{
                children,
                validationState,
                validationMessage,
                onInsert: (index)=> onChange(value.slice(0, index).concat(null, value.slice(index)), null, validationStateForActiveArray),
                onRemove: (index)=> onChange(value.slice(0, index).concat(value.slice(index + 1)), null, validationStateForActiveArray),
                onMove: (from, to)=> onChange(
                    from < to ?
                        value.slice(0, from).concat(value.slice(from + 1, to + 1), [value[from]], value.slice(to + 1))
                        :
                        value.slice(0, to).concat([value[from]], value.slice(to, from), value.slice(from + 1))
                    , null, validationStateForActiveArray),
                readOnly: localReadOnly,
                disabled: localDisabled
            }}/>
        }
        else if (schema.group) {
            const Node = typeof schema.type === 'string' ? buildOptions.fields[schema.type] : (schema.type || buildOptions.Group);
            const children = _.map(schema.group, (subSchema, key)=>this.getRenderNode({
                id: id + '.' + key,
                schema: subSchema,
                value: value[key],
                validation: validation.group[key],
                enableValidationState: enableValidationState.group[key],
                buildOptions,
                onChange: (v, e, evs)=> onChange(
                    _.assign({}, value, {[key]: v}),
                    e,
                    {
                        enabled: true,
                        group: _.assign({}, enableValidationState.group, {[key]: evs}),
                        array: enableValidationState.array || []
                    }
                ),
                enableValidation, readOnly, disabled
            }));
            node = <Node {...options} {...{
                children,
                validationState,
                validationMessage,
                readOnly: localReadOnly,
                disabled: localDisabled
            }}/>
        }
        else {
            const Node = typeof schema.type === 'string' ? buildOptions.fields[schema.type] : schema.type;
            node = <Node {...options} {...{
                id, value,
                onChange: (v, e)=> onChange(v, e, {
                    enabled: true,
                    array: enableValidationState.array || [],
                    group: enableValidationState.group || {}
                }),
                validationState,
                validationMessage,
                readOnly: localReadOnly,
                disabled: localDisabled
            }}/>
        }

        // build wrapper;
        return <Wrapper {...{
            children: node,
            key: id,
            id,
            label: schema.label,
            validationState,
            validationMessage
        }}/>
    }

    onSubmit(e) {
        e.preventDefault();
        this.submit();
    }

    isControlled(props) {
        props = props || this.props;
        return props.value !== undefined;
    }

    getValue(props, state) {
        props = props || this.props;
        state = state || this.state;
        return this.isControlled(props) ? props.value : state.value;
    }

    // public
    submit() {
        if (!this.state.enableValidation) this.setState({enableValidation: true}); // update only if this state changed to prevent unused update
        let result = {
            value: getFullValue(this.getFormSchema(), this.getValue(), this.props.buildOptions.fields),
            summary: this.validationResult.summary,
            validation: this.validationResult.validation
        };
        if (this.props.subForms) {
            const subForms = this.props.subForms();
            result = _.reduce(subForms, (result, form, key)=> {
                const subResult = form.submit();
                return {
                    value: _.assign({}, result.value, {[key]: subResult.value}),
                    summary: _.assignWith({}, result.summary, subResult.summary, (v1, v2)=>(v1 || 0) + (v2 || 0)),
                    validation: _.assign({}, result.validation, {group: _.assign({[key]: subResult.validation}, result.validation.group)})
                }
            }, result)
        }
        this.props.onSubmit(result.value, result.summary, result.validation);
        return result;
    }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;

const EmptyWrapper = ({children})=> {
    return <div>{children}</div>;
};

const EmptyGroup = ({children})=> {
    return <div>{children}</div>;
};

const validate = (validate, value, formValue)=> {
    if (!validate) return {state: '', message: ''};
    else {
        const result = validate(value, formValue);
        if (!result) return {state: 'success', message: ''};
        else if (typeof result === 'string') return {state: 'error', message: result};
        else if (Array.isArray(result)) return {state: result[0], message: result[1]};
        else return result;
    }
};

/**
 * build value with prop default value
 * left node -> null
 * group -> {key: fullValue}
 * array -> []
 */
const getFullValue = (schema, value, fields)=> {
    if (schema.group) {
        value = (typeof value === 'object' && value) || {};
        return _(schema.group).omitBy(subSchema=>subSchema.ignoreValue).mapValues((subSchema, key)=>getFullValue(subSchema, value[key], fields)).value();
    }
    else if (schema.array) {
        value = (Array.isArray(value) && value) || [];
        return _.map(value, (subValue, index)=>getFullValue(schema.array, subValue, fields))
    }
    else return getField(schema, fields).cleanValue(value === undefined ? null : value, schema.options || {});
};

const getValidationResult = (schema, value, formValue)=> {
    const validation = validate(schema.validate, value, formValue);
    const summary = validation.state ? {[validation.state]: 1} : {};

    if (schema.array) {
        value = value || [];
        return _.reduce(value, (result, subValue, index)=> {
            const subValidationData = getValidationResult(schema.array, subValue, formValue);
            return {
                summary: _.assignWith({}, result.summary, subValidationData.summary, (v1, v2)=> (v1 || 0) + (v2 || 0)),
                validation: _.assign({}, result.validation, {array: result.validation.array.concat([subValidationData.validation])})
            }
        }, {
            summary,
            validation: _.assign({array: []}, validation)
        })
    }
    else if (schema.group) {
        value = value || {};
        return _.reduce(schema.group, (result, subSchema, key)=> {
            if (subSchema.ignoreValue) return result;
            const subValidationData = getValidationResult(subSchema, value[key], formValue);
            return {
                summary: _.assignWith({}, result.summary, subValidationData.summary, (v1, v2)=> (v1 || 0) + (v2 || 0)),
                validation: _.assign({}, result.validation, {group: _.assign({[key]: subValidationData.validation}, result.validation.group)})
            }
        }, {
            summary,
            validation: _.assign({group: {}}, validation)
        })
    }
    else {
        return {
            summary,
            validation
        }
    }
};

const getField = (schema, fields)=> {
    if (typeof schema.type === 'string') return fields[schema.type];
    else return schema.type;
};