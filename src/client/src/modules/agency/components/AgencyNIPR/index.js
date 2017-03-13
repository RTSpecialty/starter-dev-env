import React, { Component, PropTypes } from 'react';
import { toastr } from 'react-redux-toastr';
import { Header, Form, FormInput, FormAutocomplete, FormButton } from '../../../common';
import { states } from '../../constants';
import style from './style.scss';

class AgencyNIPR extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      npn: '',
      state: '',
      license: '',
      errors: {
        npn: '',
        state: '',
        license: '',
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { router, next } = this.props;
    toastr.success('Bam!', this.state.npn);
    router.push(next);
  }

  handleChange(name, value) {
    const state = { ...this.state };
    state[name] = value;
    state.errors[name] = this.props.validate(name, value);
    this.setState(state);
  }

  render() {
    return (
      <div className={style.component}>
        <Header title="Agency NIPR" />
        <p>Please identify your Nation Producer Registry Number</p>
        <div className={style.info}>
          <div className={style.input}>
            <Form onSubmit={this.handleClick} >
              <FormInput
                type="text" label="National Producr Number (NPN)" name="npn"
                value={this.state.npn}
                error={this.state.errors.npn}
                onChange={this.handleChange.bind(this, 'npn')} />
              <div className={style.orspacer}>-OR-</div>
              <FormAutocomplete
                direction="down"
                label="Resident State for Licensing"
                hint="You can only choose one..."
                multiple={false}
                onChange={this.handleChange.bind(this, 'state')}
                source={states}
                value={this.state.state} />
              <FormInput
                type="text" label="Resident State License Number" name="license"
                value={this.state.license}
                error={this.state.errors.license}
                onChange={this.handleChange.bind(this, 'license')} />
            </Form>
          </div>
          <FormButton icon="play_arrow" label="Continue" onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

AgencyNIPR.propTypes = {
  router: PropTypes.object.isRequired,
  validate: PropTypes.func.isRequired,
  next: PropTypes.string.isRequired,
};

export default AgencyNIPR;
