import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CoinDto } from '../../dtos';
import { UpdateCoins } from '../actions/coins.action';

export class CoinsStateModel {
  coins: CoinDto[] = [];
}

@State<CoinsStateModel>({
  name: 'coins',
  defaults: {
    coins: []
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

  @Action(UpdateCoins)
  update({ patchState }: StateContext<CoinsStateModel>, { payload }: UpdateCoins) {
    patchState({
      coins: payload
    });
  }
}
