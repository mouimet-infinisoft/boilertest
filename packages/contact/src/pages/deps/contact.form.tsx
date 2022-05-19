/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd/lib/form';
import React from 'react';
import config from "../../../config/config.json";
import { useMicroSearch } from "../../hooks/use-micro-search";
import { AddressIcon, EmailIcon, NameIcon, PhoneIcon, RelatedwithIcon, WebIcon } from '../assets/svg';
import AvatarUpload from "../components/avatar-upload";
import style from './index.css';
import './overrides.css';
const REQUIRED = !config?.devMode

// export type ContactFormProps = {};

const ContactForm: React.FC<FormInstance> = (form: FormInstance) => {
  const search = useMicroSearch()

  // React.useEffect(() => { search.run("d") }, [])

  return <>
    <Form.Item name={'avatar'}>
      <AvatarUpload src='' save={(base64Avatar) => { form.setFieldsValue({ ...form.getFieldsValue(), avatar: base64Avatar }) }} />
    </Form.Item>

    <Form.Item name={'name'} rules={[{ required: REQUIRED }]}>
      <Input prefix={<NameIcon />} placeholder='Name' />
    </Form.Item>

    <Form.Item name={['address']} rules={[{ required: REQUIRED }]}>
      <Input prefix={<AddressIcon />} placeholder='Address' />
    </Form.Item>

    <Form.Item style={{ position: 'relative' }}>
      <span className={style.prefixIcon}>
        <PhoneIcon /></span>
      <Form.Item name={['telephones']} noStyle><Select mode="tags" size='large' style={{ width: '100%' }} placeholder="Telephones" /></Form.Item>
    </Form.Item>

    <Form.Item name={['email']} rules={[{ type: 'email' }]}>
      <Input prefix={<EmailIcon />} placeholder='Email' />
    </Form.Item>

    <Form.Item name={['website']}>
      <Input prefix={<WebIcon />} placeholder='Website' />
    </Form.Item>

    <Form.Item style={{ position: 'relative' }}>
      <span className={style.prefixIcon}>
        <RelatedwithIcon />
      </span>

      <Form.Item name={['relatedWith']} noStyle>
        <Select
          // labelInValue
          notFoundContent={<>Search by keyword</>}
          filterOption={(input, opt)=>{console.log(`input = `, input, `opt = `, opt); return false;}}
          mode="tags"
          size='large'
          loading={search.isLoading}
          style={{ width: '100%' }}
          onSearch={search.run}
          onChange={console.log}
          options={search?.result}
          placeholder="Related with"
        /></Form.Item>
    </Form.Item>

  </>;
}
export default ContactForm