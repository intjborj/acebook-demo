import Card from '@/components/common/card'
import React from 'react'
import LinkButton from '@admin/components/ui/link-button';
import Search from '@admin/components/common/search';
import { useModalAction } from '@/components/ui/modal/modal.context';

type Props = {
    searchInput?: any;
    onSearchChangeInput?: any;
}

const FeedHeader = ({ searchInput, onSearchChangeInput }: Props) => {
    const { openModal } = useModalAction();
    const handleSearch = () => {
        // console.log('fdsafdsafsd');
    };

    function handleProductQuickView() {
        return openModal('POST_FORM', null);
        // return openModal('POST_FORM', "FDS");
    }




    return (
        <div>

            {/* <Card className="mb-2 p-4 md:p-6 flex flex-col items-center xl:flex-row">
                <div className="mb-4   md:w-9/12  xl:mb-0">
                    <h1 className="text-xl font-light font-sans text-zinc-400">Tell us your concerns....</h1>
                </div>

                <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 xl:w-1/2 mx-6 tabMd:mr-10">
                    <LinkButton
                        href={ '#'}
                        className="md:ms-6 mx-3 h-12 w-full "
                        // className="md:ms-6 mx-3 h-12 w-full md:w-auto"
                    >
                        <span className="block md:hidden xl:block">Create Post</span>
                        <span className="hidden md:block xl:hidden">Create Post</span>
                    </LinkButton>
                </div>
            </Card> */}

            <Card className="mb-3 flex flex-col items-center xl:flex-row">
                {/* <div className="mb-4 md:w-2/4 xl:mb-0">
                    <h1  className="text-xl font-light font-sans text-zinc-400">Tell us your concerns....</h1>
            
                </div> */}


                {/* <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0 xl:w-1/2"> */}
                <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 ">
                    {/* <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 xl:w-1/2 mx-6"> */}
                    {/* <Search placeholder={"Search Post"} onSearch={handleSearch} /> */}
                    <Search onSearchChange={(data: any) => { onSearchChangeInput ? onSearchChangeInput(data) : {} }} onSearch={handleSearch} placeholder='' />
                    <LinkButton
                        href={'#'}
                        className="md:ms-6 mx-3 h-12 w-full md:w-auto  font-light"

                    >
                        <div onClick={handleProductQuickView} >
                            <span className="block md:hidden xl:block">{"Tell us your concerns"}</span>
                            <span className="hidden md:block xl:hidden">{"Tell us your concerns"}</span>
                        </div>
                    </LinkButton>
                </div>
            </Card>




        </div>
    )
}

export default FeedHeader