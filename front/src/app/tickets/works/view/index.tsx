// Dependencies
import React from 'react'
import _ from 'lodash'
// Constants
import { WorkFormValues } from '@/types/workDetails/workTypes';
// Global Components
import Card from '@/components/common/card';
import ViewContainer from '@/components/layouts/custom-content-view-layout';
import ABTransition from '@/components/customs/transitions/ABTransition';
// Local Components
import HeadDetails from './headDetails';
import AuthDetails from './authDetails';
import DescDetails from './descDetails';
import AttachDetails from './attachDetails';
import SubmissionDepartmentDetails from '../../components/submissionDepartment';
import AssetDetails from './assetDetails';

export const WorkViewContext = React.createContext<WorkViewContextType>({})

type Props = {
    ticketData?: any;
    workData?: WorkFormValues;
}
type WorkViewContextType = {
    ticketData?: any;
    workData?: WorkFormValues;
}

const WorkViewApp = ({ workData, ticketData }: Props) => {

    return (
        <div>
            <WorkViewContext.Provider value={{ workData: workData, ticketData: ticketData }} >
                <ViewContainer>
                    <>

                        <div className='pb-5'>
                            <HeadDetails/>
                            <ABTransition> <Card className='mt-3'><AuthDetails  /></Card></ABTransition>
                           {_.get(ticketData, "asset") && <ABTransition order={2}> <Card className='mt-3'><AssetDetails  /></Card> </ABTransition>}
                            <ABTransition order={3}> <Card className='mt-3'><DescDetails  /></Card> </ABTransition>
                            <ABTransition order={4}> <Card className='mt-3'><SubmissionDepartmentDetails /></Card> </ABTransition>
                            <ABTransition order={5}>  <Card className='mt-3'><AttachDetails  /></Card> </ABTransition>
                            {/* <Card className='mt-3'><DateDetails workData={workData} ticketData={ticketData} /> </Card> */}
                        </div>
                    </>
                </ViewContainer>
            </WorkViewContext.Provider>
        </div >
    )
}

export default WorkViewApp