import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { toastr } from 'react-redux-toastr';
import { Header, Form, FormInput, FormButton } from '../../../common';
import style from './style.scss';

class Password extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      header: `${this.props.params.id} Password`,
      formDisabled: false,
      password: '',
      confirm: '',
      errors: {
        password: '',
        confirm: '',
      },
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
  }

  validate(name, value) {
    if (name === 'confirm') {
      return (this.state.password !== value) ? 'Passwords don\'t match' : '';
    }
    return this.props.validate(name, value);
  }

  handleChange(name, value) {
    const state = { ...this.state };
    state[name] = value;
    state.errors[name] = this.validate(name, value);
    this.setState(state);
  }

  handleCancel() {
    this.props.router.goBack();
  }

  handleSave() {
    const state = { ...this.state };
    const fields = ['password', 'confirm'];
    const isValid = fields.map((name) => {
      state.errors[name] = this.validate(name, state[name]);
      return state.errors[name].length === 0;
    }).reduce((valid, value) => valid && value, true);
    state.formDisabled = isValid;
    this.setState(state);
    if (isValid) {
      const { actions, user } = this.props;
      actions.savePassword(user.id, state.password)
        .then((msg) => {
          toastr.success('Success!', msg);
          this.props.router.push('/agency/welcome');
        })
        .catch(this.handleServerError);
    }
  }

  handleServerError(error) {
    this.setState({ ...this.state, formDisabled: false });
    toastr.error('Oops!', error.message);
  }

  renderButtons() {
    return (['new', 'reset'].includes(this.props.params.id))
    ? (
      <CardActions>
        <FormButton icon="check" label="Save" onClick={this.handleSave} />
      </CardActions>
      )
    : (
      <CardActions>
        <FormButton icon="check" label="Save" onClick={this.handleSave} />
        <FormButton icon="cancel" label="Cancel" onClick={this.handleCancel} />
      </CardActions>
      );
  }

  render() {
    const buttons = this.renderButtons();
    return (
      <div className={style.component}>
        <Header title={this.state.header} />
        <Card className={style.login}>
          <CardTitle
            subtitle="Please enter in a new password"
          />
          <div className={style.input}>
            <Form onSubmit={this.handleSave} >
              <FormInput
                type="password" label="Password" icon="security" name="password"
                value={this.state.password}
                error={this.state.errors.password}
                disabled={this.state.formDisabled}
                onChange={this.handleChange.bind(this, 'password')} />
              <FormInput
                type="password" label="Confirm" icon="verified_user" name="confirm"
                value={this.state.confirm}
                error={this.state.errors.confirm}
                disabled={this.state.formDisabled}
                onChange={this.handleChange.bind(this, 'confirm')} />
            </Form>
          </div>
          {buttons}
        </Card>
      </div>
    );
  }
}

Password.propTypes = {
  router: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  validate: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Password;
