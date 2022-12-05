import ABDisplaySectionLabel from '@/components/customs/layouts/ABDisplaySectionLabel'
import React, { useContext } from 'react'
import { WorkViewContext } from '@/app/tickets/works/view';
import { ContainerBgColor, LabelColor } from '@/constants/enums/themes';
import _ from 'lodash';
type Props = {}

const AssetDetails = (props: Props) => {
    const { workData, ticketData } = useContext(WorkViewContext) || {};

  


    return (
        <div>
            <div className='w-full'>
                <div className='grid grid-cols-1'>
                    <div className='w-full'>
                        <ABDisplaySectionLabel>Asset</ABDisplaySectionLabel>
                        <span className={`${LabelColor.SECONDARY}`}>{_.get(ticketData, "asset.name")}</span>
                    </div>
                   {(_.get(workData, "assetVariation") && _.get(workData, "assetVariation").length > 0) &&  <div className='w-full'>
                        <ABDisplaySectionLabel>Variations Involved</ABDisplaySectionLabel>
                        <div className={`${ContainerBgColor.PRIMARY} p-1 rounded`}>
                            <ul className={`grid grid-cols-1 text-md pl-3 list-disc list-inside w-full ${LabelColor.SECONDARY}`}>
                                {(_.get(workData, "assetVariation") && _.get(workData, "assetVariation").length > 0) &&
                                    <>
                                        {_.get(workData, "assetVariation").map((item: any) =>
                                            <li className='w-full'>
                                                {item?.model} {item?.propertyCode ? `(${item?.propertyCode})` : ""}
                                            </li>
                                        )}
                                    </>
                                }
                            </ul>
                        </div>
                    </div>}
                    {/* <div className='w-52'> <WorkSectionHeader>Submission Department</WorkSectionHeader></div> */}


                </div>


            </div>
        </div>
    )
}

export default AssetDetails