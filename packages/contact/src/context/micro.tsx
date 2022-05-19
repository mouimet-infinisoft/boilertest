import type { IHub } from "@infini-soft/lib-hub";
import { consoleplugin, Hub } from "@infini-soft/lib-hub";
import type { OperationFactoryOptions } from "@infini-soft/useoperationfactory";
import React from 'react';
import config from "../../config/config.json";
import { useModelSdk } from "../hooks/useModelSdk";
import { modelPlugin, operationPlugin } from "../hub-plugin/model";
import { antdNotificationPlugin } from "../hub-plugin/notification";
import { persistentCleanupPlugin, persistentModelPlugin } from "../hub-plugin/persistent";
import '../integration/antd.css';

export type UseModelSdkInput = { options?: OperationFactoryOptions }
export type UseModelSdkOutput = ReturnType<typeof useModelSdk>

type MicroContextState = {
  history: typeof history;
  user: {
    isAdmin: boolean;
    Email?: string;
  };
  hub: IHub;
  model?: ReturnType<typeof useModelSdk>;
}

const initialContext: MicroContextState = {
  history,

  /**
   * SECURITY
   */
  user: {
    isAdmin: false
  },

  /**
 * IPC
 */
  hub: Hub(),

};

const MicroContext = React.createContext<MicroContextState>(initialContext);

const hub = Hub()
const MicroContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

  const options = { ...config, hub, source: config.appName }
  const model = useModelSdk({ options })

  React.useEffect(() => {
    const s: (() => void)[] = []
    s.push(hub.subscribe(persistentModelPlugin(model)))
    s.push(hub.subscribe(persistentCleanupPlugin(model)))
    s.push(hub.subscribe(antdNotificationPlugin(model)))
    s.push(hub.subscribe(modelPlugin(model)))
    s.push(hub.subscribe(operationPlugin(model)))

    if (config.verbose) {
      s.push(hub.subscribe(consoleplugin))
    }

    return () => { s.forEach(unsubscribe => unsubscribe()) }
  }, [model])

  const [context,] = React.useState(initialContext);

  return <MicroContext.Provider value={{ ...context, hub, model }}>
    {children}
  </MicroContext.Provider>
}

export const useMicroContext = () => {
  return React.useContext<MicroContextState>(MicroContext);
};

export default MicroContextProvider