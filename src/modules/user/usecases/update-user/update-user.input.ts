import { UserRequest } from '../../entrypoints/request/user.request';

export type UpdateUserInput = {
  id: number;
  user: UserRequest;
};
