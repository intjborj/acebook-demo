import HeaderDetails from '@/components/ui/headers/header-details'
import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_FBCATEGORY, GET_LIST_FBCATQUE } from '@graphql/operations/feedbacks/feedbackQueries';
import TitleWithSort from '@admin/components/ui/title-with-sort';
import ActionButtons from "@admin/components/common/action-buttons";
import { useIsRTL } from '@/utils/locals';
import ACDataTable from '@/components/tables/data-table';
import _, { conforms } from 'lodash';
import { DELETE_FBQUESCATEGORY } from '@graphql/operations/feedbacks/feedbackMutations';
import { toast } from 'react-toastify';

type Props = {}

const FeedbackCategoryApp = (props: Props) => {
  const { alignLeft, alignRight } = useIsRTL();

  const [delCat] = useMutation(DELETE_FBQUESCATEGORY);

  const { data: allFbCats, refetch } = useQuery(GET_ALL_FBCATEGORY, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });



  const deleteCat = (id: string) => {
    console.log("deleted", id)

    if (confirm("Are you sure you want to delete category?")) {
      delCat({
        variables: {
          input: {
            categoryId: id
          },
        },
      })
        .then((resp) => {
          toast.success('Category successfully deleted');
          refetch()
        })
        .catch((error) => {
          toast.error('Category failed to delete');
        });
    }
  }

  const columns = [
    {
      title: (
        <TitleWithSort
          title={"Name"}
          ascending={true}
          isActive={true}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      // onHeaderCell: () => onHeaderClick(QueryTagsOrderByColumn.Name),
    },
    {
      title: "Actions",
      dataIndex: '_id',
      key: 'actions',
      align: 'center',
      width: 90,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`/feedback/categories/form/${id}`}
          // editUrl={`${ROUTES.TAGS}/${id}/edit`}
          // deleteModalView={deleteCat}
          callbackType={"REMOVE"}
          callbackFunction={() => deleteCat(id)}
        />
      ),
    },
  ];


  return (
    <div className='pt-5'>
      <HeaderDetails
        title={'Feedback Question Categories'}
        buttonName={'+ Category'}
        buttonRoute={'/feedback/categories/form'}
      />
      <ACDataTable columns={columns} data={_.get(allFbCats, "fbCategorys.data")} />
    </div>
  )
}

export default FeedbackCategoryApp