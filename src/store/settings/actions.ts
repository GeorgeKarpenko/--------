import { ActionTree, ActionContext } from 'vuex';

import { RootState } from '../types';
import { Options } from '@/@types'
import { State } from './state';
import { Mutations } from './mutations';
import { SettingsMutationTypes } from './mutation-types';
import { SettingsActionTypes } from './action-types';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [SettingsActionTypes.IMGS](
    { commit }: AugmentedActionContext,
    // payload: Options,
  ): Promise<boolean>,
  [SettingsActionTypes.MUSIC_SELECTION](
    { commit }: AugmentedActionContext,
    // payload: Options,
  ): Promise<boolean>;
  [SettingsActionTypes.UP_DATA](
    { commit }: AugmentedActionContext,
    payload: State,
  ): boolean;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [SettingsActionTypes.IMGS]({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.debug('FETCH_IMGS');
        const imgs:Options = [
          {
            value: '/src/assets/imgs/1.png',
            text: '1.png'
          },
          {
            value: '/src/assets/imgs/2.jpg',
            text: '2.jpg'
          },
          {
            value: '/src/assets/imgs/3.jpg',
            text: '3.jpg'
          },
          {
            value: '/src/assets/imgs/4.jpeg',
            text: '4.jpeg'
          },
          {
            value: '/src/assets/imgs/5.jpg',
            text: '5.jpg'
          },
          {
            value: '/src/assets/imgs/6.jpg',
            text: '6.jpg'
          },
        ];
        commit(SettingsMutationTypes.SET_IMGS, imgs);
        resolve(true)
      }, 500);
    });
  },
  async [SettingsActionTypes.MUSIC_SELECTION]({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.debug('MUSIC_SELECTION');
        const musics:Options = [
          {
            value: '/src/assets/music/1.mp3',
            text: 'Короткая мелодия, которая может быть зациклена'
          },
          {
            value: '/src/assets/music/2.mp3',
            text: 'Музыка для сбора пазла'
          },
          {
            value: '/src/assets/music/3.mp3',
            text: 'Музыка для игр на телефоне или другой платформы'
          },
        ];
        commit(SettingsMutationTypes.SET_MUSIC_SELECTION, musics);
        resolve(true)
      }, 500);
    });
  },
  [SettingsActionTypes.UP_DATA]({ commit }, upData: State) {
    commit(SettingsMutationTypes.SET_STATE, upData);
    return true;
  }
};
