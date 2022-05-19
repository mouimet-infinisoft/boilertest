/*
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
// import { LoadingOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { UploadFile } from 'antd/lib/upload/interface';
import React from 'react';
import { AvatarIcon } from './assets';
import './index.css';

function getBase64(img: Blob, callback: (arg: any) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file: File) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

type AvatarUploadProps = {
    src?: string
    save: (bse64: string) => void
}

const AvatarUpload = ({ src, save }: AvatarUploadProps) => {
    const [state, setState] = React.useState({
        loading: false,
        imageUrl: src
    });

    const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status === 'uploading') {
            setState(prev => ({ ...prev, loading: true }));

        }

        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as Blob, imageUrl => {
                setState({
                    imageUrl,
                    loading: false,
                })
                save(imageUrl)
            }
            );
        }
    };

    const UploadButton = () => (
        <div>
            <AvatarIcon size={90}/>
                {/* {state.loading ? <LoadingOutlined /> : <AvatarIcon size={90} />} */}
        </div>
    );

    return <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
    >
        {state.imageUrl ?
            <img src={state.imageUrl} alt="avatar" style={{ width: '100%', maxWidth: '100px' }} />
            :
            <UploadButton />
        }
    </Upload>
}

export default AvatarUpload;