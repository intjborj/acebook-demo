import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import InvIdCheckingView from '@/components/auth/investor/check-investor-id';
import AuthPageContainer from '@/components/layouts/auths/authPageContainer';
import InvestorRegForm from '@/components/auth/investor/investor-registration-form';
import AuthLayout from '@/components/layouts/auths/authLayout';
import HaveAccountLink from '@/components/auth/investor/components/haveAccountLink';
import BorderDashed from '@/components/ui/border';
import HaveAccountContainer from '@/components/auth/investor/components/haveAccountContainer';

export default function InvestorRegistrationIndex() {
    const router = useRouter();
    const { t } = useTranslation('common');
    return (
        <>
            <AuthPageContainer>

                <AuthLayout>

                    <InvestorRegForm />
                    <HaveAccountContainer/>
                </AuthLayout>
            </AuthPageContainer>
        </>
    );
}


export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common', 'faq'])),
        },
    };
};
