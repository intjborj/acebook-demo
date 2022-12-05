import Layout from "@components/layouts/admin";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { adminOnly } from "@utils/auth-utils";

export default function TodoPage() {
  
  return (
    <>
     <>
        HELLO
     </>
    </>
  );
}
TodoPage.authenticate = {
  permissions: adminOnly,
};
TodoPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
