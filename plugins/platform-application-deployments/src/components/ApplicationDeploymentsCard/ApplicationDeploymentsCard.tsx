import React from 'react';
import {
  Table,
  TableColumn,
  ResponseErrorPanel,
} from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';
import { IconLink } from './IconLink';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import BwceSvg from './images/bwce.svg';
import FlogoSvg from './images/flogo.svg';
import DpSvg from './images/dp.svg';

enum AppType {
  BWCE = 'BWCE',
  FLOGO = 'FLOGO',
}

interface InputApp {
  appType: AppType;
  appName: string;
  dataPlaneName: string;
  dpId: string;
  capabilityInstanceId: string;
  appId: string;
}

interface App extends InputApp {
  appUrl: string;
  dataPlaneUrl: string;
}

type DenseTableProps = {
  apps: App[];
};
export const DenseTable = ({ apps }: DenseTableProps) => {
  const columns: TableColumn<App>[] = [
    {
      title: 'Applications',
      field: 'appName',
      render: data => (
        <IconLink
          href={data.appUrl}
          text={data.appName}
          Icon={data.appType === AppType.BWCE ? BwceSvg : FlogoSvg}
        />
      ),
    },
    {
      title: 'Data planes',
      field: 'dataPlaneName',
      render: data => (
        <IconLink
          href={data.dataPlaneUrl}
          text={data.dataPlaneName}
          Icon={DpSvg}
        />
      ),
    },
  ];

  return (
    <Table
      title="TIBCO platform application deployments"
      options={{ search: false, paging: false }}
      columns={columns}
      data={apps}
    />
  );
};

export const ApplicationDeploymentsCard = () => {
  const { entity } = useEntity();
  const config = useApi(configApiRef);
  let cpLink = config.getOptionalString('cpLink') as string;
  if (!cpLink) {
    return <ResponseErrorPanel error={new Error('CP link not found')} />;
  }
  const pattern = /^((http|https|ftp):\/\/)/;
  if (!pattern.test(cpLink)) {
    if (cpLink.startsWith('/')) {
      cpLink = cpLink.slice(1);
    }
    cpLink = `https://${cpLink}`;
  }
  if (!cpLink.endsWith('/')) {
    cpLink += '/';
  }
  const inputApps: InputApp[] =
    (entity?.metadata?.tibcoPlatformApps as unknown as InputApp[]) || [];
  const apps: App[] = inputApps.map(app => {
    const dataPlaneUrl = `${cpLink}cp/app/data-plane?dp_id=${app.dpId}`;
    const appUrl = `${cpLink}cp/${app.appType.toLowerCase()}/appdetails?dp_id=${
      app.dpId
    }&capability_instance_id=${app.capabilityInstanceId}&app_id=${app.appId}`;
    return { ...app, dataPlaneUrl, appUrl };
  });

  return <DenseTable apps={apps || []} />;
};
