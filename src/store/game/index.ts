import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { state as gameState, State} from './state';
import { RootState } from '../types';

export const state = gameState

const namespaced: boolean = true;

export const game: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};