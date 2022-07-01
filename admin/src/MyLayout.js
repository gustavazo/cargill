import * as React from 'react';
import { Layout } from 'react-admin';
import { Menu } from './menu';
import CustomAppBar from './screens/CustomAppBar';

const MyLayout = (props) => <Layout {...props} appBar={CustomAppBar} menu={Menu}/>;

export default MyLayout;