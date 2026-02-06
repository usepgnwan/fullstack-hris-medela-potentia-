import React from 'react';
 
 
const Login = React.lazy(() => import('../pages/Index')); 
const Platform = React.lazy(() => import('../pages/Home')); 
const History = React.lazy(() => import('../pages/History')); 
const Clockin = React.lazy(() => import('../pages/Clockin')); 
 
 
export interface MenuItem {
  id: string;
  path: string;
  name: string; 
  component:any; 
  roles?: string[];
  permissions?: string[];
  children?: MenuItem[];
  hidden?: boolean; 
  guest?: boolean; 
}
 
export const menuConfig: MenuItem[] = [
  {
    id: 'login',
    path: '/',
    name: 'Login', 
    component: Login, 
    guest: true
  },
  {
    id: 'home',
    path: '/home',
    name: 'platform', 
    component: Platform, 
    guest: false
  },
  {
    id: 'history',
    path: '/history',
    name: 'history', 
    component: History, 
    guest: false
  },
  {
    id: 'clockin',
    path: '/clockin',
    name: 'clockin', 
    component: Clockin, 
    guest: false
  },
 
];