import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserAvatar from '../../components/UserAvatar';
import { actions } from '../../../user';

const getName = ({ firstName, lastName }) => `${firstName} ${lastName}`;

function mapStateToProps(state) {
  return {
    email: state.user.username,
    name: getName(state.user),
    organization: state.user.organization,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
