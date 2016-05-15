import React from 'react';
import _ from 'lodash';

/**
 * Some Conceptions
 *
 * build options: {fields, Wrapper, Group, Array}
 *
 * validation: func(v): result
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

    // func(value)
    onChange: React.PropTypes.func,

    // func(value, summary, validations)
    onSubmit: React.PropTypes.func,

    // func(): {key: form}
    subForms: React.PropTypes.func,

    readOnly: React.PropTypes.bool,

    disabled: React.PropTypes.bool,

    enableValidation: React.PropTypes.any
};

const defaultProps = {
    schema: {},
    buildOptions: {},
    // value: {}, // to support uncontrolled form, default value should be disabled
    onChange(){},
    onSubmit(){},
    readOnly: false,
    disabled: false,
    enableValidation: 'auto'
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
    }

    render() {
        const {onChange, buildOptions, enableValidation, children, readOnly, disabled} = this.props;
        const schema = this.getFormSchema();
        const value = getProperValue(schema, this.getValue());

        return <form ref="form" onSubmit={this.onSubmit.bind(this)}>
            {this.getRenderNode({
                id: this.id,
                schema,
                value,
                enableValidationState: this.enableValidationState,
                onChange: (v, e, evs)=> {
                    this.enableValidationState = evs;
                    if (!this.isControlled()) this.setState({value: v});
                    onChange(v, e);
                },
                buildOptions,
                enableValidation,
                readOnly, disabled
            })}
            {children}
        </form>
    }

    getFormSchema() {
        return {
            type: EmptyGroup,
            wrapper: EmptyWrapper,
            group: this.props.schema
        }
    }

    getRenderNode({id, schema, value, onChange, enableValidationState, buildOptions, enableValidation, readOnly, disabled}) {
        // pre-process options
        const Wrapper = typeof schema.wrapper === 'string' ? buildOptions.fields[schema.wrapper] : (schema.wrapper || buildOptions.Wrapper);
        const options = schema.options || {};
        const validation = validate(schema.validate, value);
        enableValidationState = enableValidationState || {enabled: false, array: [], group: {}};
        const localEnableValidation = enableValidation === 'auto' ?
            (this.state.enableValidation || enableValidationState.enabled)
            :
            enableValidation;
        const localReadOnly = schema.readOnly || readOnly;
        const localDisabled = schema.disabled || disabled;

        // build node;
        let node = null;
        if (schema.array) {
            const Node = typeof schema.type === 'string' ? buildOptions.fields[schema.type] : (schema.type || buildOptions.Array);
            const validationStateForActiveArray = {enabled: true, array: enableValidationState.array};
            const children = _.map(value, (subValue, index)=>this.getRenderNode({
                id: id + '.' + index,
                schema: schema.array,
                value: subValue,
                enableValidationState: enableValidationState.array[index],
                buildOptions,
                onChange: (v, e, evs)=> onChange(
                    value.slice(0, index).concat([v], value.slice(index + 1)),
                    e,
                    {
                        enabled: true,
                        array: enableValidationState.array.slice(0, index).concat([evs], enableValidationState.array.slice(index + 1))
                    }
                ),
                enableValidation, readOnly, disabled
            }));
            node = <Node {...options} {...{
                children,
                validationState: localEnableValidation ? validation.state : '',
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
                enableValidationState: enableValidationState.group[key],
                buildOptions,
                onChange: (v, e, evs)=> onChange(
                    _.assign({}, value, {[key]: v}),
                    e,
                    {
                        enabled: true,
                        group: _.assign({}, enableValidationState.group, {[key]: evs})
                    }
                ),
                enableValidation, readOnly, disabled
            }));
            node = <Node {...options} {...{
                children,
                validationState: localEnableValidation ? validation.state : '',
                readOnly: localReadOnly,
                disabled: localDisabled
            }}/>
        }
        else {
            const Node = typeof schema.type === 'string' ? buildOptions.fields[schema.type] : schema.type;
            node = <Node {...options} {...{
                id, value,
                onChange: (v, e)=> onChange(v, e, {enabled: true}),
                validationState: localEnableValidation ? validation.state : '',
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
            validationState: localEnableValidation ? validation.state : '',
            validationMessage: localEnableValidation ? validation.message : ''
        }}/>
    }

    onSubmit(e) {
        e && e.preventDefault();
        const value = getProperValue(this.getFormSchema(), this.getValue());
        const validationData = this.getValidationData(this.getFormSchema(), value);
        if (!this.state.enableValidation) this.setState({enableValidation: true}); // update only if this state changed to prevent unused update
        let result = {value, summary: validationData.summary, validation: validationData.validation};
        if (this.props.subForms) {
            const subForms = this.props.subForms();
            result = _.reduce(subForms, (result, form, key)=> {
                const subResult = form.onSubmit();
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

    getValidationData(schema, value) {
        const validation = validate(schema.validate, value);
        const summary = validation.state ? {[validation.state]: 1} : {};

        if (schema.array) {
            value = value || [];
            return _.reduce(value, (result, subValue, index)=> {
                const subValidationData = this.getValidationData(schema.array, subValue);
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
                const subValidationData = this.getValidationData(subSchema, value[key]);
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
    }

    isControlled() {
        return this.props.value !== undefined;
    }

    getValue() {
        return this.isControlled() ? this.props.value : this.state.value;
    }

    submit() {
        this.refs.form.dispatchEvent(new Event('submit'));
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

const validate = (validate, value)=> {
    if (!validate) return {state: '', message: ''};
    else {
        const result = validate(value);
        if (!result) return {state: 'success', message: ''};
        else if (typeof result === 'string') return {state: 'error', message: result};
        else if (Array.isArray(result)) return {state: result[0], message: result[1]};
        else return result;
    }
};

/**
 * build value with prop default value
 * left node -> null
 * group -> {key: properValue}
 * array -> []
 */
const getProperValue = (schema, value)=> {
    if (schema.group) {
        value = value || {};
        return _.mapValues(schema.group, (subSchema, key)=>getProperValue(subSchema, value[key]))
    }
    else if (schema.array) {
        value = value || [];
        return _.map(value, (subValue, index)=>getProperValue(schema.array, subValue))
    }
    else return value !== undefined ? value : null;
};