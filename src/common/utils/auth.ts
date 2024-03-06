// Not tested as it is following the spotify guide almost step by step
const generateRandomString = (length: number) => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

export const codeVerifier = generateRandomString(64);

const sha256 = (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};
const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};
const codeChallenge = async () => {
  const hashed = await sha256(codeVerifier);
  return base64encode(hashed);
};

const clientId = '36f88c9426684bd6ab5499e41b6ac97b';
const redirectUri = 'http://localhost:3000/';

export const startAuth = async () => {
  const scope =
    'user-read-private user-read-email user-library-read user-top-read user-read-recently-played';
  const authUrl = new URL('https://accounts.spotify.com/authorize');

  // generated in the previous step
  window.localStorage.setItem('code_verifier', codeVerifier);

  const codeChallangeString = await codeChallenge();

  const params = {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallangeString,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};

export const getTokenFromParams = async () => {
  if (localStorage.getItem('access_token')) return Promise.resolve(undefined);
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (!code) return Promise.resolve(undefined);

  // stored in the previous step
  const codeVerifier = localStorage.getItem('code_verifier') ?? undefined;

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    } as Record<string, string>),
  };

  const body = await fetch('https://accounts.spotify.com/api/token', payload);
  const response = await body.json();
  return response.access_token as string | undefined;
};

export const getAccessToken: () => string | null = () => {
  return localStorage.getItem('access_token');
};

export const setAccessToken = (token: string) => {
  return localStorage.setItem('access_token', token);
};
