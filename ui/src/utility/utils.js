const sessionTokenName = "session_token";
export const setToken = (token) => {
  if (typeof token !== "string") {
    throw new Error("token must be type: 'string'");
  }
  localStorage.setItem(sessionTokenName, token);
  return token;
};
export const getToken = () => {
  const token = localStorage.getItem(sessionTokenName);
  return token;
};

export const clearToken = () => {
  localStorage.removeItem(sessionTokenName);
  return true;
};
