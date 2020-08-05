import { CreateUserResult } from "../../redux/tasks/user/create.user.task";
import { ApiResponse } from "../../types/api/api.response.interface";

export const isCreateUserResultValid = (
  result: ApiResponse<CreateUserResult>
) => result.payload;

export const isEmailAlreadyInUse = (error: any) =>
  error.response && error.response.status && error.response.status === 401;
