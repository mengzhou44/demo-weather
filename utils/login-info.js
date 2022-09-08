export const setLoginInfo = (firstName) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('login', firstName);
  }
};

export const getLoginInfo = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('login');
  }
  return null;
};

export const clearLoginInfo = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('login');
  }
};
