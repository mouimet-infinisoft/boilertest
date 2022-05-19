
import type { ActionType } from '@ant-design/pro-table';
import { LiveConfig } from "@infini-soft/hooks-theme";
import { PageHeader, Typography } from 'antd';
import React, { useRef } from 'react';
import { useMicroContext } from '../context/micro';
import { useMicroTheme } from '../context/theme';
import { BackArrow } from './assets/svg';
import { columns } from './deps/columns';
import styles from './index.css';

// import ProTable from '@ant-design/pro-table';
const ProTable = React.lazy(() => import('@ant-design/pro-table'));
const Create = React.lazy(() => import('./create'));
const Filter = React.lazy(() => import('./filter'));
const Read = React.lazy(() => import('./read'));
const Search = React.lazy(() => import('./search'));

const App = () => {
  const actionRef = useRef<ActionType>();
  const { model } = useMicroContext();
  const { liveTheme, ...theme } = useMicroTheme();

  React.useEffect(() => {
    document.querySelector('[aria-label="reload"]')?.addEventListener('click', () => model?.operations.list.run({}));
    model?.operations.list.run({})
  }, []);

  return <div className={styles.root}>
    {liveTheme && <LiveConfig {...theme} />}
    <PageHeader
      className={styles.header}
      backIcon={<><BackArrow /></>}
      onBack={() => { }}
      title={<Typography.Title level={1}>Contacts</Typography.Title>} />

    <ProTable
      actionRef={actionRef}
      rowKey={record => record?.SK || new Date().getTime()}
      search={false}
      toolBarRender={() => [
        <Search key='search-1' />,
        <Filter key='filter-2' />,
        <Create key='create-3' />
      ]}
      pagination={{
        pageSize: 10,
      }}
      className={styles['ant-pro-table']}
      loading={model?.operations.list.isLoading}
      dataSource={model?.list?.draft ?? []}
      columns={columns as any} />

    <Read />
  </div>;
};

export default App