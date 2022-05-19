/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { Typography } from 'antd';
import React from 'react';
import { useMicroContext } from '../../../context/micro';
import FlexCol from '../flexcol';
import FlexLine from '../flexline';
import css from './index.css';

export type ContactDetailProps = {
    title: any
    content: React.ReactNode
    icon: React.ReactNode
    className?: string
    /**
     * Editable field name
     */
    editableFieldName?: string
    children?: React.ReactNode
};

export const ContactDetail: React.FC<ContactDetailProps> = ({ content, icon, title, editableFieldName = '', ...props }) => {
    const { model } = useMicroContext()

    const onChange = () => {

        if (editableFieldName.length < 1) {
            return false
        }

        return {
            onChange: (val: string) => {
                model?.item.onChange({ ...model.item.draft, [editableFieldName]: val }, "detail")
                model?.item.commit.run()
            }
        }
    }

    return <FlexCol variant={1}><FlexLine
        left={<span className={css.left}>{icon}</span>}
        right={<>
            <Typography.Title {...props} level={4}>
                {title}
            </Typography.Title>
            <Typography.Text editable={onChange()} className={`invariant ${css.content}`}>{content}</Typography.Text></>}
    />
    </FlexCol>
}

export default ContactDetail       