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
import { ChangeSelected, Update } from '../actions/coin.actions';

export class CoinStateModel {
  coins: CoinDto[] = [];
  selected: CoinLabel = {} as CoinLabel;
}

@State<CoinStateModel>({
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
  static getCoins(state: CoinStateModel): CoinDto[] {
    return state.coins;
  }

  @Selector()
  static getSelected(state: CoinStateModel): CoinLabel {
    return state.selected;
  }

  @Action(Update)
  update({ patchState }: StateContext<CoinStateModel>, { payload }: Update): void {
    patchState({
      coins: payload
    });
  }

  @Action(ChangeSelected)
  changeSelected(
    { getState, patchState }: StateContext<CoinStateModel>,
    { payload }: ChangeSelected
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
