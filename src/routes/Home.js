import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <center>
        <h2>Facial Recognition App</h2>
        <ul style={{ listStyleType: 'none', fontSize: '20px' }}>
          <li>
            <Link to="/train">Train Model</Link>
          </li>
          <li>
            <Link to="/photo">Photo Input</Link>
          </li>
          <li>
            <Link to="/camera">Video Camera</Link>
          </li>
        </ul>
      </center>
    );
  }
}
