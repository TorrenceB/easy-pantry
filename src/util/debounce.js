/**
 *  @function debounce
 *  @param { function } callbackFn
 *  @param { number } interval
 *
 *  @returns { function }
 *    @params { ...Object } args
 */

const debounce = (callbackFn, interval) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callbackFn(...args);
    }, interval);
  };
};

export default debounce;
