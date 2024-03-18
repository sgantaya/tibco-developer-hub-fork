# platform-application-deployments

Welcome to the platform-application-deployments plugin!

This contains a component card which shows the deployed BWCE and Flogo applications in Tibco platform and the data planes.
On click on the applications link, will direct to control plane link where the application is deployed.


## Getting started

Create your Backstage application using the Backstage CLI as described here:
https://backstage.io/docs/getting-started/create-an-app


You need to configure the plugin in your frontend:

## From your Backstage root directory

```
yarn --cwd packages/app add @internal/plugin-platform-application-deployments@^0.1.0
```

Configure the plugin:

```tsx
// In packages/app/src/components/catalog/EntityPage.tsx
import {
    ApplicationDeploymentsCard
} from "@internal/plugin-platform-application-deployments/src/components/ApplicationDeploymentsCard";

// You can add the card to any number of pages, the overviewContent is shown as an example here
const overviewContent = (
    <>
        <Grid container spacing={3} alignItems="stretch">
            {entityWarningContent}
            <Grid item md={6}>
                <EntityAboutCard variant="gridItem"/>
            </Grid>
            <Grid item md={6} xs={12}>
                <EntityCatalogGraphCard variant="gridItem" height={400}/>
            </Grid>

            <Grid item md={4} xs={12}>
                <EntityLinksCard/>
            </Grid>
            <Grid item md={8} xs={12}>
                <EntityHasSubcomponentsCard variant="gridItem"/>
            </Grid>
            <EntitySwitch>
                <EntitySwitch.Case if={isKind('component')}>
                    <Grid item md={6} xs={12}>
                        <ApplicationDeploymentsCard/>
                    </Grid>
                </EntitySwitch.Case>
            </EntitySwitch>
        </Grid>
    </>
);

```

# Component

```yaml
---
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: 'your-component'
  description: 'a description'
  tibcoPlatformApps:
    - appType: BWCE
      appName: BWCE-app-01
      dataPlaneName: Sagar-DP
      dpId: cmsakrsicqg4cgd4ock0
      capabilityInstanceId: cnrsoe1mmkeg3d5rt05g
      appId: cnrspo5chbr3r06cq9eg
    - appType: FLOGO
      appName: FLOGO-app-01
      dataPlaneName: FLOGOQA
      dpId: cnptggsolrk2n9sq2m2g
      capabilityInstanceId: cnptl0solrk2n9sq2m6g
      appId: cnptn9gtp5pat4l41d90
spec:
  type: service
  lifecycle: experimental
  owner: your-name

```