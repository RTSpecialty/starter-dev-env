import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Button } from 'react-toolbox/lib/button';
import { toastr } from 'react-redux-toastr';
import { Header } from '../../../common';
import style from './style.scss';

const validate = () => '';

const classifications = [
  { value: 'C-Corp', label: 'C Corporation' },
  { value: 'Individual', label: 'Individual/Sole Proprietorship/Single Member LLC' },
  { value: 'S-Corp', label: 'S Corporation' },
  { value: 'Partership', label: 'Partnership' },
  { value: 'Trust', label: 'Trust/Estate' },
  { value: 'LLC-C-Corp', label: 'Limited Liability Company (C-Corporation)' },
  { value: 'LLC-S-Corp', label: 'Limited Liability Company (S-Corporation)' },
  { value: 'LLC-Partnership', label: 'Limited Liability Company (Partnership)' },
  { value: 'Other', label: 'Other' },
];

class Welcome extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      class: '',
      fein: '',
      errors: {
        name: '',
        class: '',
        fein: '',
      },
    };
    this.label = 'FIEN';
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
        <Header title="Welcome" />
        <p>Please identify your agency</p>
        <div className={style.info}>
          <div className={style.input}>
            <Input
              type="text" label="Full Agency Name" name="name"
              value={this.state.name}
              error={this.state.errors.name}
              onChange={this.handleChange.bind(this, 'name')} />
            <Dropdown
              auto
              label="Federal Tax Classification" name="class"
              source={classifications}
              value={this.state.class}
              onChange={this.handleChange.bind(this, 'class')} />
            <Input
              type="text" label={this.label} name="fein"
              value={this.state.fein}
              error={this.state.errors.fein}
              onChange={this.handleChange.bind(this, 'fein')} />
          </div>
          <Button icon="play_arrow" label="Continue" onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  router: PropTypes.object.isRequired,
};

export default Welcome;
