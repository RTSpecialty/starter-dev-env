import React, { PropTypes } from 'react';
import { FormInput } from '../../../common';
import style from './style.scss';

const Address = ({ disabled, onChange, values, errors }) => (
  <div className={style.address} >
    <div className={style.lines} >
      <FormInput
        type="text" label="Address 1" name="line1"
        value={values.line1}
        error={errors.line1}
        disabled={disabled}
        onChange={onChange.line1} />
      <FormInput
        type="text" label="Address 2" name="line2"
        value={values.line2}
        error={errors.line2}
        disabled={disabled}
        onChange={onChange.line2} />
    </div>
    <div className={style.citystatezip}>
      <div className={style.city}>
        <FormInput
          type="text" label="City / Locality" name="locality"
          value={values.locality}
          error={errors.locality}
          disabled={disabled}
          onChange={onChange.locality} />
      </div>
      <div className={style.state}>
        <FormInput
          type="text" label="State / Region" name="region"
          value={values.region}
          error={errors.region}
          disabled={disabled}
          onChange={onChange.region} />
      </div>
      <div className={style.zip}>
        <FormInput
          type="text" label="Postal Code" name="postalCode"
          value={values.postalCode}
          error={errors.postalCode}
          disabled={disabled}
          onChange={onChange.postalCode} />
      </div>
    </div>
  </div>
);

Address.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.shape({
    line1: PropTypes.func.isRequired,
    line2: PropTypes.func.isRequired,
    locality: PropTypes.func.isRequired,
    region: PropTypes.func.isRequired,
    postalCode: PropTypes.func.isRequired,
  }).isRequired,
  values: PropTypes.shape({
    line1: PropTypes.string.isRequired,
    line2: PropTypes.string.isRequired,
    locality: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    line1: PropTypes.string.isRequired,
    line2: PropTypes.string.isRequired,
    locality: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
  }).isRequired,
};

export default Address;
