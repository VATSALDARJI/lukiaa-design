import AxiosInstance from './AxiosInstance';

export const getOutfits = async () => {
  try {
    const res = await AxiosInstance.get('masters/occasions/female');
    return res.data.data || [];
  } catch (error) {
    throw error;
  }
};
