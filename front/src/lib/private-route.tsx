import React, {useEffect} from "react";
import Loader from '@/components/ui/loaders/spinner/spinner';
import { useRouter } from 'next/router';
import { BackArrowRound } from '@/components/icons/back-arrow-round';
import { useUser } from '@/framework/user';
import LoginView from '@/components/auth/login-form';
import { getAuthCredentials, hasAccess } from "@/utils/auth-utils";
import { ROUTES } from '@/lib/routes';
import AccessDeniedPage from "@/components/common/access-denied";
import _ from "lodash";

const PrivateRoute: React.FC<{ authProps: any }> = ({
  children,
  authProps,
}) => {
  const router = useRouter();
  const { token, permissions } = getAuthCredentials();
  const isUser = !!token;
  const hasPermission =
    Array.isArray(permissions) &&
    !!permissions.length &&
    hasAccess(authProps.permissions, permissions);
  React.useEffect(() => {
    if (!isUser) router.replace(ROUTES.LOGIN); // If not authenticated, force log in
  }, [isUser]);

  // React.useEffect(() => {

  //     let data= _.get(window.performance.getEntriesByType("navigation")[0], "type") ;
  //    console.log("types", window.performance.getEntriesByType("navigation")[0])

  //     if(data === "reload"){
  //       console.log("load", data)
  //     }

  // }, [])

  if (isUser && hasPermission) {
    return <>{children}</>;
  }
  if (isUser && !hasPermission) {
    return <AccessDeniedPage />;
  }
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loader showText={false} />;
};

export default PrivateRoute;
