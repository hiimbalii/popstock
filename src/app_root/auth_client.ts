
export default function getAuthToken() {
  //TODO: no this is not okay no.
  const client_id: string = "613bd20898634fe8a56b61c3827c64e2";
  const client_secret: string = "f2b72cf1c00c4f5d87f237bc03540147";
  const authString = btoa(`${client_id}:${client_secret}`);
  const headers: Headers = new Headers({
    Authorization: "Basic " + authString,
    'Content-Type': "application/x-www-form-urlencoded",
  });
  const data = {
    grant_type: "client_credentials",
  };
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers,
    body: `${encodeURIComponent('grant_type')}=${encodeURIComponent('client_credentials')}`
  })

  // request.post(authOptions, function(error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     var token = body.access_token;
  //   }
  // });
}
