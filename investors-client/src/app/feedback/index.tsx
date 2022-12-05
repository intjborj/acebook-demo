import HeaderDetails from '@/components/ui/headers/header-details'
import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_FBCATEGORY, GET_FEEDBACKS, GET_LIST_FBCATQUE } from '@graphql/operations/feedbacks/feedbackQueries';
import TitleWithSort from '@admin/components/ui/title-with-sort';
import ActionButtons from "@admin/components/common/action-buttons";
import { useIsRTL } from '@/utils/locals';
import ACDataTable from '@/components/tables/data-table';
import _, { conforms } from 'lodash';
import { DELETE_FBQUESCATEGORY } from '@graphql/operations/feedbacks/feedbackMutations';
import { toast } from 'react-toastify';
import moment from 'moment';
import ReactTimeAgo from 'react-time-ago';

type Props = {}

const FeedbackApp = (props: Props) => {
  const { alignLeft, alignRight } = useIsRTL();

  const [delCat] = useMutation(DELETE_FBQUESCATEGORY);

  const { data: allFeedbacks, refetch } = useQuery(GET_FEEDBACKS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
console.log("all", allFeedbacks)

  const columns = [
    // {
    //   title: (
    //     <TitleWithSort
    //       title={"Name"}
    //       ascending={true}
    //       isActive={true}
    //     />
    //   ),
    //   className: 'cursor-pointer',
    //   dataIndex: 'name',
    //   key: 'name',
    //   align: alignLeft,
    //   // onHeaderCell: () => onHeaderClick(QueryTagsOrderByColumn.Name),
    // },
    // {
    //   title: "Actions",
    //   dataIndex: '_id',
    //   key: 'actions',
    //   align: 'center',
    //   width: 90,
    //   render: (id: string) => (
    //     <ActionButtons
    //       id={id}
    //     //   editUrl={`/feedback/categories/form/${id}`}
    //       // editUrl={`${ROUTES.TAGS}/${id}/edit`}
    //       // deleteModalView={deleteCat}
    //     //   callbackType={"REMOVE"}
    //     //   callbackFunction={() => deleteCat(id)}
    //     />
    //   ),
    // },
    
    {
      title: "Ago",
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'left',
      width: 200,
      render: (text: string, record: any) => (
       <>
       <ReactTimeAgo date={text} locale="en-US"/>
       </>
      ),
    },
    {
      title: "Category",
      dataIndex: 'category',
      key: 'category',
      align: 'left',
    //   width: 90,
      render: (text: any) => (
       <>
        {text.name} 
       </>
      ),
    },
    {
      title: "Remarks",
      dataIndex: 'remarks',
      key: 'remarks',
      align: 'left',
    //   width: 90,
      render: (text: any) => (
       <>
        {text} 
       </>
      ),
    },
  ];


  return (
    <div className='pt-5'>
      <HeaderDetails
        title={'Feedbacks'}
        // buttonName={'+ Category'}
        // buttonRoute={'/feedback/categories/form'}
      />
      <ACDataTable columns={columns} data={_.get(allFeedbacks, "feedbacks.data")} />
    </div>
  )
}

export default FeedbackApp