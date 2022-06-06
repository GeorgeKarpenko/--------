import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { SettingNumber, SettingStrings } from '@/@types';
import { State } from './state';

export type Getters = {
    getImgs(state: State): SettingStrings;
    getTagsColumns(state: State): SettingNumber;
    getTagsRows(state: State): SettingNumber;
    getMusicVolume(state: State): SettingNumber;
    getGameVolume(state: State): SettingNumber;
    getMusicSelection(state: State): SettingStrings;
}

export const getters: GetterTree<State, RootState> & Getters = {
    getImgs: (state) => state.imgs,
    getTagsColumns: (state) => state.tagsColumns,
    getTagsRows: (state) => state.tagsRows,
    getMusicVolume: (state) => state.musicVolume,
    getGameVolume: (state) => state.gameVolume,
    getMusicSelection: (state) => state.musicSelection,
};