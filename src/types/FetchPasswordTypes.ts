export interface VerifyCodeRequest {
  userEmail: string;
  code: string;
}

export interface PasswordChangeRequest {
  new_password: string;
  new_password_confirmation: string;
}
