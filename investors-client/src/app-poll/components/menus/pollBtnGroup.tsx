import { useState } from 'react'
import { Tab } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from "next/router";
import FunctionRestriction from '@/app/restrictions/system/function';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
type MenuType = {
  Results: MenuAttType;
  Voting: MenuAttType;
  Logout: MenuAttType;
}

type MenuAttType = {
  router: string;
  name: string;
  restriction?: string;
}

export default function BtnGroupPoll() {
  const router = useRouter();
  let [menus] = useState<MenuAttType[]>([
    
    {
      name: "Voting",
      router: "/",
       restriction: "POLL_INVESTOR_VOTE_PAGE"
    },
    {
      name: "Results",
      router: "/poll/results",
      restriction: "POLL_INVESTOR_VIEW_RESULTS_PAGE"
    },
    {
      name: "Reports",
      router: "/report",
      restriction: "POLL_INVESTOR_VIEW_RESULTS_PAGE"
    }
    // ,
    // {
    //   name: "Logout",
    //   router: "/logout",
    //    restriction: ""
    // },
  ])



  return (
    <div className="w-full max-w-md px-2 py-2 sm:px-0">
      <Tab.Group >
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">


          {
            menus.map((item: MenuAttType) => (
              <FunctionRestriction code={item.restriction}>
                <Tab
                  key={"results"}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      'bg-white shadow'
                      // selected
                      //   ? 'bg-white shadow'
                      //   : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }


                >
                  <div className=' w-full h-full' onClick={() => { router.push(item.router) }}>
                    {item.name}
                  </div>


                </Tab>
              </FunctionRestriction>
            ))
          }

        </Tab.List>
      </Tab.Group>
    </div>
  )
}
