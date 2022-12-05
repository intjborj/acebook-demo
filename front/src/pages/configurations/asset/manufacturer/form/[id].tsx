import React, { useEffect, useState } from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import ModClassicLayout from '@/components/layouts/mod-classic';
import ManufacturerApp from '@/app/configurations/asset/manufacturer';
import AssManufacturerForm from '@/app/configurations/asset/manufacturer/form';
import { FrontPath } from '@/constants/enums/paths';
import { useRouter } from 'next/router';
import { GET_SPEC_MANUFACTURER } from '@graphql/operations/asset/assetQueries';
import { useQuery, useMutation } from '@apollo/client';
import _, { isEmpty } from 'lodash';
import { ManufacturerType } from '@/types/assets/assetsType';
import Spinner from '@/components/ui/loaders/spinner/spinner';

type Props = {}

const breadcrumbs = [
    {
        title: 'Manufacturers',
        route: FrontPath.ASSET_MANUFACTURERS,
        isHome: true,
    },
    {
        title: 'Update',
        route: '#',
        isCurrent: true,
    },
];


const ManufacturerFormIndex: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { searchType, id: manuId, ...restQuery } = query;
    const [defaultValue, setDefaultValue] = useState<ManufacturerType>({})

    const { data: specManufact, refetch } = useQuery(GET_SPEC_MANUFACTURER, {
        variables: {
            id: manuId
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    useEffect(() => {
        if (specManufact) {
            let dataLoad = _.get(specManufact, "manufacturer.data")
            let defaults: ManufacturerType = {
                name: dataLoad?.name,
                mobile: dataLoad?.mobile,
                _id: dataLoad?._id
            }

            setDefaultValue(defaults)
        }


    }, [specManufact])



    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <>
                    {(!isEmpty(specManufact) && !isEmpty(defaultValue?._id)) ? <AssManufacturerForm defaultVals={defaultValue} /> : <Spinner/>}
                </>
            </ModClassicLayout>
        </>
    )
}
ManufacturerFormIndex.getLayout = getLayout;

ManufacturerFormIndex.authenticate = {
    permissions: adminOnly,
};

export default ManufacturerFormIndex