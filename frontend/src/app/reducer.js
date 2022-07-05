export const test = (state = [], action) => {
  switch (action.type) {
    case "value":
      break;

    default:
      return state;
  }
};

export const test2 = (state = {}, action) => {
  switch (action.type) {
    case "value":
      break;

    default:
      return state;
  }
};

export default test2;
