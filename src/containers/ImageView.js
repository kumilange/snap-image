import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ImageView from '../components/ImageView';
import { showImageView } from '../actions';

const mapStateToProps = state => {
  return {
    image: state.reducer.image
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    showImageView
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageView);
