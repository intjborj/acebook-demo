import React, {useEffect, useState} from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { adminOnly } from '@/utils/auth-utils';
import HeaderDetails from '@/components/ui/headers/header-details';
import ModClassicLayout from '@/components/layouts/mod-classic';
import TicketIndex from '@/app/tickets';
import DashboardLayout from '@/layouts/_dashboard';
import ProfileApp from '@/app/profile';
import ProfileForm from '@/app/profile/form';
import { useRouter } from 'next/router';
import {getAuthCredentials} from "@utils/auth-utils";
import { extractFileBlobDynamic } from '@/services/extractions';
import _, { isEmpty } from 'lodash';
import { ProfilePicUploadPath } from '@/constants/uploadPaths';
import { AccFormSubmission } from '@/types/accounts/accountTypes';
import { useQuery } from '@apollo/client';
import { GET_DETAILED_ACC } from '@graphql/operations/accounts/accountQueries';

type Props = {}

const variables = {
  type: 'grocery',
}
const ProfileUpdate: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { searchType, id: userId, ...restQuery } = query;
  const { user } = getAuthCredentials();
  const [defaults, setDefaults] = useState<AccFormSubmission|null>(null)

  const { data: accData, refetch } = useQuery(GET_DETAILED_ACC, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      "first": 1,
      "page": 1,
      "id": _.get(user, "_id"),
      "type": "SPECIFIC_ID"
    }
  });

 

  const processDefault = async ()=>{
    let getAttBlob = await extractFileBlobDynamic({
      attachments: [{path: _.get(user, "profilePicture"), type: "image"}],
      type: "profiles",
      completePath: ProfilePicUploadPath({ id: _.get(user, "_id") as string})
    })
 
    setDefaults({
      attachments_image: getAttBlob,
      contact: _.get(accData, "accounts.data[0].contact"),
      email: _.get(accData, "accounts.data[0].email"),
      department: _.get(accData, "accounts.data[0].department"),
      departmentOnDuty: _.get(accData, "accounts.data[0].departmentOnDuty")
    })

  }
  

  useEffect(() => {
    if(accData && user){
     processDefault()
    }
  }, [accData])
  
  return (
    <>
      <ModClassicLayout>
        <>
         {!isEmpty(defaults) && <ProfileForm defaults={defaults} id={_.get(user, "_id") as string} />}
        </>
      </ModClassicLayout>
    </>
  )
}
ProfileUpdate.getLayout = getLayout;

ProfileUpdate.authenticate = {
  permissions: adminOnly,
};

export default ProfileUpdate