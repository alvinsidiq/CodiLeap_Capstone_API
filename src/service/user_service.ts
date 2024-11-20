export const loginUserService = (email: string, password: string) => {
  if (email !== "owner@mail.com" || password !== "secret123") {
    return false;
  }
  return true;
};

