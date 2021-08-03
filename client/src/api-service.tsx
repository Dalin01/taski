import axios from 'axios';

type Config = {
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
};

export async function loginApiService(
  path: string,
  details: { email: string; password: string },
  config: Config
): Promise<any> {
  return await axios.post(path, details, config);
}
