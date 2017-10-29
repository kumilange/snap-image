export function getImages(images) {
  return async dispatch => {
    try {
      const images = await (await fetch('/images')).json();

      dispatch({
        type: 'GET_IMAGES',
        images
      })
    } catch (err) {
      console.log(err.message)
    }
  }
}


export function showImageView(id) {
  return async dispatch => {
    try {
      const image = await (await fetch(`/images/image/${id}`)).json();

      dispatch({
        type: 'SHOW_IMAGE_VIEW',
        image
      })
    } catch (err) {
      console.log(err.message)
    }
  }
}

export function uploadImage(image) {
  return async dispatch => {
    try {
      const imageData = await (await fetch('/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image
        })
      })).json();

      dispatch({
        type: 'UPLOAD_IMAGE',
        payload: imageData
      })
    } catch (err) {
      console.log(err.message)
    }
  }
}

export function deleteImage(image) {
  return async dispatch => {
    try {
      const deletedImage = await (await fetch('/images', {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(image)
      })).json();

      dispatch({
        type: 'DELETE_IMAGE',
        id: deletedImage.id
      })
    } catch (err) {
      console.log(err.message)
    }
  }
}
