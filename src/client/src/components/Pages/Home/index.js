import React from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Header from '../../Header';
import style from './style.scss';

const Home = () => (
  <div className={style.component}>
    <Header title="Home" loading={false} />
    <Card className={style.card}>
      <CardTitle
        title="Administration"
        subtitle="React, Redux and React Router for ES6"
      />
      <CardActions>
        <Link to="about">
          <Button label="Learn More" />
        </Link>
      </CardActions>
    </Card>
  </div>
);

export default Home;
