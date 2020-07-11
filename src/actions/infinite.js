function setImages(payLoad) {
  return {type: 'APPEND_IMAGES', payLoad};
}

export function getImages(page) {
  return function (dispatch) {
    dispatch({type: 'TOGGLE_LOADING'});
    const url = 'https://picsum.photos/v2/list?page=' + page + '&limit=6';
    return fetch(url, {
      method: 'GET',
      headers: {
        // eslint-disable-next-line prettier/prettier
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.err) {
          throw new Error(json.err);
        }
        dispatch({type: 'TOGGLE_LOADING'});
        return dispatch(setImages(json));
      })
      .catch((err) => {
        dispatch({type: 'TOGGLE_LOADING'});
        // eslint-disable-next-line no-alert
        alert(err.message);
      });
  };
}
