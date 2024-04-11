/* eslint-disable no-throw-literal */
import Cookies from "js-cookie";
// TODO: Add cookie expiry time.
export async function register(authDetails) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      Origin: process.env.CLIENT_ORIGIN
    },
    body: JSON.stringify(authDetails)
  };

  const res = await fetch(`${process.env.REACT_APP_API_URL}register`, options);
  if(!res.ok) {
    throw {message: res.statusText, status: res.status};
  }

  const data = await res.json();
  Cookies.set('token', data.accessToken);
  Cookies.set('user_id', data.user.id)
  return data;
}

export async function login(authDetails) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      Origin: process.env.CLIENT_ORIGIN
    },
    body: JSON.stringify(authDetails)
  };

  const res = await fetch(`${process.env.REACT_APP_API_URL}login`, options);
  if(!res.ok) {
    throw {message: res.statusText, status: res.status};
  }

  const data = await res.json();
  Cookies.set('token', data.accessToken);
  Cookies.set('user_id', data.user.id)
  return data;
}

export function isLoggedIn() {
  const token = Cookies.get('token');
  if(token) {
    return true;
  }
  return false;
}

export async  function getLoggedInUserDetails() {
  if(isLoggedIn()) {
    const token = Cookies.get('token');
    const userId = Cookies.get('user_id');
    const res = await fetch(`${process.env.REACT_APP_API_URL}600/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if(!res) {
      throw {message: res.statusText, status: res.status};
    }

    const data = await res.json();
    return data;
  }
}

export function getSessionData() {
  const token = Cookies.get('token');
  const userId = Cookies.get('user_id');
  return {
    token, 
    userId
  };
}

export function logout() {
  Cookies.remove('token');  
  Cookies.remove('user_id');  
}
