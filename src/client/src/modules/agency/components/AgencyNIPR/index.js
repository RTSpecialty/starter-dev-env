import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
// import Dropdown from 'react-toolbox/lib/dropdown';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import { Button } from 'react-toolbox/lib/button';
import { toastr } from 'react-redux-toastr';
import { Header } from '../../../common';
import style from './style.scss';

const validate = () => '';

const states = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'U.S. Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  DC: 'District of Columbia',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

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
        <Header title="Agency NIPR" />
        <p>Please identify your Nation Producer Registry Number</p>
        <div className={style.info}>
          <div className={style.input}>
            <Input
              type="text" label="National Producr Number (NPN)" name="npn"
              value={this.state.npn}
              error={this.state.errors.npn}
              onChange={this.handleChange.bind(this, 'npn')} />
            <div className={style.orspacer}>-OR-</div>
            <Autocomplete
              direction="down"
              label="Resident State for Licensing"
              hint="You can only choose one..."
              multiple={false}
              onChange={this.handleChange.bind(this, 'state')}
              source={states}
              value={this.state.state} />
            <Input
              type="text" label="Resident State License Number" name="license"
              value={this.state.license}
              error={this.state.errors.license}
              onChange={this.handleChange.bind(this, 'license')} />
          </div>
          <Button icon="play_arrow" label="Continue" onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

AgencyNIPR.propTypes = {
  router: PropTypes.object.isRequired,
};

export default AgencyNIPR;
