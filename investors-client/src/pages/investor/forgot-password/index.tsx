import InvEmailCheckingFPView from '@/components/auth/investor/check-investor-email-forgot-pass'
import AuthPageContainer from '@/components/layouts/auths/authPageContainer'
import React from 'react'

type Props = {}

const ForgotPassword = (props: Props) => {
  return (
    <div>
      <AuthPageContainer>
        <>
          <InvEmailCheckingFPView  />
        </>
      </AuthPageContainer>
    </div>
  )
}

export default ForgotPassword