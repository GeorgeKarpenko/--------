// import { createStore } from 'vuex'

// import { settings } from '@/store/settings';
// import { game } from '@/store/game';

// export type RootState = {
//   settings: typeof settings;
//   game: typeof game;
// };

// export type Store = SettingsStore<Pick<RootState, 'settings'>>
// & GameStore<Pick<RootState, 'game'>>;


// export const store = createStore({
//   modules: {
//     settings,
//     game
//   },
// });

// export function useStore(): Store {
//   return store as Store;
// }