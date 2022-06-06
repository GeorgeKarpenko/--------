type Setting<V> = {
    id: string;
    label: string;
    inputComponent: string;
    value: V;
}

export type Options = {
    value: string;
    text: string;
}[]
export type SettingStrings = Setting<string> & {
    options: Options
}
export type SettingNumber = Setting<number> & {min: number, max: number}