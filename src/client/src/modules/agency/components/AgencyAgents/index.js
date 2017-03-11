import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
// import Dropdown from 'react-toolbox/lib/dropdown';
import { Button } from 'react-toolbox/lib/button';
import { toastr } from 'react-redux-toastr';
import { Header } from '../../../common';
import style from './style.scss';

const validate = () => '';

class AgencyAgents extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      errors: {
        name: '',
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    toastr.success('Bam!', this.state.name);
  }

  handleChange(name, value) {
    const state = { ...this.state };
    state[name] = value;
    state.errors[name] = validate(name, value);
    this.setState(state);
  }

  render() {
    return (
      <div className={style.component}>
        <Header title="Producing Agents" />
        <p>Please identify your agents</p>
        <div className={style.info}>
          <div className={style.input}>
            <Input
              type="text" label="Agent Name" name="name"
              value={this.state.name}
              error={this.state.errors.name}
              onChange={this.handleChange.bind(this, 'name')} />
          </div>
          <Button icon="play_arrow" label="Continue" onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

AgencyAgents.propTypes = {
  router: PropTypes.object.isRequired,
};

export default AgencyAgents;
