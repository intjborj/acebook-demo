import React, { useState, useEffect } from 'react'
import Card from '@/components/common/card';
import WorkListItem from './workListItem';
import ABButton from '@/components/ui/buttons/ABbutton';
import Link from '@/components/ui/link';
import { FrontPath } from '@/constants/enums/paths';
import { WorkFormValues } from '@/types/workDetails/workTypes';
import { useMutation } from '@apollo/client';
import { GET_ARCHIVED } from '@graphql/operations/tickets/ticketMutation';
import _ from 'lodash';
import { getAuthCredentials } from "@utils/auth-utils";
import ABDisplaySectionLabel from '@/components/customs/layouts/ABDisplaySectionLabel';
import EmptyDataFolderSvg from '@/components/customs/information/emptyDataFolder';
import TicketEmptyFolder from '../../components/svg/emptyFolder';

type Props = {
  ticketData?: any;
  works: WorkFormValues[];
}

type StateType = {
  workData: WorkFormValues[];
  showArchive: boolean;
}

const WorkView = ({ ticketData, works = [] }: Props) => {

  const { user } = getAuthCredentials();
  const [state, setState] = useState<StateType>({
    workData: works,
    showArchive: false
  })


  useEffect(() => {
    if (works) {
      setState((p) => ({ ...p, workData: works }))
    }
  }, [works])

  const [getArchived] = useMutation(GET_ARCHIVED);


  const processGet = () => {
    getArchived({
      variables: {
        id: ticketData?._id // ticket id
      },
    })
      .then((resp) => {

        setState((p) => ({ ...p, workData: _.get(resp, "data.workDetailArchived.data"), showArchive: true }))
      })
      .catch((error) => {
      });
  }

  const showhideArchived = () => {
    if (state.showArchive) {
      setState((p) => ({ ...p, workData: works, showArchive: false }))
    } else {
      processGet()
    }

  }

  return (
    <div>
      <Card>
        <div className='font-sans'>
          <div className='grid grid-cols-2'>
            <div >
              <div>
                <ABDisplaySectionLabel>Work Details</ABDisplaySectionLabel>
                {/* <h1 className=" text-md font-extrabold text-gray-900 dark:text-white md:text-md ">Work Details</h1> */}
              </div>
              {
                [_.get(ticketData, "serviceDepartment._id")].includes(_.get(user, "departmentOnDuty._id")) &&
                <div onClick={showhideArchived} className='bg-slate-300 hover:bg-slate-400 text-slate-500  hover:text-slate-700 w-fit px-2 py-1 font-bold text-xs rounded-md opacity-90 cursor-pointer hover:drop-shadow-xl shadow-lg '>
                  {state.showArchive ? 'Hide' : 'Show'} Archives
                </div>
              }
            </div>
            {
              [_.get(ticketData, "serviceDepartment._id")].includes(_.get(user, "departmentOnDuty._id")) &&
              <div className='flex justify-end'><Link href={`${FrontPath.TICKET_WORK_FORM}/${ticketData?._id}?source=add`}> <ABButton >Add Work</ABButton> </Link></div>
            }
          </div>
          <div>
            {
              state.workData && state.workData.length > 0
                ?
                <>
                  {
                    state.workData.map((item: any) => (
                      <WorkListItem workData={item} ticketData={ticketData} />
                      // <Link href={`${FrontPath.TICKET_WORK_VIEW}/${item?._id}?mn=${data?._id}`}>  <WorkListItem data={item} /></Link>
                    ))
                  }
                </> :
                <div>
                  <TicketEmptyFolder />
                </div>

            }
          </div>
        </div>
      </Card>
    </div>
  )
}

export default WorkView