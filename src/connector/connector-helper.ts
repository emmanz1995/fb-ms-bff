import axios, { AxiosError } from 'axios';
import { InternalFinboticsError } from '../helpers';

export default async (options: {
  url: string;
  method: string;
  body?: object;
}) => {
  const headerOpts = {
    'content-type': 'application/json',
    Accept: 'application/json',
  };
  let data;

  try {
    data = (
      await axios({
        url: options.url,
        method: options.url || 'GET',
        headers: headerOpts,
      })
    ).data;
  } catch (err: unknown) {
    console.log('Error: ', err);
    throw InternalFinboticsError.setAxiosError(err as AxiosError);
  }

  return data;
};
 