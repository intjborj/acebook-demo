import ABModal from '@/components/customs/modals/ABModal'
import ViewContainer from '@/components/layouts/custom-content-view-layout'
import ABButton from '@/components/ui/buttons/ABbutton'
import _, { isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import PromoForm from './promoForm'
import PromoImage from './promoImage'
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROMOTIONS } from '@graphql/operations/promotions/promotionQueries';
import { PromotionsUploadPath } from '@/constants/uploadPaths'
import NoData from '@/components/customs/information/noData'
import { PostContextRd } from '@/reducers/posts/postContextRd';
import { DELETE_PROMOTION } from '@graphql/operations/promotions/promotionMutation'
import { toast } from 'react-toastify'
import { LabelColor } from '@/constants/enums/themes'


type Props = {}

const PromotionApp = (props: Props) => {
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
    const [upsertProm] = useMutation(DELETE_PROMOTION);
    const { data: allPromotions, refetch } = useQuery(GET_PROMOTIONS, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    useEffect(() => {
        if (statePostRd.active) {
            refetch()
        }
        // return () => {
        //     dispatchPostRd({ type: "refetch", commentActive: false })
        // }
    }, [!statePostRd.active])

    const onRemove = (id: string) => {

        if (confirm("Are you sure you want to remove this promotion?")) {
            upsertProm({
                variables: {
                    input: { _id: id },
                },
            })
                .then((resp) => {
                    refetch()
                    toast.success('Promotion deleted successfully ');
                })
                .catch((error) => {
                    toast.error('Promotion failed to delete');
                });
        }
    }
    return (
        <div className='p-5'>
            {/* <ViewContainer> */}
            <>
                <div className='flex justify-center'>
                    <div>
                        <span className={`flex justify-center font-bold ${LabelColor.PRIMARY}`}>Current Events, Announcements, and Promotions</span>

                        <div className='flex justify-center pt-3'>
                            <ABModal button={<ABButton>+ Add new</ABButton>}>
                                <PromoForm />
                            </ABModal>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3 my-7'>
                    {
                        (allPromotions && _.get(allPromotions, "promotions.data").length > 0) ?
                            _.get(allPromotions, "promotions.data").map((item: any) => (
                                <div>
                                    <PromoImage fileName={PromotionsUploadPath({ fileName: item?.path })} />
                                    <div className='py-2 flex justify-center'><ABButton category='normal' onClick={() => onRemove(item?._id)}>Remove</ABButton></div>
                                </div>
                            ))
                            : <></>
                    }
                </div>
                {isEmpty(_.get(allPromotions, "promotions.data")) && <div className='flex justify-center'>  <NoData /> </div>}
            </>
            {/* </ViewContainer> */}
        </div>
    )
}

export default PromotionApp