/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import React from 'react';
import css from './index.css';

export type FlexLineProps = {
    left?: React.ReactNode
    right?: React.ReactNode
};

export const FlexLine: React.FC<FlexLineProps> = ({ left='', right =''}) => {
    return <div className={css.flexlineRoot}>
            <div>
                {left}
            </div>
            <div>
                {right}
            </div>
        </div>
}

export default FlexLine       