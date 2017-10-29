import React, { Component } from 'react';
import { Link } from 'react-router'
import FloatingActionButton from 'material-ui/FloatingActionButton';

import './Modal.css';

export default class ImageView extends Component {
  componentDidMount() {
    const dirs = this.props.location.pathname.split("/");
    const id = dirs[dirs.length -1];
    this.props.showImageView(Number(id));
  }

  render() {
    return (
      <div>
        <div className="modal">
          <div className="modal-overlay">
            <div className="modal-wrap">
              <div className="modal-imgWrap">
                { this.props.image.id
                  ? <img src={this.props.image.imageData} alt=""/>
                  : <p>Sorry, the image is already deleted...</p>
                }
              </div>
            </div>
          </div>
        </div>
        <FloatingActionButton className="actionBtn">
          <Link to={`/`}><i className="material-icons back">keyboard_backspace</i></Link>
        </FloatingActionButton>
      </div>
    );
  }
}
