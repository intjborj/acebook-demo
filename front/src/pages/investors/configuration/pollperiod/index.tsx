import SpecInvPollDetail from '@/app/investors/configuration/pollDetails/candidates'
import React from 'react'
import ModClassicLayout from '@/components/layouts/mod-classic';
import { getLayout } from '@/components/layouts/layout';
import _ from 'lodash';
import { adminOnly } from '@/utils/auth-utils';
import InvConfigApp from '@/app/investors/configuration';


type Props = {}



const PollPeriodIndex = (props: Props) => {
    return (
        <ModClassicLayout>
            <>
                <SpecInvPollDetail defaults={{}} />
            </>
        </ModClassicLayout>
    )
}
PollPeriodIndex.getLayout = getLayout;

PollPeriodIndex.authenticate = {
    permissions: adminOnly,
};
export default PollPeriodIndex