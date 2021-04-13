export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};

export const getLocation = () => {
  return JSON.parse(localStorage.getItem("location"));
};

export const setLocation = (location) => {
  localStorage.setItem("location", JSON.stringify(location));
};

export const deleteLocation = () => {
  localStorage.removeItem("location");
};
