import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as agency, validate } from '../../../agency';
import { actions as user } from '../../../user';
import { components } from '../../components';

function mapStateToProps(meta) {
  return state => ({
    agency: state.agency,
    auth: state.auth,
    user: state.user,
    completed: state.completed,
    validate,
    meta,
  });
}

function mapDispatchToProps(dispatch) {
  const actions = { ...agency, ...user };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const AgencyWrapper = (name, component) => {
  const meta = components[name];
  return connect(mapStateToProps(meta), mapDispatchToProps)(component);
};

export default AgencyWrapper;
