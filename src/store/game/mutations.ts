import { MutationTree } from 'vuex';
import { State } from './state';
import { GameMutationTypes } from './mutation-types';

export type Mutations<S = State> = {
    [GameMutationTypes.SET_PAUSE](state: S, payload: boolean): void;
    [GameMutationTypes.SET_TRIGGER_GAME](state: S, payload: boolean): void;
    [GameMutationTypes.SET_TIME](state: S, payload: string): void;
    [GameMutationTypes.SET_COUNT_MOVE](state: S, payload: number): void;
}

export const mutations: MutationTree<State> & Mutations = {
    [GameMutationTypes.SET_PAUSE](state: State, pause: boolean) {
        state.pause = pause;
    },
    [GameMutationTypes.SET_TRIGGER_GAME](state: State, triggerGame: boolean) {
        state.triggerGame = triggerGame;
    },
    [GameMutationTypes.SET_TIME](state: State, time: string) {
        state.time = time;
    },
    [GameMutationTypes.SET_COUNT_MOVE](state: State, countMove: number) {
        state.countMove = countMove;
    },
};

