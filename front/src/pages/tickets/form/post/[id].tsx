import React, { useEffect, useState } from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { adminOnly } from '@/utils/auth-utils';
import PromotionSliders from '@/components/promotions/promotions';
import TicketForm from '@/app/tickets/form';
import ModClassicLayout from '@/components/layouts/mod-classic';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_POST, GET_POSTS } from '@graphql/operations/posts/postQueries';
import _ from 'lodash';

import { getAuthCredentials } from '@/utils/auth-utils';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { TicketFormValues } from '@/types/tickets/ticketType';
import moment from 'moment';
import { extractAttch, extractFileBlobDynamic } from '@/services/extractions';
import { PostAttachmentUploadPath, PostUploadPath } from '@/constants/uploadPaths';
type Props = {}
type StateType = {
  postDef?: any;
  loading?: boolean;
}

const breadcrumbs = [
  {
    title: 'Posts',
    route: '/',
    isHome: true,
  },
  {
    title: 'Create Ticket',
    route: '',
    isCurrent: true,
  },
];


const PostTicketForm: NextPageWithLayout = () => {
  const { user } = getAuthCredentials();
  const { query } = useRouter();
  const { searchType, id, ...restQuery } = query;
  const [state, setState] = useState<StateType>({
    postDef: {},
    loading: true
  })

  let queryVar = {
    id: id,
    type: "specific",
    skip: 0,
  }

  const { data: specPost, refetch, loading: postLoading } = useQuery(GET_POST, {
    variables: queryVar,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });


  const defaultProcess = async () => {
    let getAttBlob: any[] = []
    
    if (_.get(specPost, "post.data.attachments")) {
      let imageAttch = extractAttch(_.get(specPost, "post.data.attachments"), "image")
      getAttBlob = await extractFileBlobDynamic({
        attachments:imageAttch,
        type: "posts",
        completePath: PostAttachmentUploadPath({ id:  _.get(specPost, "post.data.createdBy._id"), type: 'image' })
      })
    }
    

    let postDefault = {
      requestedBy: _.get(specPost, "post.data.createdBy"),
      createdBy: user,
      description: _.get(specPost, "post.data.content"),
      dateRequested: moment(_.get(specPost, "post.data.created_at")).format('YYYY-MM-DDTHH:mm'),
      // dateRequested: moment(_.get(specPost, "post.data.created_at")).format('YYYY-MM-DD'),
      requestingDepartment: _.get(specPost, "post.data.createdBy.departmentOnDuty"),
      serviceDepartment: _.get(user, "departmentOnDuty"),
      postOrigin: _.get(specPost, "post.data._id"),
      status: "draft",
      attachments_image: getAttBlob
    }
    setState((p) => ({ ...p, postDef: postDefault }))

    setTimeout(() => {
      setState((p) => ({ ...p, loading: false }))
    }, 100);
  }



  useEffect(() => {

    if (specPost) {
      defaultProcess()
    }

  }, [specPost])


  return (
    <>
      <ModClassicLayout breadcrumb={breadcrumbs}>
        <>
          {state.loading ? <Spinner /> : <TicketForm postDefault={state.postDef} />}
        </>
      </ModClassicLayout>
    </>
  )
}
PostTicketForm.getLayout = getLayout;

PostTicketForm.authenticate = {
  permissions: adminOnly,
};

export default PostTicketForm