import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, validate } from '../../../agency';
import { components } from '../../components';

function mapStateToProps(next) {
  return state => ({
    user: state.user,
    validate,
    next,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const AgencyWrapper = (name, component) => {
  const { next } = components[name];
  // if (name === 'nipr') {
  //   debugger;
  // }
  return connect(mapStateToProps(next), mapDispatchToProps)(component);
};

export default AgencyWrapper;
