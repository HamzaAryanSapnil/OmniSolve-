const ROUTES = {
  HOME: "/",
  SIGNUP: "/sign-up",
  SIGNIN: "/sign-in",
  PROFILE: (id: string) => `/profile/${id}`,
  TAGS: (id: string) => `/tags/${id}`,
};

export default ROUTES;
