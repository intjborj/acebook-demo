
import ABGroupMenu from '@/components/customs/menu/ABGroupMenu';
import { MenuGrpAttType } from '@/types/custom';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

type Props = {
    action?: any;
    menu?: MenuGrpAttType[];
    title: string;
}

export type MenuAttType = {
    router?: string;
    name?: string;
    restriction?: string;
    count?: number;
    fetchCode?: string;
    isDropdown?: boolean;
    
}


export default function ReportMenu({ action, menu, title }: Props) {


    return (
        <div className='w-full'>
            <ABGroupMenu title={title} menu={menu} action={action} />
        </div>
    )
}
