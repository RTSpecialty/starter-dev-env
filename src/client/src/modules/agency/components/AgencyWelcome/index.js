import React, { Component, PropTypes } from 'react';
import { toastr } from 'react-redux-toastr';
import { Header, Form, FormInput, FormInputMask, FormDropdown, FormButton } from '../../../common';
import { classifications } from '../../constants';
import style from './style.scss';

class Welcome extends Component {
  constructor(props, context) {
    super(props, context);
    const { name = '', classification = '', other = '', taxId = '' } = this.props.agency;
    this.state = {
      formDisabled: false,
      name,
      classification,
      other,
      taxId,
      errors: {
        name: '',
        classification: '',
        other: '',
        taxId: '',
      },
    };
    this.validate = this.validate.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
    this.loadAgency();
  }

  componentWillReceiveProps(nextProps) {
    const { name, classification, other, taxId } = nextProps.agency;
    this.setState({ ...this.state, name, classification, other, taxId });
  }

  loadAgency() {
    const { user, agency, actions } = this.props;
    if (!agency.id) {
      if (user.agencyId) {
        actions.loadAgency(user.agencyId);
      }
    }
  }

  validate(name, value) {
    if (name === 'other' && this.state.classification === 'Other') {
      return (value && value.length !== 0) ? '' : 'Please describe your classification';
    }
    return this.props.validate(name, value);
  }

  handleSave() {
    const { router, next, user, agency,
      actions: { newAgency, saveAgency, saveUser } } = this.props;
    const state = { ...this.state };
    const fields = ['name', 'classification', 'other', 'taxId'];
    const isValid = fields.map((name) => {
      state.errors[name] = this.validate(name, state[name]);
      return state.errors[name].length === 0;
    }).reduce((valid, value) => valid && value, true);
    state.formDisabled = isValid;
    this.setState(state);

    if (isValid) {
      const { name, classification, other, taxId } = state;
      if (agency.id) {
        saveAgency(agency.id, { name, classification, other, taxId })
          .then(({ agency: agt, msg }) => {
            toastr.success('Success!', msg);
            return saveUser(user.id, { agencyId: agt.id, organization: agt.name });
          })
          .then(() => router.push(next))
          .catch(this.handleServerError);
      } else {
        newAgency({ name, classification, other, taxId })
          .then(({ agency: agt, msg }) => {
            toastr.success('Success!', msg);
            return saveUser(user.id, { agencyId: agt.id, organization: agt.name });
          })
          .then(() => router.push(next))
          .catch(this.handleServerError);
      }
    }
  }

  handleChange(name, value) {
    const state = { ...this.state };
    state[name] = value;
    state.errors[name] = this.validate(name, value);
    this.setState(state);
  }

  handleServerError(error) {
    this.setState({ ...this.state, formDisabled: false });
    toastr.error('Oops!', error);
  }

  renderOther() {
    return (this.state.classification !== 'Other')
      ? ''
      : (
        <FormInput
          type="text" label="&quot;Other&quot; Federal Tax Classification" name="other"
          value={this.state.other}
          error={this.state.errors.other}
          disabled={this.state.formDisabled}
          onChange={this.handleChange.bind(this, 'other')} />
        );
  }

  renderTaxId() {
    return (this.state.classification !== 'Individual')
      ? (
        <FormInputMask
          mask="99-9999999" maskChar={null}
          type="text" label="Enter FEIN" name="taxId"
          value={this.state.taxId}
          error={this.state.errors.taxId}
          onChange={this.handleChange.bind(this, 'taxId')} />
        )
      : (
        <FormInputMask
          mask="999-99-9999" maskChar={null}
          type="text" label="Enter SSN" name="taxId"
          value={this.state.taxId}
          error={this.state.errors.taxId}
          onChange={this.handleChange.bind(this, 'taxId')} />
        );
  }

  render() {
    return (
      <div className={style.component}>
        <Header title="Welcome" />
        <p>Please identify your agency</p>
        <div className={style.info}>
          <div className={style.input}>
            <Form onSubmit={this.handleSave} >
              <FormInput
                type="text" label="Full Agency Name" name="name"
                value={this.state.name}
                error={this.state.errors.name}
                onChange={this.handleChange.bind(this, 'name')} />
              <FormDropdown
                auto
                label="Federal Tax Classification" name="classification"
                source={classifications}
                value={this.state.classification}
                error={this.state.errors.classification}
                onChange={this.handleChange.bind(this, 'classification')} />
              {this.renderOther()}
              {this.renderTaxId()}
            </Form>
          </div>
          <FormButton icon="play_arrow" label="Continue" onClick={this.handleSave} />
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  agency: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  validate: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  next: PropTypes.string.isRequired,
};

export default Welcome;
