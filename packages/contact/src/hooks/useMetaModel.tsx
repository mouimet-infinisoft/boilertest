/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
import React from "react";
import config from "../../config/config.json";
import { metacategory } from '../services/contacts/metacategory';
import { metasubcategory } from '../services/contacts/metasubcategory';

export const useMetaModel  = () => {
    const [subCategories, setSubCategories] = React.useState<API.Meta>();
    const [categories, setCategories] = React.useState<API.Meta>();

    const fetchCategories = React.useCallback((filter: string = '') => {
        metacategory({ SK: `${config.appName}__${filter}` })
        .then(setCategories)
    }, [])

    const fetchSubcategories = React.useCallback((filter: string = '') => {
        metasubcategory({ SK: `${config.appName}__${filter}` })
            .then(setSubCategories)
    }, [])

    const filterSubcategory = (filter: string = '') => {
        fetchSubcategories(filter)
    }

    React.useEffect(() => {
        fetchCategories()
        fetchSubcategories()
    }, [fetchCategories, fetchSubcategories])

    return { subCategories, categories, filterSubcategory }
}