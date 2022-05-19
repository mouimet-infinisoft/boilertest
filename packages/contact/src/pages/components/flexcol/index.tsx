/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import React from 'react';
import css from './index.css';

export type FlexColProps = {
    variant: number
    children?: React.ReactNode
};

export const FlexCol: React.FC<FlexColProps> = ({ children, variant = 1 }) => {
    return <div className={css[`variant${variant}`]}>
        {children}
    </div>
}

export default FlexCol     