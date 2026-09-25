export const modalStyles = ["style-1", "style-2", "style-3"] as const;
export type ModalStyle = (typeof modalStyles)[number];

export const modalThemes = ["dark", "light"] as const;
export type ModalTheme = (typeof modalThemes)[number];
