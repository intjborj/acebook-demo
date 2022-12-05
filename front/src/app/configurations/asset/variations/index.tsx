import React from 'react'
import HeaderDetails from '@/components/ui/headers/header-details'
import { AssetType } from '@/types/assets/assetsType'
import _ from 'lodash';
import ACDataTable from '@/components/tables/data-table';
import ABTransition from '@/components/customs/transitions/ABTransition';
import { FrontPath } from '@/constants/enums/paths';
import ActionButtons from "@admin/components/common/action-buttons";
import { isMobile } from 'react-device-detect';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { ARCHIVE_ASSET_VARIATION } from '@graphql/operations/asset/assetMutations';
import { ContainerBgColor, LabelColor } from '@/constants/enums/themes';

type Props = {
    assetData?: AssetType,
    variations?: any[],
    getSearchInput?: (data: any) => void,
    paginationInfo?: any,
    pageChange?: (data: number) => void,
    refetch?: any,
}

const CountLayout = ({ label, value }: { label: string, value?: string | number | null | undefined }) => (
    <>
        {value ? <div className={`${ContainerBgColor.SECONDARY} w-fit rounded-full px-2 `}>
            <span className={` font-semibold ${LabelColor.SECONDARY}`}>{label}</span>
            <span className={`pl-2 font-bold ${LabelColor.PRIMARY}`}>{value}</span>
        </div> : <></>}
    </>

)

const AssetVariationsApp = ({ assetData, variations, getSearchInput, paginationInfo, pageChange, refetch }: Props) => {
    const [archiveAssVar] = useMutation(ARCHIVE_ASSET_VARIATION);

    const archiveVar = (varId: string, isArchive: boolean) => {
        if (confirm("Are you sure you want to archive variation?")) {
            archiveAssVar({
                variables: {
                    input: {
                        _id: varId,
                        isArchived: isArchive
                    }
                },
            })
                .then((resp) => {
                    toast.success('Variation successfully archive');
                    if (refetch) {
                        refetch()
                    }
                    // refetch()
                })
                .catch((error) => {
                    toast.error('Variation failed to archive');
                });
        }
    }


    let columns: any = [
        {
            title: "Model",
            dataIndex: 'model',
            key: 'model',
            align: 'left',
            //   width: 90,
            // render: (text: any) => (
            //   <>
            //     {text.name}
            //   </>
            // ),
        },
        {
            title: "Property Code",
            dataIndex: 'propertyCode',
            key: 'propertyCode',
            align: 'left',
            //   width: 90,
            // render: (text: any) => (
            //   <>
            //     {text.name}
            //   </>
            // ),
        },
        {
            title: "Serial No.",
            dataIndex: 'serialNo',
            key: 'serialNo',
            align: 'left',
            //   width: 90,
            // render: (text: any) => (
            //   <>
            //     {text.mobile}
            //   </>
            // ),
        },
        {
            title: "Manufacturer",
            dataIndex: 'manufacturer',
            key: 'manufacturer',
            align: 'left',
            //   width: 90,
            render: (text: any) => (
                <>
                    {text?.name}
                </>
            ),
        }
        ,
        {
            title: "Supplier",
            dataIndex: 'supplier',
            key: 'supplier',
            align: 'left',
            //   width: 90,
            render: (text: any) => (
                <>
                    {text?.name}
                </>
            ),
        }

    ];


    let actionCols = [{
        title: "Actions",
        dataIndex: '_id',
        key: 'actions',
        align: 'center',
        width: 65,
        render: (id: string, record: any) => (
            <ActionButtons
                id={id}
                editUrl={`${FrontPath.ASSET_VARIATIONS_UPDATE}/${id}?aid=${_.get(assetData, "_id")}`}
                callbackType={"REMOVE"}
                callbackFunction={() => archiveVar(id, record?.isArchived ? false : true)}
            />
        ),
    }
    ]

    if (isMobile) {
        columns = [...actionCols, ...columns]
    } else {
        columns = [...columns, ...actionCols]
    }

    return (
        <div className='pb-10'>
            <HeaderDetails
                searchInput={getSearchInput}
                title={assetData && `Variations of ${_.get(assetData, "name")}`}
                buttonName={'+ Add New'}
                buttonRoute={_.get(assetData, "_id") ? `${FrontPath.ASSET_VARIATIONS_CREATE}/${_.get(assetData, "_id")}` : '#'}
            />

            <div className='text-xs mb-2 flex gap-2'>
                {/* <div className={`${ContainerBgColor.SECONDARY} w-fit rounded-full px-2 `}>
                    <span className={` font-semibold ${LabelColor.SECONDARY}`}>Custom Count</span>
                    <span className={`pl-2 font-bold ${LabelColor.PRIMARY}`}>{assetData?.count}</span>
                </div> */}
                <CountLayout label='Custom Count' value={assetData?.count} />
                <CountLayout label='System Count' value={paginationInfo?.total} />
            </div>
            {
                (variations && variations.length > 0) &&
                <ABTransition>
                    <ACDataTable pageChange={pageChange} paginationInfo={paginationInfo ?? {}} columns={columns} data={variations} />
                </ABTransition>
            }
        </div>
    )
}

export default AssetVariationsApp