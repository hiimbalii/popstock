import getTracks from './tracks';
import {buildServer} from '../common/utils/test-utils';
const {server, expectedResponse} = buildServer();

describe.skip('getTracks', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should get a list of tracks', async () => {
    const res = await getTracks('auth_token', null);
    expect(res).toBe(expectedResponse);
  });
});
