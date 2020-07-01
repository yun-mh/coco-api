export const isAuthenticated = (request) => {
  if (!request.user) {
    throw Error("ログインが必要です");
  }
  return;
};
