const getErrorMessage = (err) => {
  let message = '';
  if (err.status === 404) {
    message = 'Route not found';
  } else {
    message = 'Something went wrong';
  }
  return message;
};

export default getErrorMessage;
