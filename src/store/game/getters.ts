import { GetterTree } from 'vuex';

import { RootState } from '../types';

import { State } from './state';

export type Getters = {
    getPause(state: State): boolean;
    getTriggerGame(state: State): boolean;
    getTime(state: State): string;
    getCountMove(state: State): number;
}

export const getters: GetterTree<State, RootState> & Getters = {
    getPause: (state) => state.pause,
    getTriggerGame: (state) => state.triggerGame,
    getTime: (state) => state.time,
    getCountMove: (state) => state.countMove,
};
