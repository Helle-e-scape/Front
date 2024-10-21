export const requestOptions = {
  headers,
};

function headers() {
  return {
    headers: {
      'Accept': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    },
  };
}
