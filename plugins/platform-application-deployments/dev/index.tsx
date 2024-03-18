import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import {
  platformApplicationDeploymentsPlugin,
  PlatformApplicationDeploymentsPage,
} from '../src/plugin';

createDevApp()
  .registerPlugin(platformApplicationDeploymentsPlugin)
  .addPage({
    element: <PlatformApplicationDeploymentsPage />,
    title: 'Root Page',
    path: '/platform-application-deployments',
  })
  .render();
