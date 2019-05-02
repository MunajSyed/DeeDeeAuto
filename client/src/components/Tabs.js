import React from 'react';

import { Tab } from '@material-ui/core';
import {
  PersonPin as AboutUsIcon,
  DirectionsCar as CarIcon,
  ContactPhone as ContactIcon,
} from '@material-ui/icons';

export const Tabs = [
  <Tab key='car' label='Cars' value='car' icon={<CarIcon />} />,
  <Tab key='contact' label='Contact Us' value='contact' icon={<ContactIcon />} />,
  <Tab key='about' label='About Us' value='about' icon={<AboutUsIcon />} />,
  <Tab key='login' label='Login' value='login' icon={<AboutUsIcon />} />,
  <Tab key='logout' label='Logout' value='logout' icon={<AboutUsIcon />} />,

];

export function handleTabChange (event, value) {
  console.group('CohortTabs::handleTabChange');
  console.log('this:', this);
  console.groupEnd();
  const { history } = this.props;
  switch (value) {
    case 'car': return history.push({ pathname: '/cars' });
    case 'about': return history.push({ pathname: '/about' });
    case 'login': return history.push({ pathname: '/login' });
    case 'contact': return history.push({ pathname: '/contact' });
    case 'logout': return history.push({ pathname: '/logout' });

    default: {}
  }
}
