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
export const getEventsByUserId = async (id) => {
  const token = getToken();
  if (!token) {
    throw new Error(`Missing User Token`);
  }
  const response = await fetch(`${baseUrl}/events/${id}`, {
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
export const getDonationsByEventId = async (id) => {
  const token = getToken();
  if (!token) {
    throw new Error(`Missing User Token`);
  }
  const response = await fetch(`${baseUrl}/donations/event/${id}`, {
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
export const getMyEvents = async (id) => {
  const token = getToken();
  if (!token) {
    throw new Error(`Missing User Token`);
  }
  const response = await fetch(`${baseUrl}/events/my/${id}`, {
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
export const getEventById = async (id) => {
  const token = getToken();
  if (!token) {
    throw new Error(`Missing User Token`);
  }
  const response = await fetch(`${baseUrl}/events/id/${id}`, {
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
  
  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }
  
  return responseData;
};
export const deleteMyEvent = async (id) => {
  const response = await fetch(`${baseUrl}/events/my/del/${id}`, {
    method: "DELETE",
    //headers: { "Content-Type": `multipart/form-data` },
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }
  
  return responseData;
};
export const updateEvent = async (data) => {
  const response = await fetch(`${baseUrl}/events/my/update/`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
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
export const requestDonationForEvent = async (data) => {
  const response = await fetch(`${baseUrl}/pending/request/`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(data)
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }
  
  return responseData;
};
export const getMyDonations = async (id) => {
  const token = getToken();
  if (!token) {
    throw new Error(`Missing User Token`);
  }
  const response = await fetch(`${baseUrl}/donations/my/${id}`, {
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
export const getRequestsByDonationId = async (id) => {
  const token = getToken();
  if (!token) {
    throw new Error(`Missing User Token`);
  }
  const response = await fetch(`${baseUrl}/pending/${id}`, {
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
export const deleteMyDonation = async (id) => {
  const response = await fetch(`${baseUrl}/donations/my/del/${id}`, {
    method: "DELETE",
    //headers: { "Content-Type": `multipart/form-data` },
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }
  
  return responseData;
};
export const updateDonation = async (data) => {
  const response = await fetch(`${baseUrl}/donations/my/update/`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
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
export const acceptDonationRequest = async (id, data) => {
  const response = await fetch(`${baseUrl}/donations/accept/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
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
