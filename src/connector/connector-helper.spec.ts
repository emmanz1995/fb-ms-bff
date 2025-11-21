import axios, { AxiosError } from 'axios';
jest.mock('axios');

import connector from './connector-helper';
import { InternalFinboticsError } from '../helpers';

describe('Connector Helper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a successful GET request', async () => {
    const mockData = { data: { json: 'duval' } };
    (axios as unknown as jest.Mock).mockResolvedValue(mockData);

    const response = await connector({
      url: 'https://api.example.com/data',
      method: 'GET',
    });
    expect(response).toEqual(mockData.data);
    expect(axios).toHaveBeenCalledTimes(1);
  });

  it('should throw an InternalFinboticsError on request failure', async () => {
    (axios as unknown as jest.Mock).mockImplementation(() => {
      const axiosError = {
        message: 'Internal Server Error',
        config: { method: 'GET', url: 'https://api.example.com/data' },
        isAxiosError: true,
        response: { status: 500, statusText: 'Failed' },
      } as AxiosError;

      throw InternalFinboticsError.setAxiosError(axiosError);
    });

    await expect(
      connector({
        url: 'https://api.example.com/data',
        method: 'GET',
      })
    ).rejects.toThrow(InternalFinboticsError);

    try {
      await connector({
        url: 'https://api.example.com/data',
        method: 'GET',
      });
    } catch (err: any) {
      expect(err.message).toEqual('Internal Server Error');
      expect(err.errors).toMatchObject({
        message: 'Internal Server Error',
        isAxiosError: true,
        statusCode: 500,
      });
      expect(axios).toHaveBeenCalledTimes(2);
    }
  });
});
