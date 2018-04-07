/* src/components/Layout.jsx */
/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from './Footer';
type Props = {
  children: React.Node,
};

const Layout = (props: Props) => (
  <div className="container" id="layout-container">
    {props.children}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
