import AxiosInstance from './AxiosInstance';

type SignupPayload = {
  nickName: string;
  email: string;
  password: string;
};

export const SignupApi = async (payload: SignupPayload) => {
  console.log(payload, 'payload');

  try {
    const response = await AxiosInstance.post('signup', payload); // ✅ Pass payload here
    return response.data;
  } catch (error) {
    throw error;
  }
};

type LoginApiType = {
  identifier: string;
  password: string;
};

export const LoginApi = async (payload: LoginApiType) => {
  console.log(payload, 'payload');

  try {
    const response = await AxiosInstance.post('login', payload); // ✅ Pass payload here
    return response.data;
  } catch (error) {
    throw error;
  }
};

type OtpVerificationApiType = {
  userId: number;
  otp: string;
};

export const OtpVerificationApi = async (payload: OtpVerificationApiType) => {
  console.log(payload, 'payload');

  try {
    const response = await AxiosInstance.post('verify/otp', payload); // ✅ Pass payload here
    return response.data;
  } catch (error) {
    throw error;
  }
};
