import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as agency, validate } from '../../../agency';
import { actions as user } from '../../../user';
import { components } from '../../components';

function mapStateToProps(next) {
  return state => ({
    agency: state.agency,
    user: state.user,
    validate,
    next,
  });
}

function mapDispatchToProps(dispatch) {
  const actions = { ...agency, ...user };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const AgencyWrapper = (name, component) => {
  const { next } = components[name];
  return connect(mapStateToProps(next), mapDispatchToProps)(component);
};

export default AgencyWrapper;
