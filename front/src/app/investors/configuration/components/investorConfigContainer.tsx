import React, { useState } from 'react'
import { TabMenuType } from '@/types/custom';
import TabsBg from '@/components/tabs/tabsBg';
import PollDetailsIndex from '../pollDetails';
import InvestorSetting from '../settings';


type Props = {
    children?: JSX.Element;
    isSpecific?: boolean;
}

type StateType = {
    selectedTab?: string;
}

const InvConfigContainer = ({ children, isSpecific }: Props) => {
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

        setState((p) => ({ ...p, selectedTab: data }))
    }

    return (
        <div>
            <TabsBg action={tabAction} menu={menuTab} currentTab="BODPOLL" />

            {state.selectedTab === "BODPOLL" &&
                <>
                    {isSpecific ?
                        <>{children}</>
                        :
                        <>
                            <PollDetailsIndex />
                        </>
                    }
                </>
            }
            {state.selectedTab === "SETTINGS" && <InvestorSetting />}


        </div>
    )
}

export default InvConfigContainer