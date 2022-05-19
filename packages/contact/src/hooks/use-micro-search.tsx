/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import type { OperationFactoryOptions } from "@infini-soft/useoperationfactory";
import { useOperationFactory } from "@infini-soft/useoperationfactory";
import { searchService } from "../services/search/search";


export type UseMicroSearchProps = {
    options?: OperationFactoryOptions
}

export type UseMicroSearchOutput = ReturnType<typeof useMicroSearch>

export const useMicroSearch = (props?: UseMicroSearchProps) => {
    const search = useOperationFactory(searchService, "search", props?.options)

    return search
}
