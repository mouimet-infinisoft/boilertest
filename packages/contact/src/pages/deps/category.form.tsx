/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import { Form, Radio } from 'antd';
import React from 'react';
import style from './index.css';

export type CategoryFormProps = {
  /**
   * Category map
   */
  map?: API.Meta
  /**
   * Field key name
   */
  field: string
  /**
   * onClick button handler
   */
  onClick?: (value: string) => void
};

const CategoryForm: React.FC<CategoryFormProps> = ({ map, field, onClick }) => {

  return <>
    <Form.Item name={field} initialValue={''} rules={[{ required: true, message: 'Select a contact category' }]}>
      <Radio.Group
        size="large"
        buttonStyle="solid"
        className={style.group}
      >
        {
          Object.entries(map ?? {}).sort(([, a], [, b]) => b - a).slice(0, 3).map(([name], i) => <Radio.Button key={i} value={name} onClick={() => { onClick?.(name) }} className={style.btn}>
            <h3 className='invariant'>{name}</h3>
          </Radio.Button>)
        }
      </Radio.Group>
    </Form.Item>

  </>;
}
export default CategoryForm
