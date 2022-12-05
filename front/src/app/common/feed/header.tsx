import Card from '@/components/common/card'
import React from 'react'
import LinkButton from '@admin/components/ui/link-button';
import Search from '@admin/components/common/search';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { BtnColorClass } from '@/components/ui/buttons/ABbutton';
import ABFormFilter, { FilterFields, FilterFormType } from '@/components/customs/forms/ABFormFilter';
type Props = {
    searchInput?: any;
    onSearchChangeInput?: any;
    filterFields?: FilterFields[];
    filterInput?: (data: FilterFormType) => void;
}
const FeedHeader = ({ searchInput, onSearchChangeInput, filterFields, filterInput }: Props) => {
    const { openModal } = useModalAction();
    const handleSearch = (data: any) => {
        if (searchInput) {
            searchInput(data?.searchText)
        }
    };

    function handleProductQuickView() {
        return openModal('POST_FORM', null);
    }

    const btnText = "Tell us your concerns"


    return (
        <div>
            <Card className="mb-3 flex flex-col items-center xl:flex-row">
                <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 ">
                    <div className='flex w-full gap-2'>
                        <Search onSearchChange={(data: any) => { onSearchChangeInput ? onSearchChangeInput(data) : {} }} onSearch={handleSearch} placeholder='' />
                        {/* <Search placeholder={"Search Post"} onSearch={handleSearch} /> */}
                        {filterInput &&
                            <div className='flex justify-center grid content-center'>
                                <ABFormFilter fields={filterFields} filterAction={filterInput ?? filterInput} />
                            </div>
                        }
                    </div>

                    <LinkButton
                        href={'#'}
                        className={`md:ms-6 mx-3 h-12 w-full md:w-auto  font-light shadow-lg shadow-teal-500/50 ${BtnColorClass.PRIMARY}`}
                    >
                        <div onClick={handleProductQuickView} >
                            <span className="block md:hidden xl:block">{btnText}</span>
                            <span className="hidden md:block xl:hidden">{btnText}</span>
                        </div>
                    </LinkButton>

                </div>
            </Card>
        </div>
    )
}

export default FeedHeader