import React, { Component, PropTypes } from 'react';
import { toastr } from 'react-redux-toastr';
import { Header, Form, FormInput, FormAutocomplete, FormButton } from '../../../common';
import { states } from '../../constants';
import style from './style.scss';

class AgencyNIPR extends Component {
  constructor(props, context) {
    super(props, context);
    this.isAuthorized();
    const { npn = '', homeState = '', homeStateLicense = '' } = this.props.agency;
    this.state = {
      formDisabled: false,
      formChanged: false,
      npn,
      homeState,
      homeStateLicense,
      errors: {
        npn: '',
        homeState: '',
        homeStateLicense: '',
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
    const { npn, homeState, homeStateLicense } = nextProps.agency;
    this.setState({ ...this.state, npn, homeState, homeStateLicense });
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
    if (name === 'npn') {
      /* eslint-disable no-nested-ternary */
      return (this.state.homeState !== '' && this.state.homeStateLicense !== '')
        ? ''
        : (value && value.length !== 0) ? '' : 'Please enter an NPN number';
    } else if (name === 'homeState' && this.state.npn === '') {
      return (value && value.length !== 0) ? '' : 'Please pick a resident state';
    } else if (name === 'homeStateLicense' && this.state.npn === '') {
      return (value && value.length !== 0) ? '' : 'Please enter a resident state license number';
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
    const fields = ['npn', 'homeState', 'homeStateLicense'];
    const isValid = fields.map((name) => {
      state.errors[name] = this.validate(name, state[name]);
      return state.errors[name].length === 0;
    }).reduce((valid, value) => valid && value, true);
    state.formDisabled = isValid;
    state.formChanged = false;
    this.setState(state);

    if (isValid) {
      const { npn, homeState, homeStateLicense } = state;
      saveAgency(agency.id, { npn, homeState, homeStateLicense })
        .then(this.handleComplete)
        .catch(this.handleServerError);
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

  render() {
    return (
      <div className={style.component}>
        <Header title="NAIC - NIPR" />
        <p>Please identify your Nation Producer Registry Number</p>
        <div className={style.info}>
          <div className={style.input}>
            <Form onSubmit={this.handleClick} >
              <FormAutocomplete
                direction="down"
                label="Resident State for Licensing"
                hint="You can only choose one..."
                multiple={false}
                source={states}
                value={this.state.homeState}
                error={this.state.errors.homeState}
                disabled={this.state.formDisabled}
                onChange={this.handleChange.bind(this, 'homeState')} />
              <FormInput
                type="text" label="Resident State License Number" name="homeStateLicense"
                value={this.state.homeStateLicense}
                error={this.state.errors.homeStateLicense}
                disabled={this.state.formDisabled}
                onChange={this.handleChange.bind(this, 'homeStateLicense')} />
              <div className={style.orspacer}>-OR-</div>
              <FormInput
                type="text" label="National Producr Number (NPN)" name="npn"
                value={this.state.npn}
                error={this.state.errors.npn}
                disabled={this.state.formDisabled}
                onChange={this.handleChange.bind(this, 'npn')} />
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

AgencyNIPR.propTypes = {
  auth: PropTypes.object.isRequired,
  agency: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  validate: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  completed: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default AgencyNIPR;
