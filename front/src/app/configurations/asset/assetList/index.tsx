import React, { useState } from 'react'
import HeaderDetails from '@/components/ui/headers/header-details'
import ACDataTable from '@/components/tables/data-table';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_ASSETS, GET_ALL_MANUFACTURER } from '@graphql/operations/asset/assetQueries';
import ABTransition from '@/components/customs/transitions/ABTransition';
import _ from 'lodash';
import { FrontPath } from '@/constants/enums/paths';
import ActionButtons from "@admin/components/common/action-buttons";
import { isMobile } from 'react-device-detect';
import CodeLabel from '@/components/customs/labels/codeLabel';
import { ContainerBgColor, LabelColor } from '@/constants/enums/themes';

type Props = {}
type StateType = {
  searchArgs: { isSearch?: boolean, description?: string } | null
}
const dataPerPage = 20

const AssetListApp = (props: Props) => {
  const [state, setState] = useState<StateType>({ searchArgs: null })

  let queryVar: any = {
    "searchArg": null,
    perPage: dataPerPage,
    page: 1,
  }

  const { data: allAssets, refetch } = useQuery(GET_ALL_ASSETS, {
    variables: queryVar,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  let columns: any = [
    {
      title: "Name",
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      //   width: 90,
      // render: (text: any) => (
      //   <>
      //     {text.name}
      //   </>
      // ),
    },
    {
      title: "Prefix",
      dataIndex: 'prefix',
      key: 'prefix',
      align: 'left',
    },
    {
      title: "Custom Count",
      dataIndex: 'count',
      key: 'count',
      align: 'left',
    },
    // {
    //   title: "System Count",
    //   dataIndex: 'systemCount',
    //   key: 'systemCount',
    //   align: 'left',
    // },
    {
      title: "Description",
      dataIndex: 'description',
      key: 'description',
      align: 'left',
    },
    {
      title: "Handling Dept.",
      dataIndex: 'handlingDepartment',
      key: 'handlingDepartment',
      align: 'left',
      render: (text: any) => (
        <>
          {(text && text.length > 0) ?
            <div className='flex gap-1'>
              {
                text.map((item: any) => (
                    <>
                      <span className={`px-2 text-xs ${ContainerBgColor.SECONDARY} ${LabelColor.PRIMARY}  rounded-full`}> {item?.name}</span>
                    </>
              ))
              }
            </div> : <></>}
        </>
      ),
    }

  ];


  let actionCols = [
    {
      title: "Actions",
      dataIndex: '_id',
      key: 'actions',
      align: 'center',
      width: 85,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${FrontPath.ASSET_FORM}/${id}`}
          detailsUrl={`${FrontPath.ASSET_VARIATIONS_VIEW}/${id}`}
        // editUrl={`${ROUTES.TAGS}/${id}/edit`}
        // deleteModalView="DELETE_TAG"
        />
      ),
    },
  ]

  if (isMobile) {
    columns = [...actionCols, ...columns]
  } else {
    columns = [...columns, ...actionCols]
  }


  const getSearchInput = (data: any) => {
    if (data.searchText && data.searchText != '') {
      let payload = {
        "isSearch": true,
        "description": data?.searchText
      }
      setState((p) => ({ ...p, searchArgs: payload }))
      refetch({
        "searchArg": payload,
        perPage: dataPerPage,
        page: 1,
      })


    } else {
      setState((p) => ({ ...p, searchArgs: null }))
      refetch({
        "searchArg": null,
        perPage: dataPerPage,
        page: 1,
      })
    }
  }


  const pageChange = (page: number) => {

    refetch({
      searchArg: state.searchArgs,
      perPage: dataPerPage,
      page: page,
    })
  }



  return (
    <div className='pb-10'>

      <HeaderDetails
        searchInput={getSearchInput}
        title={'Assets'}
        buttonName={'+ Add New'}
        buttonRoute={FrontPath.ASSET_FORM}
      />
      {
        (allAssets && _.get(allAssets, "assets.data")) &&
        <ABTransition>
          <ACDataTable pageChange={pageChange} paginationInfo={_.get(allAssets, "assets.paginatorInfo")} columns={columns} data={_.get(allAssets, "assets.data")} />
        </ABTransition>
      }


    </div>
  )
}

export default AssetListApp