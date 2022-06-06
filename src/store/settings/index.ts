import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { state as settingsState, State} from './state';
import { RootState } from '../types';

export const state = settingsState

const namespaced: boolean = true;

export const settings: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};