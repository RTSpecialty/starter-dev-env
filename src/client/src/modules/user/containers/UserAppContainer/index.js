import React from 'react';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.css';
import UserApp from '../../components/UserApp';

const wrapper = props => (
  <div>
    <UserApp {...props} />
    <ReduxToastr position="bottom-right" progressBar />
  </div>
);

function mapStateToProps(state, props) {
  return {
    children: props.children,
    user: state.user,
  };
}

export default connect(mapStateToProps)(wrapper);
