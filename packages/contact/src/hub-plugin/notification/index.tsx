/*
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */

import type { useModelSdk } from "@/hooks/useModelSdk";
import type { Handler } from "@infini-soft/lib-events";
import type { ExecutionPayload } from "@infini-soft/lib-hub";
import { Button, notification, Spin, Typography } from 'antd';

export const antdNotificationPlugin = <T extends ReturnType<typeof useModelSdk> & Record<string, any>>(sdk: T): Handler<ExecutionPayload<any>> => (payload) => {

    if (payload.event.includes('create.preoperation')) {
        notification.open({
            icon: <Spin />,
            message: <Typography.Title level={5} className='invariant'>In progress...</Typography.Title>,
            description: <Typography.Text className='invariant'>{`One moment while we take care of business`}</Typography.Text>,
            duration: 0,
            key: '1',
            placement: 'bottomRight'
        })
    }

    if (payload.event.includes('create.success')) {
        notification.success({
            message: <Typography.Title level={5} className='invariant'>Completed</Typography.Title>,
            description: <Typography.Text className='invariant'>{`Operation finished successfully`}</Typography.Text>,
            duration: 5,
            key: '1',
            placement: 'bottomRight'
        })
    }

    if (payload.event.includes('error')) {
        notification.error({
            message: <Typography.Title level={5} className='invariant'>Error</Typography.Title>,
            description: <>
                <Typography.Text className='invariant'>Oops something went wrong</Typography.Text>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button onClick={() => {
                        sdk?.[payload.source].run(sdk?.[payload.source]?.draft)
                    }} >Retry</Button>
                    <Button onClick={() => { notification.close("1") }} type="primary">Later</Button>
                </div></>,
            duration: 5, key: '1', placement: 'bottomRight'
        })
    }
};
