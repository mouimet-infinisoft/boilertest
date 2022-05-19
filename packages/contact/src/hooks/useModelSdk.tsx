/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { useModel } from '@infini-soft/hooks-model';
import { useCrudFactory } from "@infini-soft/usecrudfactory";
import type { OperationFactoryOptions } from "@infini-soft/useoperationfactory";
import { create } from '../services/contacts/create';
import * as listService from '../services/contacts/list';
import { read } from '../services/contacts/read';
import { update } from '../services/contacts/update';

/**
 * delete not allowed
 */
const deleteService = () => {
    throw new DOMException("Not implemented")
}

export type UseModelSdkInput = { options?: OperationFactoryOptions }
export type UseModelSdkOutput = ReturnType<typeof useModelSdk>

export const useModelSdk = ({ options }: UseModelSdkInput) => {
    const operations = useCrudFactory({ createService: create, readService: read, updateService: update, deleteService, listService: listService.list, options })
    const item = useModel<API.Item>({options})
    const list = useModel<API.Item[]>({options})

    return { operations, item, list }
}