import { getToken } from "./utils";

const baseUrl = "http://localhost:9000";

export const register = async (data) => {
  const response = await fetch(`${baseUrl}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }

  return responseData;
};

export const login = async (data) => {
  const { username, password } = data;

  const response = await fetch(`${baseUrl}/users/login`, {
    method: "POST",
    headers: new Headers({
      Authorization: `Basic ${btoa(`${username}:${password}`)}`, //btoa is only deprecated in Node.js not in browser environments!
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }

  return responseData;
};

export const getMe = async () => {
  const token = getToken();
  if (!token) {
    throw new Error(`Missing User Token`);
  }
  const response = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`, //Token is required for protected Routes
    }),
  });
  
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(`Status Code: ${response?.status} - ${responseData?.message}`);
  }
  console.log('response:',responseData)
  return responseData;
};

export const getAllDonations = async () => {
  const token = getToken();
  if (!token) {
    throw new Error(`Missing User Token`);
  }
  const response = await fetch(`${baseUrl}/donations/`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`, //Token is required for protected Routes
    }),
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }
  return responseData;
};

export const getAllNonprofits = async () => {
  const token = getToken();
  if (!token) {
    throw new Error(`Missing User Token`);
  }
  const response = await fetch(`${baseUrl}/users/nonprofits/`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`, //Token is required for protected Routes
    }),
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }
  return responseData;
};

export const postDonation = async (data) => {
  const response = await fetch(`${baseUrl}/donations/new`, {
    method: "POST",
    //headers: { "Content-Type": `multipart/form-data` },
    body: data
  });

  const responseData = await response.json();
  
  console.log(responseData)
  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }
  
  return responseData;
};
export const postEvent = async (data) => {
  const response = await fetch(`${baseUrl}/events/new`, {
    method: "POST",
    //headers: { "Content-Type": `multipart/form-data` },
    body: data
  });

  const responseData = await response.json();
  
  console.log(responseData)
  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }
  
  return responseData;
};


