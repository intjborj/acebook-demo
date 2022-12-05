
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import LoginView from '@/components/auth/login-form';
import Logo from '@/components/ui/logo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import InvIdCheckingView from '@/components/auth/investor/check-investor-id';
import AuthPageContainer from '@/components/layouts/auths/authPageContainer';
import InvEmailCheckingView from '@/components/auth/investor/check-investor-email';

export default function InvestorIdPage() {
    const router = useRouter();
    const { searchType, id, ...restQuery } = router.query;

    const { t } = useTranslation('common');
    return (
        <>
            <AuthPageContainer>
                <>
                    <InvEmailCheckingView idNumber={id as string} />
                </>
            </AuthPageContainer>
        </>
    );
}


// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale!, ['common', 'faq'])),
//         },
//     };
// };
