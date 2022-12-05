import { TicketTabMenu } from "./tickets/enums/ticketEnums";

export type breadcrumbType = {
    title?: String,
    route?: String,
    isHome?: Boolean,
    isCurrent?: Boolean
    hidden?: Boolean
}

export type TabMenuType = {
    name?: string;
    label?: string;
    default?: boolean;
    fetchCode?: string;
    count?: number
}


export type MenuGrpAttType = {
    route?: string;
    name?: string;
    restriction?: string;
    count?: number | null;
    countObj?: EntCounterType | null;
    fetchCode?: TicketTabMenu;
    isDropdown?: boolean;
    submenu?: MenuGrpAttType[];
    icon?: any;
    isPublic?: boolean;
}

export type EntCounterType = {
    new?: number;
    all?: number;
    allRoute?: any;
    newRoute?: any;
}