import { SettingNumber, SettingStrings } from '@/@types'

const defaultCountMin = 2;
const defaultCount = 3;
const defaultCountMax = 6;
const defaultVolumeMin = 0;
const defaultVolume = 50;
const defaultVolumeMax = 100;

export type State = {
  imgs: SettingStrings;
  tagsColumns: SettingNumber;
  tagsRows: SettingNumber;
  musicVolume: SettingNumber;
  gameVolume: SettingNumber;
  musicSelection: SettingStrings;
}

export const state: State = {
  tagsColumns: {
    id: 'tagsColumns',
    label: 'Число колонок',
    inputComponent: 'NumberComponent',
    value: defaultCount,
    min: defaultCountMin,
    max: defaultCountMax
  },
  tagsRows: {
    id: 'tagsRows',
    label: 'Число строк',
    inputComponent: 'NumberComponent',
    value: defaultCount,
    min: defaultCountMin,
    max: defaultCountMax
  },
  imgs: {
    id: 'imgs',
    label: 'Выбор фото',
    inputComponent: 'FotoComponent',
    value: '',
    options: []
  },
  musicVolume: {
    id: 'musicVolume',
    label: 'Громкость музыки',
    inputComponent: 'RangeComponent',
    value: defaultVolume,
    min: defaultVolumeMin,
    max: defaultVolumeMax
  },
  gameVolume: {
    id: 'gameVolume',
    label: 'Громкость игры',
    inputComponent: 'RangeComponent',
    value: defaultVolume,
    min: defaultVolumeMin,
    max: defaultVolumeMax
  },
  musicSelection: {
    id: 'musicSelection',
    label: 'Выбор музыки',
    inputComponent: 'AudioComponent',
    value: '',
    options: []
  },
};
