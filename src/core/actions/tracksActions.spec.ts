import {closeTrack, fetchTracks, openTrack} from './tracksActions';
import getTracks from '../../clients/tracks';
import {trackMock} from '../../common/utils/test-utils';

jest.mock('../../clients/tracks', () => jest.fn());
const mockedGetTracks = getTracks as jest.MockedFunction<typeof getTracks>;

describe('fetchTracks()', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => jest.resetAllMocks());
  it('should start fetching tracks', () => {
    mockedGetTracks.mockImplementation(() => new Promise(() => {}));
    fetchTracks()(
      mockDispatch,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      () => ({app: {access_token: 'auth'}}) as unknown as any,
    );
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      type: 'tracks/load',
    });
  });
  it('should load tracks if fetch was successful', async () => {
    mockedGetTracks.mockResolvedValue([trackMock]);
    fetchTracks()(
      mockDispatch,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      () => ({app: {access_token: 'auth'}}) as unknown as any,
    );

    await new Promise(process.nextTick); //more reliable version of using setTimeout(..., 0) to wait for the eventloop

    expect(mockDispatch).toBeCalledTimes(2);
    expect(mockDispatch).toBeCalledWith({
      type: 'tracks/recieve',
      payload: {tracks: [trackMock]},
    });
  });
  it.todo('should handle error');
});

describe('openTrack()', () => {
  it('should create correct action', () => {
    expect(openTrack(trackMock)).toEqual({
      type: 'tracks/open',
      payload: {track: trackMock},
    });
  });
});
describe('closeTrack()', () => {
  it('should create correct action', () => {
    expect(closeTrack()).toEqual({
      type: 'tracks/open',
      payload: {track: null},
    });
  });
});
