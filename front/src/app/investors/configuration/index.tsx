import React, { useState } from 'react'
import { TabMenuType } from '@/types/custom';
import TabsBg from '@/components/tabs/tabsBg';
import InvestorSetting from './settings';
import PollDetailsIndex from './pollDetails';
import InvConfigContainer from './components/investorConfigContainer';

type Props = {}
type StateType = {
    selectedTab?: string;
}

const InvConfigApp = (props: Props) => {


    return (
        <div>

            <InvConfigContainer />

        </div>
    )
}

export default InvConfigApp