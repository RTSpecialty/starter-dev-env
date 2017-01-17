import React from 'react';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import App from '../../components/App';

function mapStateToProps(state, props) {
  return {
    children: props.children,
    toastr: <ReduxToastr progressBar position="bottom-right" />,
  };
}

export default connect(mapStateToProps)(App);
