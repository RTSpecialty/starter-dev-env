import React from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Header from '../../Header';
import style from './style.scss';

const About = () => (
  <div className={style.component}>
    <Header title="About" loading={false} />
    <Card className={style.card}>
      <CardTitle
        title="About"
        subtitle="This application uses React, Redux, React Router and a variety of other helpful libraries."
      />
      <CardActions>
        <Link to="/">
          <Button label="Home" />
        </Link>
      </CardActions>
    </Card>
  </div>
);

export default About;
