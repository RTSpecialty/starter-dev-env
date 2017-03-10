import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import { Header } from '../../../common';
import style from './style.scss';

class Profile extends Component {
  handleClick(cmd) {
    if (cmd === 'save') {
      this.props.router.goBack();
    } else {
      this.props.router.goBack();
    }
  }

  render() {
    return (
      <div className={style.component}>
        <Header title="Profile" />
        <Card className={style.login}>
          <CardTitle
            subtitle="Edit your user profile."
          />
          <CardActions>
            <Button icon="keyboard_backspace" label="Save" onClick={this.handleClick.bind(this, 'save')} />
            <Button icon="keyboard_backspace" label="Cancel" onClick={this.handleClick.bind(this, 'cancel')} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

Profile.propTypes = {
  router: PropTypes.object.isRequired,
};

export default Profile;
