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

const propTypes = {
    schema: React.PropTypes.object.isRequired,
    buildOptions: React.PropTypes.object.isRequired,

    value: React.PropTypes.object,

    // func(value)
    onChange: React.PropTypes.func,

    // func(value, summary, validations)
    onSubmit: React.PropTypes.func,

    // todo connect other form

    readOnly: React.PropTypes.bool,

    disabled: React.PropTypes.bool,

    enableValidation: React.PropTypes.any
};

const defaultProps = {
    schema: {},
    buildOptions: {},
    value: {},
    onChange(){},
    onSubmit(){},
    readOnly: false,
    disabled: false,
    enableValidation: 'auto'
};

class Form extends React.Component {
    componentWillMount() {
        this.id = Math.random() + '';
    }

    render() {
        const {schema, value, onChange, buildOptions} = this.props;

        return this.getRenderNode({
            id: this.id,
            schema: this.getFormSchema(),
            value,
            onChange,
            buildOptions
        })
    }

    getFormSchema() {
        return {
            type: EmptyGroup,
            wrapper: EmptyWrapper,
            group: this.props.schema
        }
    }

    getRenderNode({id, schema, value, onChange, buildOptions}) {
        // todo pre-process options
        const Wrapper = schema.wrapper ? schema.wrapper : buildOptions.Wrapper;

        // todo build node;
        let node = null;
        if (schema.array) {
            value = value || [];
            const Node = schema.type ? schema.type : buildOptions.Array;
            const children = _.map(value, (subValue, index)=>this.getRenderNode({
                id: id + '.' + index,
                schema: schema.array,
                value: subValue,
                buildOptions,
                onChange: (v, e)=> onChange(value.slice(0, index).concat([v], value.slice(index + 1)), e)
                // todo other global args
            }));
            node = <Node {...{
                children
            }}/>
        }
        else if (schema.group) {
            value = value || {};
            const Node = schema.type ? schema.type : buildOptions.Group;
            const children = _.map(schema.group, (subSchema, key)=>this.getRenderNode({
                id: id + '.' + key,
                schema: subSchema,
                value: value[key],
                buildOptions,
                onChange: (v, e)=> onChange(_.assign({}, value, {[key]: v}), e)
                // todo other global args
            }));
            node = <Node {...{
                children
            }}/>
        }
        else {
            const Node = typeof schema.type === 'string' ? buildOptions.fields[schema.type] : schema.type;
            if (value === undefined) value = null;
            node = <Node {...{
                id, value, onChange
            }}/>
        }

        // build wrapper;
        return <Wrapper {...{
            key: id,
            id,
            label: schema.label,
            children: node
        }}/>
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
