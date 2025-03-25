export type RegisterUserRequest = {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
}

export type UserResponse = {
  username: string;
  name: string;
  token?: string;
};

export type UpdateUserRequest = {
  username?: string;
  name?: string;
  avatar?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export type ChangePasswordRequest = {
  old_password: string;
  new_password: string;
}
