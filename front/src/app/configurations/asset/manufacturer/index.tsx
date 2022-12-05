import React from 'react'
import HeaderDetails from '@/components/ui/headers/header-details'
import ACDataTable from '@/components/tables/data-table';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_MANUFACTURER } from '@graphql/operations/asset/assetQueries';
import ABTransition from '@/components/customs/transitions/ABTransition';
import _ from 'lodash';
import { FrontPath } from '@/constants/enums/paths';
import ActionButtons from "@admin/components/common/action-buttons";
import { isMobile } from 'react-device-detect';
type Props = {}

const ManufacturerApp = (props: Props) => {

  const { data: allManufact, refetch } = useQuery(GET_ALL_MANUFACTURER, {
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
      title: "Mobile",
      dataIndex: 'mobile',
      key: 'mobile',
      align: 'left',
      //   width: 90,
      // render: (text: any) => (
      //   <>
      //     {text.mobile}
      //   </>
      // ),
    }

  ];


  let actionCols = [
    {
      title: "Actions",
      dataIndex: '_id',
      key: 'actions',
      align: 'center',
      width: 65,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${FrontPath.ASSET_MANUFACTURER_FORM}/${id}`}
        // editUrl={`${ROUTES.TAGS}/${id}/edit`}
        // deleteModalView="DELETE_TAG"
        />
      ),
    }
  ]

  if (isMobile) {
    columns = [...actionCols, ...columns]
  }else{
    columns = [...columns, ...actionCols]
  }



  return (
    <div>

      <HeaderDetails
        title={'Manufacturers'}
        buttonName={'+ Add New'}
        buttonRoute={FrontPath.ASSET_MANUFACTURER_FORM}
      />
      {
        (allManufact && _.get(allManufact, "manufacturers.data")) &&
        <ABTransition>
          <ACDataTable columns={columns} data={_.get(allManufact, "manufacturers.data")} />
        </ABTransition>
      }


    </div>
  )
}

export default ManufacturerApp