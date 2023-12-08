import {buyShare, sellShare} from './portfolioActions';
import {shareMock, trackMock} from '../../common/utils/test-utils';

describe('sellShare()', () => {
  it('should generate correct action', () => {
    const result = sellShare(shareMock, 12, 3);
    expect(result).toEqual({
      type: 'sell',
      payload: {shareId: shareMock.shareId, sellPrice: 12, quantity: 3},
    });
  });
});

describe('buyShare()', () => {
  it('should generate correct action', () => {
    const result = buyShare(trackMock, 444);
    expect(result).toEqual({
      type: 'buy',
      payload: {
        quantity: 444,
        price: trackMock.popularity,
        trackData: trackMock,
      },
    });
  });
  it('should not let price be 0', () => {
    const mockTrackZeroPopularity = {...trackMock, popularity: 0};
    const result = buyShare(mockTrackZeroPopularity, 444);
    expect(result).toEqual({
      type: 'buy',
      payload: {
        quantity: 444,
        price: 1,
        trackData: mockTrackZeroPopularity,
      },
    });
  });
});
