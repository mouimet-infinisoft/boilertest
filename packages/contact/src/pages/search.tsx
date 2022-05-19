/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { Input } from "antd";
import React from "react";
import { useMicroContext } from "../context/micro";

const Search = () => {
    const { model } = useMicroContext()

    const handleSearch = (term: string) => term.length > 0 ? model?.list.onSearch(term) : model?.list.clear.run()

    return <Input.Search placeholder='What are you searching ?' allowClear onChange={e => handleSearch(e.target.value)} onSearch={handleSearch} />
}

export default Search