import React, { Component, PropTypes } from 'react';
import { toastr } from 'react-redux-toastr';
import { Header, Form, FormInput, FormInputMask, FormDropdown, FormButton } from '../../../common';
import { classifications } from '../../constants';
import style from './style.scss';

class Welcome extends Component {
  constructor(props, context) {
    super(props, context);
    this.isAuthorized();
    const { agencyName = '', firstName = '', lastName = '', classification = '', otherClass = '', taxId = '' } = this.props.agency;
    this.state = {
      formDisabled: false,
      formChanged: false,
      agencyName,
      firstName,
      lastName,
      classification,
      otherClass,
      taxId,
      errors: {
        agencyName: '',
        firstName: '',
        lastName: '',
        classification: '',
        otherClass: '',
        taxId: '',
      },
    };
    this.validate = this.validate.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
    this.loadAgency();
  }

  componentWillReceiveProps(nextProps) {
    const { agencyName, firstName, lastName, classification, otherClass, taxId } = nextProps.agency;
    this.setState({
      ...this.state,
      agencyName,
      firstName,
      lastName,
      classification,
      otherClass,
      taxId });
  }

  isAuthorized() {
    const { auth, meta, router } = this.props;
    if (!auth.agency || (auth.agency && !auth.agency.includes(meta.name))) {
      router.push(meta.back.path);
    }
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
    if (name === 'otherClass' && this.state.classification === 'Other') {
      return (value && value.length !== 0) ? '' : 'Please describe your classification';
    } else if (name === 'firstName' && this.state.classification === 'Individual') {
      return (value && value.length !== 0) ? '' : 'Please enter a first name';
    } else if (name === 'lastName' && this.state.classification === 'Individual') {
      return (value && value.length !== 0) ? '' : 'Please enter a last name';
    }
    return this.props.validate(name, value);
  }

  handleComplete({ agency: agt, msg }) {
    const { router, meta, user,
      actions: { saveUser, addAuth, addCompleted } } = this.props;
    toastr.success('Success!', msg);
    return saveUser(user.id, { agencyId: agt.id, organization: agt.agencyName })
      .then((message) => {
        toastr.success('Success!', message);
        return addAuth(user.id, 'agency', meta.next.name);
      })
      .then((message) => {
        toastr.success('Success!', message);
        return addCompleted(user.id, 'agency', meta.name);
      })
      .then(() => router.push(meta.next.path))
      .catch(this.handleServerError);
  }

  handleSave() {
    const { router, meta, agency, actions: { newAgency, saveAgency } } = this.props;
    const state = { ...this.state };
    const fields = ['agencyName', 'firstName', 'lastName', 'classification', 'otherClass', 'taxId'];
    const isValid = fields.map((name) => {
      state.errors[name] = this.validate(name, state[name]);
      return state.errors[name].length === 0;
    }).reduce((valid, value) => valid && value, true);
    state.formDisabled = isValid;
    state.formChanged = false;
    this.setState(state);

    if (isValid) {
      const { agencyName, firstName, lastName, classification, otherClass, taxId } = state;
      if (agency.id) {
        saveAgency(agency.id,
          { agencyName, firstName, lastName, classification, otherClass, taxId })
          .then(({ msg }) => {
            toastr.success('Success!', msg);
            router.push(meta.next.path);
          })
          .catch(this.handleServerError);
      } else {
        newAgency({ agencyName, firstName, lastName, classification, otherClass, taxId })
          .then(this.handleComplete)
          .catch(this.handleServerError);
      }
    }
  }

  handleChange(name, value) {
    const state = { ...this.state };
    state[name] = value;
    state.errors[name] = this.validate(name, value);
    state.formChanged = true;
    this.setState(state);
  }

  handleServerError(error) {
    this.setState({ ...this.state, formDisabled: false });
    toastr.error('Oops!', error.message);
  }

  renderIndvName() {
    return (this.state.classification !== 'Individual')
      ? ''
      : (
        <div className={style.names}>
          <div className={style.name}>
            <FormInput
              type="text" label="First Name" name="firstName"
              value={this.state.firstName}
              error={this.state.errors.firstName}
              disabled={this.state.formDisabled}
              onChange={this.handleChange.bind(this, 'firstName')} />
          </div>
          <div className={style.name}>
            <FormInput
              type="text" label="Last Name" name="lastName"
              value={this.state.lastName}
              error={this.state.errors.lastName}
              disabled={this.state.formDisabled}
              onChange={this.handleChange.bind(this, 'lastName')} />
          </div>
        </div>
      );
  }

  renderOther() {
    return (this.state.classification !== 'Other')
      ? ''
      : (
        <FormInput
          type="text" label="&quot;Other&quot; Federal Tax Classification" name="otherClass"
          value={this.state.otherClass}
          error={this.state.errors.otherClass}
          disabled={this.state.formDisabled}
          onChange={this.handleChange.bind(this, 'otherClass')} />
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
          disabled={this.state.formDisabled}
          onChange={this.handleChange.bind(this, 'taxId')} />
        )
      : (
        <FormInputMask
          mask="999-99-9999" maskChar={null}
          type="text" label="Enter SSN" name="taxId"
          value={this.state.taxId}
          error={this.state.errors.taxId}
          disabled={this.state.formDisabled}
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
                type="text" label="Full Agency Name" name="agencyName"
                value={this.state.agencyName}
                error={this.state.errors.agencyName}
                disabled={this.state.formDisabled}
                onChange={this.handleChange.bind(this, 'agencyName')} />
              <FormDropdown
                auto
                label="Federal Tax Classification" name="classification"
                source={classifications}
                value={this.state.classification}
                error={this.state.errors.classification}
                disabled={this.state.formDisabled}
                onChange={this.handleChange.bind(this, 'classification')} />
              {this.renderOther()}
              {this.renderIndvName()}
              {this.renderTaxId()}
            </Form>
          </div>
          <div className={style.buttons}>
            <FormButton className={style.left} icon="play_arrow" label="Continue" onClick={this.handleSave} raised primary />
          </div>
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  auth: PropTypes.object.isRequired,
  agency: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  validate: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default Welcome;
