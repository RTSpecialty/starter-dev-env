import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/courses';
import { ManageCourse } from '../../components';

function getCourse(courses, id) {
  const [course] = [...courses.filter(c => c.id === id)];
  return course || { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };
}

function getAuthors(authors) {
  return authors.map(author => ({
    value: author.id,
    label: `${author.firstName} ${author.lastName}`,
  }));
}

function mapStateToProps(state, props) {
  return {
    authors: getAuthors(state.authors),
    course: getCourse(state.courses, props.params.id),
    errors: {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);
