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
