import { SettingNumber, SettingStrings, Options } from '@/@types';
import { MutationTree } from 'vuex';
import { State } from './state';
import { SettingsMutationTypes } from './mutation-types';

export type Mutations<S = State> = {
    [SettingsMutationTypes.SET_STATE](state: S, payload: {
        tagsColumns: SettingNumber,
        tagsRows: SettingNumber,
        musicVolume: SettingNumber,
        gameVolume: SettingNumber,
        musicSelection: SettingStrings,
        imgs: SettingStrings,
    }): void;
    [SettingsMutationTypes.SET_MUSIC_SELECTION](state: S, payload: Options): void;
    [SettingsMutationTypes.SET_IMGS](state: S, payload: Options): void;
}

export const mutations: MutationTree<State> & Mutations = {
    [SettingsMutationTypes.SET_STATE](state: State, upState: {
        tagsColumns: SettingNumber,
        tagsRows: SettingNumber,
        musicVolume: SettingNumber,
        gameVolume: SettingNumber,
        musicSelection: SettingStrings,
        imgs: SettingStrings,
    }) {
        state.tagsColumns.value = upState.tagsColumns.value;
        state.tagsRows.value = upState.tagsRows.value;
        state.musicVolume.value = upState.musicVolume.value;
        state.gameVolume.value = upState.gameVolume.value;
        state.musicSelection.value = upState.musicSelection.value;
        state.imgs.value = upState.imgs.value;
    },
    [SettingsMutationTypes.SET_IMGS](state: State, options: Options) {
        state.imgs.options = options;
        state.imgs.value = options[0].value;
    },
    [SettingsMutationTypes.SET_MUSIC_SELECTION](state: State, options: Options) {
        state.musicSelection.options = options;
        state.musicSelection.value = options[0].value;
    },
};
