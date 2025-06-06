import AxiosInstance from './AxiosInstance';

// types/api.ts or define locally
export interface OutfitRequestPayload {
  occasionType: string;
  timeOfEvent: string;
  seasonWeather: string;
  preferredStyle: string;
  budget: string;
  comfortLevel: string;
}

export interface OutfitItem {
  id: string;
  name: string;
  imageUrl: string;
  tags: string[];
  // Add more fields depending on what your API returns
}

export interface OutfitResponse {
  data: OutfitItem[];
}

export const getOutfits = async (
  data: OutfitRequestPayload,
): Promise<OutfitItem[]> => {
  try {
    const res = await AxiosInstance.post('/ai-engine/search/outfits/', data);
    return res.data.data || [];
  } catch (error) {
    console.error('getOutfits error:', error);
    throw error;
  }
};

export const getOutfitsImage = async (url: string) => {
  try {
    const res = await AxiosInstance.post('ai-engine/generate/image/', url);
    return res.data.data || [];
  } catch (error) {
    console.error('get generate error:', error);
    throw error;
  }
};
