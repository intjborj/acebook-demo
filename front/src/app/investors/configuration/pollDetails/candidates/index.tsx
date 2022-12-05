import BreadcrumbSolidBg from '@/components/ui/breadcrumps/breadcrumpSolidBg'
import React, { useEffect, useState } from 'react'
import InvConfigContainer from '../../components/investorConfigContainer'
import CandidateForm from './candidateForm'
import { useQuery } from '@apollo/client';
import { GET_SPEC_POLL_DETAILS } from '@graphql/operations/investors/investorsQueries';

import _ from 'lodash';

type Props = {
  id?: string
  defaults?: any;
}
type StateType = {}

const SpecInvPollDetail = ({id, defaults}: Props) => {

  

  const breadcrumb = [{
    title: "Poll Period",
    route: "/investors/configuration",
    isHome: true,
    isCurrent: false
  },
  {
    title: "Candidates",
    route: "#",
    isHome: false,
    isCurrent: true
  },
  ]

 

  return (
    <div>
      <InvConfigContainer isSpecific={true}>
        <>
          <BreadcrumbSolidBg data={breadcrumb} />
          {defaults && <CandidateForm defaultValues={defaults} />}
        </>
      </InvConfigContainer>
    </div>
  )
}

export default SpecInvPollDetail