import { SettingNumber, SettingStrings } from '@/@types'

export const state = {
  pause: true,
  triggerGame: false,
  time: '00:00',
  countMove: 0,
}

export type State = typeof state
