import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { toastr } from 'react-redux-toastr';
import { Header, Form, FormInput, FormButton } from '../../../common';
import style from './style.scss';

class Profile extends Component {
  constructor(props, context) {
    super(props, context);
    const { firstName, lastName, username: email } = this.props.user;
    this.state = {
      formDisabled: false,
      firstName,
      lastName,
      email,
      errors: {
        lastName: '',
        firstName: '',
        email: '',
      },
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { firstName, lastName, username: email } = nextProps.user;
    this.setState({ ...this.state, firstName, lastName, email });
  }

  handleChange(name, value) {
    const { validate } = this.props;
    const state = { ...this.state };
    state[name] = value;
    state.errors[name] = validate(name, value);
    this.setState(state);
  }

  handleCancel() {
    this.props.router.goBack();
  }

  handleSave() {
    const { actions, validate, user } = this.props;
    const state = { ...this.state };
    const fields = ['firstName', 'lastName', 'email'];
    const isValid = fields.map((name) => {
      state.errors[name] = validate(name, state[name]);
      return state.errors[name].length === 0;
    }).reduce((valid, value) => valid && value, true);
    state.formDisabled = isValid;
    this.setState(state);

    if (isValid) {
      const { firstName, lastName, email: username } = this.state;
      actions.saveUser(user.id, { firstName, lastName, username })
        .then((msg) => {
          toastr.success('Success!', msg);
          this.props.router.goBack();
        })
        .catch(this.handleServerError);
    }
  }

  handleServerError(error) {
    this.setState({ ...this.state, formDisabled: false });
    toastr.error('Oops!', error.message);
  }

  render() {
    return (
      <div className={style.component}>
        <Header title="Profile" />
        <Card className={style.login}>
          <CardTitle
            subtitle="Edit your user profile."
          />
          <div className={style.profile} >
            <Form onSubmit={this.handleRegister} >
              <div className={style.names}>
                <div className={style.name}>
                  <FormInput
                    type="text" label="First Name" icon="account_box" name="firstName"
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
              <FormInput
                type="email" label="Email" icon="email" name="username"
                value={this.state.email}
                error={this.state.errors.email}
                disabled={this.state.formDisabled}
                onChange={this.handleChange.bind(this, 'email')} />
            </Form>
            <CardActions>
              <FormButton icon="check" label="Save" onClick={this.handleSave} />
              <FormButton icon="cancel" label="Cancel" onClick={this.handleCancel} />
            </CardActions>
          </div>
        </Card>
      </div>
    );
  }
}

Profile.propTypes = {
  router: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  validate: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Profile;
