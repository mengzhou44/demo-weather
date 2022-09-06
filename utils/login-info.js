export let loginInfo = null;

export const setLoginInfo = (firstName) => {
  loginInfo = {
    firstName
  };
};

export const clearLoginInfo = () => {
  loginInfo = null;
};
