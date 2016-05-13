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
 *
 * control node:
 * - type - hold the react class
 * - wrapper - hold the react class
 * - id
 * - label
 * - options
 * - validate
 * - value
 * - validation - validation result
 * - enableValidation
 * - array - hold the array of sub control node(s)
 * - group - hold the group of sub control node(s)
 */

const propTypes = {
    // *** start 1 ***
    // once props, if you wan't to change them, refer to 'rebuild' method

    schema: React.PropTypes.object.isRequired,
    initValues: React.PropTypes.object,
    buildOptions: React.PropTypes.object.isRequired,

    // *** start 1.1 ***

    // *** end 1 ***

    // func(values, validations)
    onSubmit: React.PropTypes.func,

    readOnly: React.PropTypes.bool,

    disabled: React.PropTypes.bool,

    enableValidation: React.PropTypes.any
};

const defaultProps = {
    initValues: {},
    onSubmit(){},
    enableValidation: 'auto'

    // buildOptions - users can set it by themselves
};

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // used to trigger form update
            updateCount: 0,

            enableValidation: false
        }
    }

    componentWillMount() {
        const {schema, initValues, buildOptions} = this.props;
        this.rebuild(schema, initValues, buildOptions);
    }

    componentWillUpdate() {
        validateControlNode(this.controlNode);
        tryEnableValidationOfControlNode(this.controlNode);
    }

    render() {
        return <form ref="form" onSubmit={this.onSubmit.bind(this)}>
            {this.getRenderNode(this.controlNode)}
            {this.props.children}
        </form>;
    }

    rebuild(schema, initValues, buildOptions) {
        const formSchema = {
            type: EmptyGroup,
            wrapper: EmptyWrapper,
            group: schema
        };
        this.controlNode = buildControlNode(formSchema, initValues, buildOptions);
        this.forceUpdate();
    }

    getFormGroup() {
        const FormGroup = (props) => {
            return <form onSubmit={this.onSubmit.bind(this)}>
                {props.children}
                {this.props.children}
            </form>
        };
        FormGroup.displayName = 'FormGroup';
        return FormGroup;
    }

    getRenderNode(controlNode) {
        const {readOnly, disabled} = this.props;
        const {id, label, options, validate, value, validation, array, group} = controlNode;
        const Wrapper = controlNode.wrapper;
        const Node = controlNode.type;

        const enableValidation = this.props.enableValidation === 'auto' ?
            (this.enableValidation || controlNode.enableValidation)
            :
            !!this.props.enableValidation;

        // not all node has validation
        let validationState = enableValidation ? _.get(validation, 'state') : '';
        let validationMessage = enableValidation ? _.get(validation, 'message') : '';

        let nodeProps;
        if (array) {
            nodeProps = {
                id, disabled, validationState,
                children: _.map(array, (controlNode, index)=><div key={index}>
                    {this.getRenderNode(controlNode)}
                </div>),
                onInsert: (index)=> {
                    array.splice(index, 0, buildControlNode(controlNode.schema.array, null, controlNode.buildOptions));
                    controlNode.enableValidation = true;
                    this.updateForm();
                },
                onRemove: (index)=> {
                    array.splice(index, 1);
                    controlNode.enableValidation = true;
                    this.updateForm();
                },
                onMove: (from, to)=> {
                    array.splice(from, 0, array.splice(to, 1)[0]);
                    controlNode.enableValidation = true;
                    this.updateForm();
                }
            }
        }
        else if (group) {
            nodeProps = {
                validationState,
                children: _.map(group, (controlNode, key)=><div key={key}>
                    {this.getRenderNode(controlNode)}
                </div>)
            }
        }
        else {
            nodeProps = {
                id, value, readOnly, disabled, validationState,
                onChange: (value, e)=> {
                    controlNode.value = value;
                    controlNode.enableValidation = true;
                    this.updateForm();
                }
            };
        }

        return <Wrapper {...{label, id, validationState, validationMessage}}>
            <Node {...nodeProps}/>
        </Wrapper>
    }

    updateForm() {
        this.setState({updateCount: this.state.updateCount + 1})
    }

    onSubmit(e) {
        const {onSubmit} = this.props;
        e.preventDefault();

        this.enableValidation = true;
        this.updateForm();

        const value = getValueOfControlNode(this.controlNode);
        const summary = getValidationSummaryOfControlNode(this.controlNode);
        const validations = getValidationDataOfControlNode(this.controlNode);

        onSubmit(value, summary, validations.group);
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

/**
 * adapt a validate func to output standard format result
 * @param validate
 * @output validate
 */
const adaptValidate = (validate)=> {
    return (v)=> {
        if (!validate) return {state: '', message: ''};
        else {
            const result = validate(v);
            if (!result) return {state: 'success', message: ''};
            else if (typeof result === 'string') return {state: 'error', message: result};
            else if (Array.isArray(result)) return {state: result[0], message: result[1]};
            else return result;
        }
    }
};

function buildControlNode(fieldSchema, value = null, buildOptions) {
    const node = _.clone(fieldSchema);
    node.schema = fieldSchema;
    node.buildOptions = buildOptions;

    if (typeof node.type === 'string') node.type = buildOptions.fields[node.type];
    if (!node.wrapper) node.wrapper = buildOptions.Wrapper;
    node.id = Math.random() + '';
    node.validate = adaptValidate(node.validate);
    node.enableValidation = false;
    node.validation = node.validate(value);

    if (node.array) {
        node.type = node.type || buildOptions.Array;
        node.array = buildControlArray(fieldSchema.array, value || [], buildOptions);
    }
    else if (node.group) {
        node.type = node.type || buildOptions.Group;
        node.group = buildControlGroup(fieldSchema.group, value || {}, buildOptions);
    }
    else {
        node.value = value;
    }

    return node;
}

function buildControlGroup(groupSchema, values, buildOptions) {
    return _.mapValues(groupSchema, (fieldSchema, key)=> buildControlNode(fieldSchema, values[key], buildOptions));
}

function buildControlArray(schema, valueArray, buildOptions) {
    return _.map(valueArray, (value, index)=> buildControlNode(schema, value, buildOptions));
}

function getValueOfControlNode(node) {
    if (node.group) return _.mapValues(node.group, (node, key)=>getValueOfControlNode(node));
    else if (node.array) return _.map(node.array, (node, key)=>getValueOfControlNode(node));
    else return node.value;
}

function validateControlNode(node) {
    if (node.group) {
        node.validation = node.validate(getValueOfControlNode(node));
        _.forEach(node.group, (subNode)=>validateControlNode(subNode))
    }
    else if (node.array) {
        node.validation = node.validate(getValueOfControlNode(node));
        _.forEach(node.array, (subNode)=>validateControlNode(subNode))
    }
    else {
        node.validation = node.validate(node.value);
    }
}

function tryEnableValidationOfControlNode(node) {
    const subNodes = node.group || node.array;

    if (subNodes) {
        let results = _.map(subNodes, (subNode)=>tryEnableValidationOfControlNode(subNode));
        if (_.some(results)) node.enableValidation = true;
    }

    return node.enableValidation;
}

function getValidationDataOfControlNode(node) {
    const data = {};
    data.state = node.validation.state;
    data.message = node.validation.message;

    if (node.array) data.array = _.map(node.array, (subNode)=>getValidationDataOfControlNode(subNode));
    else if (node.group) data.group = _.mapValues(node.group, (subNode)=>getValidationDataOfControlNode(subNode));

    return data;
}

function getValidationSummaryOfControlNode(node) {
    let summary = {
        success: 0,
        warning: 0,
        error: 0
    };

    if (node.array || node.group) {
        let subNodes = node.array || node.group;
        _.forEach(subNodes, (subNode)=> {
            const subSummary = getValidationSummaryOfControlNode(subNode);
            summary = _.mapValues(summary, (value, state)=>value + subSummary[state]);
        });
    }

    if (node.validation.state) summary[node.validation.state] = summary[node.validation.state] + 1;

    return summary;
}