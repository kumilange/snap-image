import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import { Card, CardMedia, CardActions } from 'material-ui/Card';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome from 'react-fontawesome';

import './DropArea.css';
import './Card.css';

class DropArea extends Component {
  componentDidMount() {
    setInterval(this.props.getImages, 1000);
  }

  dragover_handler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    this.droparea.classList.add('isEnlarged');
  }

  drop_handler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.droparea.classList.remove('isEnlarged');

    let files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.match(/image.*/)) {
        const reader = new FileReader();
        reader.onload = (e2) => {
          const image = e2.target.result;
          this.props.uploadImage(image);
        }
        reader.readAsDataURL(files[i]); // start reading the file data.
      }
    }
  }

  downloadImg = (image, idx) => {
    const blob = this.base64toBlob(image);
    this.saveBlob(blob, `snapimage${idx + 1}.png`);
  }

  saveBlob = (blob, file)=> {
    // IE Edge
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveOrOpenBlob(blob, file);
    } else {
      const url = (window.URL || window.webkitURL);
      const data = url.createObjectURL(blob);
      // TODO possibly refactor?
      const e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      const a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
      a.href = data;
      a.download = file;
      a.dispatchEvent(e);
    }
  }

  base64toBlob = (base64) => {
    const bin = atob(base64.replace(/^.*,/, ''));
    let buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }
    try{
      var blob = new Blob([buffer.buffer], {
        type: 'image/png'
      });
    } catch (e){
      return false;
    }
    return blob;
  }

  render() {
    return (
      <main className="main">
        {this.props.isEmpty
          // TODO refactor condition
          ? <div
            id="dropArea"
            className="isEmpty"
            onDrop={this.drop_handler}
            onDragOver={this.dragover_handler}
            ref={(droparea) => { this.droparea = droparea; }}>
            <span className="dragTitle">DRAG IMAGES HERE!</span>
          </div>
          : <div
            id="dropArea"
            onDrop={this.drop_handler}
            onDragOver={this.dragover_handler}
            ref={(droparea) => { this.droparea = droparea; }}>
            <span className="dragTitle">DRAG IMAGES HERE!</span>
          </div>
        }
        <div id="board">
          <ReactCSSTransitionGroup transitionName="card" transitionAppear={true} transitionAppearTimeout={100} transitionEnterTimeout={100} transitionLeaveTimeout={100}>
            {this.props.images.map((image, idx) => {
              return (
                <Card key={idx}>
                  <i className="material-icons delete" onClick={()=> this.props.deleteImage(image)}>remove_circle_outline</i>
                  <Link to={`/image/${image.id}`} className="cardOverlay">
                    <CardMedia>
                      <div className="thumnail"
                      style={{ 'backgroundImage': `url(${image.imageData})`}}>
                      </div>
                    </CardMedia>
                  </Link>
                  <CardActions>
                    <div className="iconWrapper">
                      <div className="snsList">
                        <a target="_blank" href={`https://twitter.com/share?url=http://localhost:3000/image/${image.id}`} className="iconLink">
                          <FontAwesome
                            className='snsIcon'
                            name='twitter'
                            style={{ color: 'rgba(85, 172, 238, 1)' }}
                          />
                        </a>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/image/${image.id}`} className="iconLink">
                          <FontAwesome
                            className='snsIcon'
                            name='facebook'
                            style={{ color: 'rgba(48, 80, 151, 1)' }}
                          />
                        </a>
                        <a target="_blank" href={`https://plus.google.com/share?url=http://localhost:3000/image/${image.id}`} className="iconLink">
                          <FontAwesome
                            className='snsIcon'
                            name='google-plus'
                            style={{ color: 'rgba(219, 74, 57, 1)' }}
                          />
                        </a>
                      </div>
                      <i className="material-icons download" onClick={()=> this.downloadImg(image.imageData, idx)}>vertical_align_bottom</i>
                    </div>
                  </CardActions>
                </Card>
              )}
            )}
          </ReactCSSTransitionGroup>
        </div>
      </main>
    );
  }
}

DropArea.propTypes = {
  images: PropTypes.array.isRequired,
  uploadImage: PropTypes.func.isRequired,
  getImages: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired
}

export default DropArea;
