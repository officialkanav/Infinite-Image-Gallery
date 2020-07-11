export const initialState = {
  images: [],
  page: 0,
  loading: false,
};

const append = (state, payLoad) => {
  const newState = {...state};
  newState.images = newState.images.concat(payLoad);
  newState.page = newState.page + 1;
  return newState;
};

const toggle = (state) => {
  const newState = {...state};
  newState.loading = !newState.loading;
  return newState;
};

export default function infinite(state = initialState, action) {
  switch (action.type) {
    case 'APPEND_IMAGES':
      return append(state, action.payLoad);
    case 'TOGGLE_LOADING':
      return toggle(state);
  }
  return state;
}
