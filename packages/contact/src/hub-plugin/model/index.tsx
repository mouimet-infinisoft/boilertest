/*
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */

import type { useModelSdk } from "@/hooks/useModelSdk";
import type { IModelState } from '@infini-soft/hooks-model';
import type { Handler } from "@infini-soft/lib-events";
import type { ExecutionPayload } from "@infini-soft/lib-hub";

export const operationPlugin = <T extends ReturnType<typeof useModelSdk> & Record<string, any>>(modelSdk: T): Handler<ExecutionPayload<{ result?: API.ItemSuccess | API.List }>> => (payload) => {

    if (
        payload.event.includes('list.success') &&
        payload?.message?.context?.result?.data &&
        Array.isArray(payload?.message?.context?.result?.data)
    ) {
        modelSdk.list.init.run(payload?.message?.context?.result?.data)
    }

    if (
        payload.event.includes('read.success') &&
        payload?.message?.context?.result?.data &&
        !Array.isArray(payload?.message?.context?.result?.data)
    ) {
        modelSdk.item.onChange({...modelSdk.item.draft, ...payload?.message?.context?.result?.data})
    }

    if (
        payload.event.includes('create.success') &&
        payload?.message?.context?.result?.data &&
        !Array.isArray(payload?.message?.context?.result?.data)
    ) {
        const item = payload?.message?.context?.result?.data
        const list = modelSdk.list.draft?.map(i => i?.tempID=== item?.tempID ? { ...i, ...item } : i) ?? []

        modelSdk.list.onChange(list)
    }
};


export const modelPlugin = <T extends ReturnType<typeof useModelSdk> & Record<string, any>>(modelSdk: T): Handler<ExecutionPayload<IModelState<API.Item>>> => (payload) => {
    if (payload.event.includes('commit.postoperation') &&
        (/(create)/g.test(payload.source)) &&
        payload.message?.context?.current
    ) {
        const draft = modelSdk?.list?.draft ?? []
        const item = payload?.message?.context.current

        modelSdk.list.onChange([...draft, item])
        modelSdk.operations.create.run(item)
    }

    if (payload.event.includes('onChange.postoperation') &&
        (/(read|detail|crudlist)/g.test(payload.source)) &&
        payload.message?.context?.current
    ) {
        const item = payload?.message?.context.draft ?? {}
        const list = modelSdk.list.draft?.map(i => i?.SK === item?.SK ? { ...i, ...item } : i) ?? []

        modelSdk.list.onChange(list)
        modelSdk.item.commit.run(payload.source)
        modelSdk.operations.update.run(item)
    }
}