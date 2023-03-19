import { Injectable } from '@angular/core';
import {
  State,
  Action,
  StateContext,
  Selector
} from '@ngxs/store';
import { CoinDto } from '../../dtos';
import { ensure } from '../../utils';
import { SetSelectedCoin, UpdateCoins } from '../actions/coins.actions';

export class CoinsStateModel {
  coins: CoinDto[] = [];
  selected: CoinDto = {} as CoinDto;
}

@State<CoinsStateModel>({
  name: 'coin',
  defaults: {
    coins: [],
    selected: {} as CoinDto
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
  static getSelected(state: CoinsStateModel): CoinDto {
    return state.selected;
  }

  @Action(UpdateCoins)
  update({ patchState }: StateContext<CoinsStateModel>, { payload }: UpdateCoins): void {
    patchState({
      coins: payload
    });
  }

  @Action(SetSelectedCoin)
  changeSelected(
    { getState, patchState }: StateContext<CoinsStateModel>,
    { payload }: SetSelectedCoin
  ): void {
    const { coins } = getState();
    const coin = ensure(coins.find(c => c.id === payload));

    patchState({
      selected: coin
    })
  }
}
