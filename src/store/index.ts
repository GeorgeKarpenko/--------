// import Vue from "vue";
import Vuex, { StoreOptions } from 'vuex';
import { createStore } from "vuex";
import { RootState } from './types';
import { game } from './game';
import { settings } from './settings';


// Vue.use(Vuex);
// export const store:StoreOptions<RootState> = createStore({
//   // Vuex allows the store to be divided into small modules, and each module has its own state, mutation, action and getter;
//   // Status of accessing test: store state. test
//   modules: {
//     game, //store module 1
//     settings //store module 2
//   }
// });
const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0' // a simple property
  },
  modules: {
    game,
    settings
  }
};

export default new Vuex.Store<RootState>(store);