import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

const initialState = {
  images: [],
  image: {
    id: null,
    imageData: null
  },
  isEmpty: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_IMAGE':
      return uploadImage(state, action);
    case 'GET_IMAGES':
      return getImages(state, action.images);
    case 'DELETE_IMAGE':
      return deleteImage(state, action.id)
    case 'SHOW_IMAGE_VIEW':
      return {
        ...state,
        ...state.image,
        image: action.image
      }
    default:
      return state;
  }
}

const uploadImage = (state, action) => {
  return {
    ...state,
    images: [
      ...state.images,
      action.payload
    ],
    isEmpty: false
  }
}

const getImages = (state, images) => {
  const copyImages = Array.prototype.concat(state.images);

  if(state.images.length === 0) {
    return {
      ...state,
      images: [
        ...images
      ]
    }
  } else {
    for(let i = 0; i < copyImages.length; i++) {
      const index = images.findIndex(image=> image.id === copyImages[i].id);
      if(index === -1) {
        copyImages.splice(i, 1);
      }
    }

    return {
      ...state,
      images: [
        ...images
      ],
      isEmpty: images.length === 0
    }
  }
}

const deleteImage = (state, id) => {
  const copyImages = Array.prototype.concat(state.images);
  const index = copyImages.findIndex(image=> image.id === id);
  copyImages.splice(index, 1);

  return {
    ...state,
    images: [
      ...copyImages
    ],
    isEmpty: copyImages.length === 0
  }
}

const rootReducer = combineReducers({
  reducer,
  routing
})

export default rootReducer;
