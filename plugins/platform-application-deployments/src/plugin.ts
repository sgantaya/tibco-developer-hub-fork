import {createComponentExtension, createPlugin, createRoutableExtension} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
export const platformApplicationDeploymentsPlugin = createPlugin({
  id: 'platform-application-deployments',
  routes: {
    root: rootRouteRef,
  }
});

export const PlatformApplicationDeploymentsPage = platformApplicationDeploymentsPlugin.provide(
  createRoutableExtension({
    name: 'PlatformApplicationDeploymentsPage',
    component: () =>
      import('./components/ApplicationDeploymentsPage').then(m => m.ApplicationDeploymentsPage),
    mountPoint: rootRouteRef,
  }),
);

/** @public */
export const PlatformApplicationDeploymentsCard: (props: {}) => JSX.Element =
    platformApplicationDeploymentsPlugin.provide(
        createComponentExtension({
            name: 'PlatformApplicationDeploymentsCard',
            component: {
                lazy: () => import('./components/ApplicationDeploymentsCard').then(m => m.ApplicationDeploymentsCard),
            },
        }),
    );
