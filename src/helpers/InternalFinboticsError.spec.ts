import { InternalFinboticsError } from '.';

describe('InternalFinboticsError', () => {
  it('should return a normal error object', () => {
    const error = new InternalFinboticsError('Test Error', {
      statusCode: 400,
      errorReason: 'Bad Request',
      metadata: { info: 'Additional info' },
    });

    console.log(error.message);

    expect(error.errors).toEqual({
      message: 'Test Error',
      statusCode: 400,
      errorReason: 'Bad Request',
      metadata: { info: 'Additional info' },
    });
  });
});
