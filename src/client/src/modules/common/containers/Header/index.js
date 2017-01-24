import { connect } from 'react-redux';
import Header from '../../components/Header';

function mapStateToProps(state, props) {
  return {
    loading: state.activeAPICalls > 0,
    title: props.title,
  };
}

export default connect(mapStateToProps)(Header);
