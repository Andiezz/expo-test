import {
  CreateNewPasswordInputModel,
  ThingResponseModel,
  UserLoginInputModel,
  UserLoginResponseModel,
  UserResponseModel,
} from "./types";
import Axios from "./base";
import { STATUS } from "@/constants/constant";

//#region Authentication
export const loginAPI = async (data: UserLoginInputModel) =>
  Axios.post<UserLoginResponseModel>("/api/auth/login", data, {
    __auth: false,
  });
export const forgotPasswordAPI = async (data: { email: string }) =>
  Axios.post("/api/auth/forgot-password", data, {
    __auth: false,
  });

export const cretaeNewPasswordAPI = async (data: CreateNewPasswordInputModel) =>
  Axios.post("/api/auth/create-new-password", data, {
    __auth: false,
  });

//#endregion

//#region User

export const getUserInfoAPI = async () =>
  Axios.get<UserResponseModel>("/api/user/profile");

//#endregion

//#region Thing
export const getThingListAPI = async (
  pageSize: number,
  pageNumber: number,
  keyword: string,
  userId: string,
) =>
  Axios.get<ThingResponseModel>(
    `/api/thing?limit=${pageSize}&page=${pageNumber}&q=${keyword}&userId=${userId}`
  );
//#endregion
