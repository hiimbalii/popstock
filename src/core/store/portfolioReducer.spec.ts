import {PortfolioState, portfolioReducer} from './portfolioReducer';
import {
  shareMock,
  shareMock2,
  trackMock,
  trackMock2,
} from '../../common/utils/test-utils';

const createMockPortfolioState = (): PortfolioState => ({
  wallet: 100,
  portfolio: [],
});
jest.mock('nanoid', () => ({
  nanoid: () => '1',
}));
describe('action: buy', () => {
  it('should add a share to portfolio and subtract price from wallet when successfully buying a track', () => {
    const reducedState = portfolioReducer(createMockPortfolioState(), {
      type: 'buy',
      payload: {trackData: trackMock, quantity: 1, price: trackMock.popularity},
    });
    expect(reducedState.wallet).toBe(100 - trackMock.popularity);
    expect(reducedState.portfolio).toEqual([
      {
        shareId: '1',
        buyPrice: trackMock.popularity,
        quantity: 1,
        trackData: trackMock,
      },
    ]);
  });
  it('should add the correct amount of shares and reduct the correct amount of money when buying multiple tracks', () => {
    const reducedState = portfolioReducer(createMockPortfolioState(), {
      type: 'buy',
      payload: {trackData: trackMock, quantity: 2, price: trackMock.popularity},
    });
    expect(reducedState.wallet).toBe(100 - trackMock.popularity * 2);
    expect(reducedState.portfolio).toEqual([
      {
        shareId: '1',
        buyPrice: trackMock.popularity,
        quantity: 2,
        trackData: trackMock,
      },
    ]);
  });
  it('should be able to buy tracks if there are already tracks in the portfolio', () => {
    const reducedState = portfolioReducer(
      {
        ...createMockPortfolioState(),
        portfolio: [
          {
            shareId: '12',
            buyPrice: trackMock2.popularity,
            quantity: 2,
            trackData: trackMock2,
          },
        ],
      },
      {
        type: 'buy',
        payload: {
          trackData: trackMock,
          quantity: 1,
          price: trackMock.popularity,
        },
      },
    );
    expect(reducedState.wallet).toBe(100 - trackMock.popularity);
    expect(reducedState.portfolio).toEqual([
      {
        shareId: '1',
        buyPrice: trackMock.popularity,
        quantity: 1,
        trackData: trackMock,
      },
      {
        shareId: '12',
        buyPrice: trackMock2.popularity,
        quantity: 2,
        trackData: trackMock2,
      },
    ]);
  });
  it.todo('should stack tracks if the track and the buying price are the same');

  it('should not change the state if the user has less money than the price', () => {
    const reducedState = portfolioReducer(createMockPortfolioState(), {
      type: 'buy',
      payload: {
        trackData: {...trackMock, popularity: 9999},
        quantity: 1,
        price: 9999,
      },
    });
    expect(reducedState.wallet).toBe(100);
    expect(reducedState.portfolio).toHaveLength(0);
  });
});

describe('action: sell', () => {
  it('should remove a share completely and add money to the wallet if all shares are sold', () => {
    const reducedState = portfolioReducer(
      {...createMockPortfolioState(), portfolio: [shareMock]},
      {
        type: 'sell',
        payload: {
          shareId: shareMock.shareId,
          quantity: shareMock.quantity,
          sellPrice: 333,
        },
      },
    );
    expect(reducedState.wallet).toBe(shareMock.quantity * 333 + 100);
    expect(reducedState.portfolio).toHaveLength(0);
  });
  it('should reduce the quantity on a share and add money to the wallet if some shares are sold', () => {
    const reducedState = portfolioReducer(
      {...createMockPortfolioState(), portfolio: [shareMock]},
      {
        type: 'sell',
        payload: {
          shareId: shareMock.shareId,
          quantity: 5,
          sellPrice: 3,
        },
      },
    );
    expect(reducedState.wallet).toBe(100 + 3 * 5);
    expect(reducedState.portfolio).toEqual([
      {...shareMock, quantity: shareMock.quantity - 5},
    ]);
  });
  it('should only modify the correct share', () => {
    const reducedState = portfolioReducer(
      {...createMockPortfolioState(), portfolio: [shareMock, shareMock2]},
      {
        type: 'sell',
        payload: {
          shareId: shareMock.shareId,
          quantity: 5,
          sellPrice: 3,
        },
      },
    );
    expect(reducedState.wallet).toBe(100 + 3 * 5);
    expect(reducedState.portfolio).toEqual([
      {...shareMock, quantity: shareMock.quantity - 5},
      shareMock2,
    ]);
  });

  //TODO these 2 tests fail, but it's larger than what i can fit in the pr
  it('should not change the state if the user has less shares to sell than sold', () => {
    const reducedState = portfolioReducer(
      {
        ...createMockPortfolioState(),
        portfolio: [{...shareMock, quantity: 4}, shareMock2],
      },
      {
        type: 'sell',
        payload: {
          shareId: shareMock.shareId,
          quantity: 5,
          sellPrice: 3,
        },
      },
    );
    expect(reducedState).toBe({
      ...createMockPortfolioState(),
      portfolio: [{...shareMock, quantity: 4}, shareMock2],
    });
  });
  it('should not change the state if the user does not have a share with the correct id', () => {
    const reducedState = portfolioReducer(
      {
        ...createMockPortfolioState(),
        portfolio: [shareMock, shareMock2],
      },
      {
        type: 'sell',
        payload: {
          shareId: 'non-existant',
          quantity: 5,
          sellPrice: 3,
        },
      },
    );
    expect(reducedState).toBe({
      ...createMockPortfolioState(),
      portfolio: [shareMock, shareMock2],
    });
  });
});
