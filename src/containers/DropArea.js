import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DropArea from '../components/DropArea';
import { uploadImage, getImages, deleteImage } from '../actions/index';

const mapStateToProps = state => {
  return {
    images: state.reducer.images,
    isEmpty: state.reducer.isEmpty
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    uploadImage,
    getImages,
    deleteImage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DropArea);
