import React, { Component, PropTypes } from 'react';
import { toastr } from 'react-redux-toastr';
import numeral from 'numeral';
import { Header, Form, FormInput, FormDropdown, FormDatePicker, FormButton } from '../../../common';
import { carriers } from '../../constants';
import style from './style.scss';

class AgencyCoverage extends Component {
  constructor(props, context) {
    super(props, context);
    this.isAuthorized();
    const { carrier = '', otherInsurer = '', expiration = Date.now(), limit = '' } = this.props.agency;
    this.state = {
      formDisabled: false,
      formChanged: false,
      carrier,
      otherInsurer,
      expiration: new Date(expiration),
      limit: numeral(limit).format('$0,0'),
      errors: {
        carrier: '',
        otherInsurer: '',
        expiration: '',
        limit: '',
      },
    };
    this.validate = this.validate.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
    this.loadAgency();
  }

  componentWillReceiveProps(nextProps) {
    const { carrier, otherInsurer, expiration, limit } = nextProps.agency;
    this.setState({
      ...this.state,
      carrier,
      otherInsurer,
      expiration: (expiration === null) ? Date.now() : new Date(expiration),
      limit: numeral(limit).format('$0,0') });
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
    if (name === 'otherInsurer' && this.state.carrier === 'Other') {
      return (value && value.length !== 0) ? '' : 'Please name your E&O insurer';
    }
    return this.props.validate(name, value);
  }

  handleBack() {
    const { router, meta } = this.props;
    router.push(meta.back.path);
  }

  handleComplete({ msg }) {
    const { router, meta, user, completed,
      actions: { addAuth, addCompleted } } = this.props;
    toastr.success('Success!', msg);
    if (completed.agency && completed.agency.includes(meta.name)) {
      router.push(meta.next.path);
    } else {
      addAuth(user.id, 'agency', meta.next.name)
        .then((message) => {
          toastr.success('Success!', message);
          return addCompleted(user.id, 'agency', meta.name);
        })
        .then((message) => {
          toastr.success('Success!', message);
          router.push(meta.next.path);
        })
        .catch(this.handleServerError);
    }
  }

  handleSave() {
    const { agency, actions: { saveAgency } } = this.props;
    const state = { ...this.state };
    const fields = ['carrier', 'otherInsurer', 'expiration', 'limit'];
    const isValid = fields.map((name) => {
      state.errors[name] = this.validate(name, state[name]);
      return state.errors[name].length === 0;
    }).reduce((valid, value) => valid && value, true);
    state.formDisabled = isValid;
    state.formChanged = false;
    this.setState(state);

    if (isValid) {
      const { carrier, otherInsurer, expiration, limit } = state;
      saveAgency(agency.id, { carrier, otherInsurer, expiration, limit: numeral(limit).value() })
        .then(this.handleComplete)
        .catch(this.handleServerError);
    }
  }

  handleChange(name, value) {
    const state = { ...this.state };
    state[name] = (name === 'limit') ? numeral(value).format('$0,0') : value;
    state.errors[name] = this.validate(name, value);
    state.formChanged = true;
    this.setState(state);
  }

  handleServerError(error) {
    this.setState({ ...this.state, formDisabled: false });
    toastr.error('Oops!', error.message);
  }

  renderOther() {
    return (this.state.carrier !== 'Other')
      ? ''
      : (
        <FormInput
          type="text" label="&quot;Other&quot; E&O Insurer" name="otherInsurer"
          value={this.state.otherInsurer}
          error={this.state.errors.otherInsurer}
          disabled={this.state.formDisabled}
          onChange={this.handleChange.bind(this, 'otherInsurer')} />
        );
  }

  render() {
    return (
      <div className={style.component}>
        <Header title="E&O Coverage" />
        <p>Please enter your E&O carrier and coverage limits</p>
        <div className={style.info}>
          <div className={style.input}>
            <Form onSubmit={this.handleClick} >
              <FormDropdown
                auto
                label="Who is your E&O Insurer" name="carrier"
                source={carriers}
                value={this.state.carrier}
                error={this.state.errors.carrier}
                disabled={this.state.formDisabled}
                onChange={this.handleChange.bind(this, 'carrier')} />
              {this.renderOther()}
              <FormDatePicker
                label="E&O Expiration Date" name="expiration"
                sundayFirstDayOfWeek
                value={this.state.expiration}
                error={this.state.errors.expiration}
                disabled={this.state.formDisabled}
                onChange={this.handleChange.bind(this, 'expiration')} />
              <FormInput
                type="text" label="E&O Coverage Limit" name="limit"
                value={this.state.limit}
                error={this.state.errors.limit}
                disabled={this.state.formDisabled}
                onChange={this.handleChange.bind(this, 'limit')} />
            </Form>
          </div>
          <div className={style.buttons}>
            <FormButton className={style.left} icon="keyboard_arrow_left" label="Back" onClick={this.handleBack} raised />
            <FormButton className={style.right} icon="play_arrow" label="Continue" onClick={this.handleSave} raised primary />
          </div>
        </div>
      </div>
    );
  }
}

AgencyCoverage.propTypes = {
  auth: PropTypes.object.isRequired,
  agency: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  validate: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  completed: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default AgencyCoverage;
