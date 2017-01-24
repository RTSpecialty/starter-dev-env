import React from 'react';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.css';
import App from '../../components/App';

const wrapper = props => (
  <div>
    <App {...props} />
    <ReduxToastr position="bottom-right" progressBar />
  </div>
);

function mapStateToProps(state, props) {
  return {
    children: props.children,
  };
}

export default connect(mapStateToProps)(wrapper);
