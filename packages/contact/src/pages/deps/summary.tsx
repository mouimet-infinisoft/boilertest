/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { Tag, Typography } from 'antd';
import React from 'react';
import { useMicroContext } from '../../context/micro';
import { AddressIcon, CategoryIcon, EmailIcon, NameIcon, PhoneIcon, RelatedwithIcon, WebIcon } from '../assets/svg';
import AvatarUpload from '../components/avatar-upload';
import ContactDetail from '../components/contact-detail';
import CrudList from '../components/crud-list';
import css from './index.css';

type SummaryProps = {
  values: API.Item,
  errors?: string[]
  hide?: string[]
  editable?: boolean
  variant?: 'horizontal' | 'vertical'
}

const Summary: React.FC<SummaryProps> = ({ hide = [], editable = true, errors = [], values, variant = 'vertical' }) => {
  const _hide = hide.join(' ')
  const isEditable = (fieldName: string) => editable ? fieldName : undefined
  const { model } = useMicroContext()
  const isError = errors.length > 0

  return <div className={css[`summary-${variant}`] + ` invariant`}>
    {
      isError && <ol style={{ textAlign: 'left' }}>
        <Typography.Text type='danger' style={{ marginBottom: '1rem' }}>
          Please fix these errors:
        </Typography.Text>
        {errors?.map((e) => {
          return <li key={`${e}${new Date().getTime() * Math.random()}`}>
            {e}
          </li>
        })}
      </ol>
    }

    {!isError && <>

      {!_hide.includes('avatar') &&
        <AvatarUpload src={values.avatar} save={(_avatar) => {
          model?.item.onChange({ ...model.item.draft, avatar: _avatar })
          model?.operations.update.run({ ...model.item.draft })
        }} />}

      {!_hide.includes('name') &&
        <ContactDetail className='invariant' title='Name' editableFieldName={isEditable('name')} icon={<NameIcon />} content={values?.name ?? 'Add name'} />}

      {!_hide.includes('Subcategory') && values?.SK && values?.Subcategory &&
        <ContactDetail className='invariant' title='Category' icon={<CategoryIcon size={24} />} content={
          <span>
            <Tag>
              <Typography.Text className='invariant'>
                {values?.SK?.split('__')?.[0] ?? ''}
              </Typography.Text>
            </Tag>
            <Tag>
              <Typography.Text className='invariant'>{values?.Subcategory}</Typography.Text>
            </Tag>
          </span>
        } />
      }

      {!_hide.includes('email') &&
        <ContactDetail className='invariant' title='Email' editableFieldName={isEditable('email')} icon={<EmailIcon />} content={values?.email ?? 'Add email'} />}

      {!_hide.includes('address') && <ContactDetail className='invariant' title='Address' editableFieldName={isEditable('address')} icon={<AddressIcon />} content={values?.address ?? 'Add address'} />}
      {!_hide.includes('telephones') && <CrudList readonly={!editable} icon={<PhoneIcon />} className='invariant' title='Telephones' field='telephones' />}

      {!_hide.includes('website') && <ContactDetail
        className='invariant'
        icon={<WebIcon />}
        title='Website'
        editableFieldName={isEditable('website')}
        content={values?.website ?? 'Add website'}
      />
      }


      {!_hide.includes('relatedWith') && <CrudList readonly={!editable} icon={<RelatedwithIcon />} onRender={(obj: any) => obj?.label ?? obj} className='invariant' title='Relation' field='relatedWith' />}
    </>}
  </div>;
}
export default Summary