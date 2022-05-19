/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { Button, Typography } from 'antd';
import React from 'react';
import { useMicroContext } from '../../../context/micro';
import { AddIcon, DeleteIcon } from '../../../pages/assets/svg';
import ContactDetail from '../contact-detail';

export type CrudListProps = Partial<HTMLElement> & {
    field: keyof API.Item
    title: string
    icon: React.ReactNode
    readonly: boolean
    onRender?: <T = any, >(val: T) => string
};

export const CrudList: React.FC<CrudListProps> = ({ field, title, icon, readonly = false,onRender = a => a, ...props }) => {
    const { model } = useMicroContext()

    const onChange = (index: number) => ({
        onChange: (val: string) => {
            if (model?.item?.draft?.[field] && Array.isArray(model?.item?.draft?.[field])) {
                model?.item.onChange({ ...model?.item?.draft, [field]: (model?.item?.draft?.[field] as any[]).map((item, idx) => idx === index ? val : item) }, "crudlist")
            }

        }
    })
    const onAdd = () => {
        model?.item.onChange({ ...model.item.draft, [field]: ['Insert here', ...(model?.item?.draft?.[field] as any[] || [])] }, "crudlist")
    }


    const onDelete = (i: number) => () => {
        if (model?.item?.draft?.[field] && Array.isArray(model?.item?.draft?.[field])) {
            model.item?.onChange({ ...model.item.draft, [field]: (model?.item?.draft?.[field] as any[]).filter((_, idx) => idx !== i) }, "crudlist")
        }
    }

    // @ts-ignore
    return <><ContactDetail
        {...props}
        icon={icon}
        title={<>{title} <Button hidden={readonly} type='text' onClick={onAdd}><AddIcon /></Button></>}
        content={(model?.item.draft?.[field] as any[])?.map((item: string, i: number) => <span key={`tel${i}`} style={{ display: 'flex', alignItems: 'center' }}>
            <Typography.Text style={{ display: 'block' }} editable={readonly ? false : onChange(i)} key={item + i}>
                {onRender(item)}
            </Typography.Text>
            <Button type='text' hidden={readonly} onClick={onDelete(i)}><DeleteIcon /></Button>
        </span>)}
    /></>
}

export default CrudList       