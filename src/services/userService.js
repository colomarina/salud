const getUser = async () => {
  let user = null
  const loggedUserJSON = window.localStorage.getItem("loggedUser");
  if (loggedUserJSON) {
    user = JSON.parse(loggedUserJSON);
  }
  return await user;
}

export {
  getUser,
}
