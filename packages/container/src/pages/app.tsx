/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 *
 * Micro app entry point
 * Context Provider is created with localization, configuration andlogging
 */

import React, { Suspense } from 'react';

const Index = React.lazy(()=>import('contact/Index'));

const App = () => {

  return (<Suspense fallback="container">
    <h1>Container</h1>
    <Index />
  </Suspense>
  );
};

export default App;
