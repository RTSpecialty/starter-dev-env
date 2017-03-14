
import React, { PropTypes } from 'react';
import { List, ListSubHeader, ListItem } from 'react-toolbox';
import classnames from 'classnames';
import { components } from '../../../components';
import style from './style.scss';

const MainNav = ({ className, router, auth, completed }) => {
  const drawerItems = Object.keys(components).map((key) => {
    const isActive = router.isActive(components[key].path);
    const isAuthorized = auth.agency && auth.agency.includes(key);
    const isCompleted = completed.agency && completed.agency.includes(key);
    return (
      <ListItem
        key={key}
        caption={components[key].caption}
        legend={(isCompleted) ? '✔ Completed' : null}
        className={classnames(style.item, { [style.active]: isActive })}
        disabled={!isAuthorized}
        selectable
        onClick={() => { router.push(components[key].path); }}
      />
    );
  });

  return (
    <aside className={classnames(style.root, { [className]: className })}>
      <List className={style.list} selectable ripple>
        <ListSubHeader caption="Agency Onboarding" />
        {drawerItems}
      </List>
      <footer className={style.footer}>
        <span className={style.footerLegend}>RSG Agent Portal © 2017</span>
      </footer>
    </aside>
  );
};

MainNav.propTypes = {
  className: PropTypes.string,
  router: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  completed: PropTypes.object.isRequired,
};

MainNav.defaultProps = {
  className: '',
};

export default MainNav;
