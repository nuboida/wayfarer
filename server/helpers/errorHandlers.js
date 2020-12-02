const getErrorMessage = (err) => {
  let message = '';
  if (err.status === 404) {
    message = 'Route not found';
  } else if (err.detail) {
    message = err.detail;
  } else if (err.message) {
    message = err.message;
  } else {
    message = 'Something went wrong';
  }
  return message;
};

export default getErrorMessage;
