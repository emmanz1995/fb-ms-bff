import axios, { AxiosError } from 'axios';
import { InternalFinboticsError } from '../helpers';

export default async (options: {
  url: string;
  method: string;
  body?: object;
  token?: string;
}) => {
  const headerOpts = {
    'content-type': 'application/json',
    Accept: 'application/json',
    ...(options.token && { Authorization: `Bearer ${options.token}` }),
  };
  let data;

  try {
    data = (
      await axios({
        url: options.url,
        method: options.method || 'GET',
        data: options.body || {},
        headers: headerOpts,
      })
    ).data;
  } catch (err: unknown) {
    console.log('Error: ', err);
    throw InternalFinboticsError.setAxiosError(err as AxiosError);
  }

  return data;
};
