import React from 'react'
import _ from 'lodash';
import NotifDropdownWeb from './menuDropdown/notification/web';
import ProfileMenu from './menuDropdown/profile';
import FucntionRestriction from '@/app/restrictions/system/function';

const AuthorizedMenu: React.FC<{ minimal?: boolean }> = ({ minimal }) => {

  return (
    <>
      <ProfileMenu />
      {/* <FucntionRestriction code='VIEW_NOTIFICATION_FUNC' disableCode='DISABLE_VIEW_NOTIFICATION_FUNC'> */}
      <FucntionRestriction  disableCode='DISABLE_VIEW_NOTIFICATION_FUNC'>
        <NotifDropdownWeb />
      </FucntionRestriction>
    </>

  );
};

export default AuthorizedMenu;
