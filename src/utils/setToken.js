export const setToken = (token, tokenName = "Auth_Token") => {
  if (token) {
    localStorage.setItem(tokenName, token);
  } else {
    localStorage.removeItem(tokenName);
  }
};
