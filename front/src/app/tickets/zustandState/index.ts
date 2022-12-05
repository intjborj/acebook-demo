import create from 'zustand'
import { TicketTabMenu, TicketTabMenuDesc } from '@/types/tickets/enums/ticketEnums';
type TicketIndexStoreType={
  currentTab?: string;
  changeCurrentTab: (tab?:string)=>void;
}

export const useTicketIndexStore = create<TicketIndexStoreType>((set) => ({
  currentTab: TicketTabMenu.MY_REQUESTS,
  changeCurrentTab: (tab?:string) => {
    // console.log("inside tab", tab)
    set(() => ({ currentTab: tab }))
  },
}))