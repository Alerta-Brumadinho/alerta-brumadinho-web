export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (userToken) => {
  localStorage.setItem("token", JSON.stringify(userToken));
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};