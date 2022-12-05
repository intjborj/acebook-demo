import React, {useState} from 'react'
import { TabMenuType } from '@/types/custom';
import TabsBg from '@/components/tabs/tabsBg';
import InvestorSetting from './settings';
import PollDetailsIndex from './pollDetails';

type Props = {}
type StateType = {
    selectedTab?: string;
}

const InvConfigApp = (props: Props) => {
    const [state, setState] = useState<StateType>({
        selectedTab: "BODPOLL"
    })
    const menuTab: TabMenuType[] = [
        {
            name: 'BODPOLL',
            label: 'BOD Poll',
            fetchCode: 'BODPOLL',
            default: true
        },
        {
            name: 'SETTINGS',
            fetchCode: 'SETTINGS',
            label: 'Settings',
            default: false
        },

    ]

    const tabAction = (data: any) => {
       
        setState((p)=>({...p, selectedTab:data}))
    }

    return (
        <div>
            <TabsBg action={tabAction} menu={menuTab} currentTab="BODPOLL" />

            {state.selectedTab === "BODPOLL" && <PollDetailsIndex/>}
            {state.selectedTab === "SETTINGS" && <InvestorSetting/>}


        </div>
    )
}

export default InvConfigApp