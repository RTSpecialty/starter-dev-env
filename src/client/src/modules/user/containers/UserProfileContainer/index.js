import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserProfile from '../../components/UserProfile';
import { actions, validate } from '../../../user';

function mapStateToProps(state) {
  return {
    user: state.user,
    validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
