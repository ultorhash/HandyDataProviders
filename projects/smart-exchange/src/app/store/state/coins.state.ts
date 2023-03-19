import { Injectable } from '@angular/core';
import {
  State,
  Action,
  StateContext,
  Selector
} from '@ngxs/store';
import { CoinDto } from '../../dtos';
import { CoinLabel } from '../../types';
import { ensure } from '../../utils';
import { ChangeSelectedCoin, UpdateCoins } from '../actions/coins.actions';

export class CoinsStateModel {
  coins: CoinDto[] = [];
  selected: CoinLabel = {} as CoinLabel;
}

@State<CoinsStateModel>({
  name: 'coin',
  defaults: {
    coins: [],
    selected: {
      id: 'bitcoin',
      name: 'Bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
    }
  }
})
@Injectable({
  providedIn: "root"
})
export class CoinsState {
  @Selector()
  static getCoins(state: CoinsStateModel): CoinDto[] {
    return state.coins;
  }

  @Selector()
  static getSelected(state: CoinsStateModel): CoinLabel {
    return state.selected;
  }

  @Action(UpdateCoins)
  update({ patchState }: StateContext<CoinsStateModel>, { payload }: UpdateCoins): void {
    patchState({
      coins: payload
    });
  }

  @Action(ChangeSelectedCoin)
  changeSelected(
    { getState, patchState }: StateContext<CoinsStateModel>,
    { payload }: ChangeSelectedCoin
  ): void {
    const { coins } = getState();
    const coin = ensure(coins.find(c => c.id === payload));
    const coinLabel: CoinLabel = {
      id: coin.id,
      name: coin.name,
      image: coin.image
    }

    patchState({
      selected: coinLabel
    })
  }
}
