import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/courses';
import { Courses } from '../../components';

function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
