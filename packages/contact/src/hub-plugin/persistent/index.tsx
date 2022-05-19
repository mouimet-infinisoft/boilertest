/*
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */

import type { useModelSdk } from "@/hooks/useModelSdk";
import type { IModelState } from "@infini-soft/hooks-model";
import type { Handler } from "@infini-soft/lib-events";
import type { ExecutionPayload } from "@infini-soft/lib-hub";
import type { OperationFactoryState } from "@infini-soft/useoperationfactory";
import { notification, Typography } from "antd";
import React from 'react';

const storeKey = "__persistent_infinisoft__"
type PersistentStore<T = any> = Record<string, {
    source: string
    payload: T
}>

export const persistentModelPlugin = <T extends ReturnType<typeof useModelSdk> & Record<string, any>>(model: T): Handler<ExecutionPayload<IModelState<API.Item>>> => (payload) => {

    onoffline = () => {
        alert(`OffLINE`)
        notification.warn({
            message: <Typography.Title level={5} className='invariant'>Offline</Typography.Title>,
            description: <Typography.Text className='invariant'>{`You are now working offline. Everything is saved, don't worry!`}</Typography.Text>,
            key: '1',
            placement: 'bottomRight',
            duration: 0
        })
    }
   ononline = () => {
       alert(`ONLINE`)
        const onHoldOperation: PersistentStore = JSON.parse(localStorage.getItem(storeKey) ?? '{}')
        notification.success({
            message: <Typography.Title level={5} className='invariant'>Online</Typography.Title>,
            description: <Typography.Text className='invariant'>{`You are now back online`}</Typography.Text>,
            key: '1',
            placement: 'bottomRight',
            duration: 5
        })


        if (onHoldOperation) {
            for (const k of Object.keys(onHoldOperation)) {
                model.operations.update.run(onHoldOperation[k].payload)
            }
        }
    }

    if (!(/(list)/g.test(payload.event)) &&
        (/(onChange.postoperation)/g.test(payload.event)) &&
        payload.message?.context?.draft
    ) {

        const store: PersistentStore = JSON.parse(localStorage.getItem(storeKey) ?? '{}')
        const tempID = payload?.message?.context?.draft?.tempID ?? new Date().getTime().toFixed(0)

        store[tempID] = {
            source: payload.source,
            payload: payload?.message?.context?.draft
        }

        localStorage.setItem(storeKey, JSON.stringify(store))
    }



};


export const persistentCleanupPlugin = <T extends ReturnType<typeof useModelSdk> & Record<string, any>>(model: T): Handler<ExecutionPayload<OperationFactoryState<{ data?: API.Item }>>> => (payload) => {

    if ((/(success)/g.test(payload.event))
    ) {
        const store: PersistentStore = JSON.parse(localStorage.getItem(storeKey) ?? '{}')
        const id = payload.message?.context?.result?.data?.tempID ?? payload?.message?.context?.result?.data?.SK

        if (id) {
            delete store[id]
            localStorage.setItem(storeKey, JSON.stringify(store))
        }
    }

}
