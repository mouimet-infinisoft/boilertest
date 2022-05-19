/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { Badge, Radio } from "antd";
import React from "react";
import { useMicroContext } from "../context/micro";
import { useMetaModel } from "../hooks/useMetaModel";
import css from './index.css';

const Filter = () => {
    const { model } = useMicroContext()
    const meta = useMetaModel()
    const [filterActiveKey, setFilterActiveKey] = React.useState('All');
    const [filters, setFilters] = React.useState<API.Meta>();

    React.useEffect(() => {
        if (!filters) {
            setFilters(meta?.subCategories)
        }

    }, [filters, meta?.subCategories])

    const renderBadge = (count: number, active = false) => {
        return (
            <Badge
                count={count}
                className={active ? css.subCategoryBadgeActive : css.subCategoryBadge}
            />
        );
    }

    const onChange = (event: any) => {
        const newValue = event.target.value
        setFilterActiveKey(newValue)
        if (newValue === 'All') {
            model?.list.clear.run()
        }

        if (newValue !== '' && newValue !== 'All') {
            model?.list.onFilter?.('Subcategory', newValue)
        }

    }

    return <Radio.Group className={css.filterContainer} value={filterActiveKey} onChange={onChange} >
        {filters &&
            <Radio.Button value={'All'} key={'All'} className={css.filterButton}>All</Radio.Button>
        }
        {Object.entries(filters ?? {})?.sort(([, a], [, b]) => b - a).slice(0, 3)
            .map(([name, count], i) =>
                <Radio.Button value={name} key={i} className={css.filterButton}><span>{name}{renderBadge(count, filterActiveKey === name)} </span></Radio.Button>

            )
        }
    </Radio.Group>

}

export default Filter