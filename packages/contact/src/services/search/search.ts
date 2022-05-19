/*
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
const options: SearchOption[] = [
    { key: 'key1', label: 'label1', value: 'SK1' },
    { key: 'key2', label: 'label2', value: 'SK2' },
]

export type SearchOption = {
    key: string
    label: string
    value: string
}

export const searchService = (term: string) => new Promise<SearchOption[] | undefined>((resolve, reject) => {
    setTimeout(() => { console.log(term); resolve(options) }, 2000)
})