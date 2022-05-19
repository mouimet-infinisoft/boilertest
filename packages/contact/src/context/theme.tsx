import { defaultTheme, initializeThemeTokens, useTheme } from "@infini-soft/hooks-theme";
import React from 'react';
import config from "../../config/config.json";
import '../integration/antd.css';

type MicroThemeState = {
   liveTheme: boolean
} & ReturnType<typeof useTheme>

const initialTheme: MicroThemeState = {
  toggleTheme: () => { },
  ThemeSwitch: () => <></>,
  liveTheme: config?.liveTheme ?? false,
  theme: defaultTheme,
  activeTokens: defaultTheme.dark,
  resetTheme: () => { },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTokenChange: (_k: string, _v: object, _field: string) => (_e: React.ChangeEvent<HTMLInputElement>) => { },
  tokenChange: () => { }
};

const MicroTheme = React.createContext(initialTheme);
initializeThemeTokens(defaultTheme.light)

const MicroThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const theme = useTheme()

  const [context,] = React.useState(initialTheme);

  return <MicroTheme.Provider value={{ ...context, ...theme }}>
    {children}
  </MicroTheme.Provider>
}

export const useMicroTheme = () => {
  return React.useContext(MicroTheme);
};

export default MicroThemeProvider