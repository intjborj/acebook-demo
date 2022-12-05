import React from 'react'
import PollHead from '@/app-poll/components/layouts/pollHead';
import Card from '@/components/ui/cards/card'
import PollMenu from '@/app-poll/components/menus/pollMenu';
import BtnGroupPoll from '../menus/pollBtnGroup';
import { LogoutIcon } from '@/components/icons/logout-icon';
import { useRouter } from "next/router";
import FunctionRestriction from '@/app/restrictions/system/function';
import { getAuthCredentials } from '@/utils/auth-utils';
type Props = {
  children?: JSX.Element[] | JSX.Element,
  headData?: any;
  period?: any;
}

const PollContainer = ({ children, period }: Props) => {
  const router = useRouter();
  const { user } = getAuthCredentials();


  return (
    <div>
      <div className=''>
        <div className='relative'>
          <PollHead period={period} />
        </div>
        <div className='pt-8'>
          {/* <div className='relative w-full pt-11 '> */}

          <div className='relative w-full'>
            <div className='absolute w-full flex justify-center   top-22 md:top-24 '>
              <div className=' '>
                {/* <div className='absolute top-24 left-8'> */}
                <h1 className=" grid gap-2 grid-cols-2 justify-center  content-center mb-2 text-xl font-extrabold text-gray-900  md:text-2xl ">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-fuchsia-700">Welcome!</span>
                  <span className='text-slate-500 capitalize'>{user?.firstName} </span>
                </h1>
              </div>
            </div>
            <div className='absolute right-8 md:right-11 w-8 top-20 md:top-32 text-zinc-400 cursor-pointer'>
              <div className='' onClick={() => { router.push('/logout') }}> <LogoutIcon /></div>
            </div>
          </div>
          <Card className='shadow-lg min-h-screen pt-28 md:pt-32'>
            <FunctionRestriction code={'POLL_INVESTOR_VIEW_RESULTS_PAGE'}>
              <div className='flex justify-center pb-5 '>
                {/* <PollMenu /> */}
                <BtnGroupPoll />
              </div>
            </FunctionRestriction>
            {children}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PollContainer