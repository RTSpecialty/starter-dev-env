import React, { Component } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { Tab, Tabs } from 'react-toolbox';
import { Button } from 'react-toolbox/lib/button';
import Header from '../Header';
import Login from './Login';
import Register from './Register';
import style from './style.scss';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(index) {
    this.setState({ index });
  }

  render() {
    return (
      <div className={style.component}>
        <Header title="Connector Agency Portal" loading={false} />
        <Tabs index={this.state.index} onChange={this.handleTabChange}>
          <Tab label="Welcome">
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
          <Tab label="Login"><Login /></Tab>
          <Tab label="Register"><Register /></Tab>
        </Tabs>
      </div>
    );
  }
}

export default Home;
