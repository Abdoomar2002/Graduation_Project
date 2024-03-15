/* eslint-disable import/no-anonymous-default-export */
export default {
  get(key) {
    return new Promise((resolve) => resolve(localStorage.getItem(key)));
  },

  set(key, value) {
    return new Promise((resolve) => resolve(localStorage.setItem(key, value)));
  },
};
