import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import { Header } from '../../containers';
import style from './style.scss';

class Logoff extends Component {
  handleClick() {
    this.props.router.push('/home/login');
  }

  render() {
    return (
      <div className={style.component}>
        <Header title="Goodbye" />
        <Card className={style.login}>
          <CardTitle
            subtitle="Thank you for using the RSG Agent Portal."
          />
          <CardActions>
            <Button icon="keyboard_backspace" label="Log Back In" onClick={this.handleClick.bind(this)} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

Logoff.propTypes = {
  router: PropTypes.object.isRequired,
};

export default Logoff;
