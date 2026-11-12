export type AuthActionState = {
  message?: string;
  success?: boolean;
  fieldErrors?: Record<string, string[] | undefined>;
};
