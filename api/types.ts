import { STATUS } from "@/constants/constant";

//#region Authentication
export interface UserLoginInputModel {
  email: string;
  password: string;
}

export interface UserLoginResponseModel {
  id: string;
  role: number;
  token: string;
  email: string;
  refreshToken: string;
}

export interface CreateNewPasswordInputModel {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

//#endregion

//#region User
export interface UserResponseModel {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneCode: string;
  role: number;
  avatar?: string;
}

//#endregion

//#region Thing

export interface ILocation {
  name: string;
  address: string;
  longitude: number;
  latitude: number;
}

export interface ICertificate {
  certId: string;
  certArn: string;
}

export interface IManager {
  userId: string;
  isOwner: boolean;
  id?: string;
  firstName: string;
  lastName: string;
  information: string;
  type: string;
  parameterStandards: IParameterStandardModel[];
}

export interface IThreshold {
  name: string;
  color: string;
  min: number;
  max: number;
}

export interface IParameterStandardModel {
  _id?: string;
  name: string;
  unit: string;
  weight: number;
  thresholds: IThreshold[];
}

export interface ResponseDeviceModelDTO {
  _id: string;
  name: string;
  information: string;
  type: string;
  parameterStandards: IParameterStandardModel[];
}

export interface IDevice {
  _id: string;
  name: string;
  status?: STATUS;
  model: ResponseDeviceModelDTO;
  parameterStandards: IParameterStandardModel[];
  parameterStandardDefault: boolean;
}

export interface IThingItem {
  _id?: string;
  createdOn?: string;
  updatedOn?: string;
  name: string;
  information: string;
  location: ILocation;
  status: STATUS;
  managers: IManager[];
  certificate: ICertificate;
  devices: IDevice[];
}

export interface ThingResponseModel {
  paginatedResults?: IThingItem[];
  current?: number;
  limit?: number;
  page?: number;
  total?: number;
}

//#endregion