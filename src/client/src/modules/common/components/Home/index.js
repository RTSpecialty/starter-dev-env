import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { Tab, Tabs } from 'react-toolbox';
import { Button } from 'react-toolbox/lib/button';
import Header from '../Header';
import Login from './Login';
import Register from './Register';
import style from './style.scss';

const indexes = ['welcome', 'login', 'register'];

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    const index = indexes.findIndex(idx => idx === this.props.params.id);
    this.state = {
      index: (index === -1) ? 0 : index,
    };
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(index) {
    this.setState({ index });
  }

  handleActive(name) {
    const path = `/home/${name}`;
    if (path !== this.props.location.pathname) {
      this.props.router.push(path);
    }
  }

  render() {
    return (
      <div className={style.component}>
        <Header title="Connector Agency Portal" loading={false} />
        <Tabs index={this.state.index} onChange={this.handleTabChange}>
          <Tab label="Welcome" onActive={this.handleActive.bind(this, 'welcome')}>
            <Card className={style.card}>
              <CardTitle
                title="Welcome to the Connector Agency Portal"
                subtitle="Login or Register to continue"
              />
              <CardActions>
                <Link to="about">
                  <Button label="Learn More" />
                </Link>
              </CardActions>
            </Card>
          </Tab>
          <Tab label="Login" onActive={this.handleActive.bind(this, 'login')}>
            <Login {...this.props} />
          </Tab>
          <Tab label="Register" onActive={this.handleActive.bind(this, 'register')}>
            <Register {...this.props} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Home.propTypes = {
  router: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Home;
