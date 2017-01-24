import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import { toastr } from 'react-redux-toastr';
import { Header } from '../../../common';
import style from './style.scss';

class Password extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      disabled: false,
      active: false,
      header: `${this.props.params.id} Password`,
      title: '',
      content: '',
      confirm: '',
      password: '',
      error: '',
    };
    this.handleDialog = this.handleDialog.bind(this);
    this.actions = [{ label: 'Ok', onClick: this.handleDialog }];
  }

  handleDialog() {
    this.setState({ ...this.state, active: !this.state.active });
  }

  handleChange(name, value) {
    this.setState({ ...this.state, [name]: value, error: '' });
  }

  handleClick(name) {
    const state = { ...this.state };
    if (state.password !== state.confirm) {
      state.error = 'Passwords don\'t match';
    }

    if (state.password.length <= 7) {
      state.error = 'That password is too short, 8 character minimum';
    }

    if (this.props.params.id === 'new' && name === 'cancel') {
      state.title = 'Confirm Cancel...';
      state.content = (<p>You&apos;re a new user, so you do not want to cancel...</p>);
      state.error = 'Please enter a password';
      state.active = true;
    }

    this.setState(state);
    if (state.error.length === 0) {
      toastr.success('Success!', 'The password was saved.');
      this.props.router.push('/agency/welcome');
    }
  }

  render() {
    return (
      <div className={style.component}>
        <Header title={this.state.header} />
        <Card className={style.login}>
          <CardTitle
            subtitle="Please enter in a new password"
          />
          <div className={style.input}>
            <Input
              type="password" label="Password" icon="security" name="password"
              value={this.state.password}
              error={this.state.error}
              onChange={this.handleChange.bind(this, 'password')} />
            <Input
              type="password" label="Confirm" icon="verified_user" name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange.bind(this, 'confirm')} />
          </div>
          <CardActions>
            <Button icon="check" label="Save" onClick={this.handleClick.bind(this, 'save')} />
            <Button icon="cancel" label="Cancel" onClick={this.handleClick.bind(this, 'cancel')} />
          </CardActions>
        </Card>
        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleDialog}
          onOverlayClick={this.handleDialog}
          title={this.state.title} >
          {this.state.content}
        </Dialog>
      </div>
    );
  }
}

Password.propTypes = {
  router: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default Password;
