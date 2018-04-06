/* src/components/Layout.jsx */
/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

type Props = {
  children: React.Node,
};

const Layout = (props: Props) => (
  <div className="container" id="layout-container">
    {props.children}
    <footer className="text-center">
      Made with <span role="img" aria-label="love">🌺</span>  by <a href="http://www.github.com/jeanbeanie" rel="noopener noreferrer" target="_blank">Jean</a>
    </footer>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
