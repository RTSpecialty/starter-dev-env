import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../../components/Home';
import { actions } from '../../../user';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
