import {PortfolioAction} from '../actions/portfolioActions';
import {Share} from '../../common/types/share';
// TODO: Remove nanoid to make funct pure
import {nanoid} from 'nanoid';
import {Reducer} from 'redux';

export interface PortfolioState {
  wallet: number;
  portfolio: Share[];
}

const createInitialState = (): PortfolioState => {
  return {
    wallet: JSON.parse(localStorage.getItem('wallet') || '1000'),
    portfolio: JSON.parse(localStorage.getItem('portfolio') || '[]'),
  };
};

export const portfolioReducer: Reducer<PortfolioState, PortfolioAction> = (
  state: PortfolioState = createInitialState(),
  action: PortfolioAction,
) => {
  if (action.type === 'buy') {
    const grandSum = action.payload.price * action.payload.quantity;
    if (state.wallet < grandSum) return state;
    // it would be more elegant if its the same song for the same price it'd stack
    return {
      ...state,
      portfolio: [
        {
          shareId: nanoid(),
          buyPrice: action.payload.price,
          quantity: action.payload.quantity,
          trackData: action.payload.trackData,
        },
        ...state.portfolio,
      ],
      wallet: state.wallet - grandSum,
    };
  } else if (action.type === 'sell') {
    return {
      ...state,
      portfolio: state.portfolio
        .map(share => {
          if (share.shareId !== action.payload.shareId) return share;
          if (share.quantity < action.payload.quantity) return share;
          return {...share, quantity: share.quantity - action.payload.quantity};
        })
        .filter(share => share.quantity > 0),
      wallet: state.wallet + action.payload.sellPrice * action.payload.quantity,
    };
  }
  return state;
};
