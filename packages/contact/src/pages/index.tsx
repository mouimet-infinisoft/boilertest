/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 *
 * Micro app entry point
 * Context Provider is created with localization, configuration andlogging
 */
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import React, { Suspense } from 'react';

const MicroContextProvider = React.lazy(() => import('../context/micro'))
const MicroThemeProvider = React.lazy(() => import('../context/theme'))
const App = React.lazy(() => import('./app'));

const Index = () => {
  return (<Suspense fallback="DOOOOOOOOOOOOG">
    <ConfigProvider locale={enUS}>
      <MicroThemeProvider>
        <MicroContextProvider>
          <App />
        </MicroContextProvider>
      </MicroThemeProvider>
    </ConfigProvider>
  </Suspense>
  );
};

export default Index;
