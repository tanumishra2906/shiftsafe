export type AuthActionState = {
  message?: string;
  success?: boolean;
  showLoginLink?: boolean;
  fieldErrors?: Record<string, string[] | undefined>;
};
