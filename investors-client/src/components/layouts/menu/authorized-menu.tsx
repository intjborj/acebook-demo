import React from 'react'
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { siteSettings } from '@/settings/site';
import Avatar from '@/components/ui/avatar';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { avatarPlaceholder } from '@/lib/placeholders';
import { UserOutlinedIcon } from '@/components/icons/user-outlined';
import { useLogout, useUser } from '@/framework/user';
import { ROUTES } from '@/lib/routes';
import _ from 'lodash';
import { getAuthCredentials, hasAccess } from "@utils/auth-utils";
import path from "path";

const AuthorizedMenu: React.FC<{ minimal?: boolean }> = ({ minimal }) => {
  const { mutate: logout } = useLogout();
  const { me } = useUser();
  const router = useRouter();
  const { t } = useTranslation('common');
  const { user: cookieUser } = getAuthCredentials();


  function handleClick(path: string) {
    router.push(path);
  }

  return (
    <Menu
      as="div"
      className="relative inline-block ltr:text-left rtl:text-right"
    >
      <Menu.Button className="flex items-center focus:outline-none">
        {minimal ? (
          <UserOutlinedIcon className="h-5 w-5" />
        ) : (
          <Avatar
            fileName={_.get(cookieUser, 'profilePicture')}
            title="user name"
            className="h-10 w-10"
          />


        )}
        <span className="sr-only">{t('user-avatar')}</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className={cn(
            'absolute mt-1 w-48 rounded bg-white pb-4 shadow-700 focus:outline-none ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left',
            {
              '!mt-2': minimal,
            }
          )}
        >
          <Menu.Item>
            <li className="flex w-full items-center justify-between bg-accent-500 px-6 py-4 text-xs font-semibold capitalize text-light focus:outline-none ltr:text-left rtl:text-right">
              <span>Points</span>
              {/* <span>{t('text-points')}</span> */}
              <span>{me?.wallet?.available_points ?? 0}</span>
            </li>
          </Menu.Item>

          <Menu.Item >
            {/* {({ active }) => ( */}
            <li>
              <button
                onClick={() => handleClick(`/profile`)}
                className={cn(
                  'block w-full py-2.5 px-6 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent focus:outline-none ltr:text-left rtl:text-right',
                  'text-heading'
                  // active ? 'text-accent' : 'text-heading'
                )}
              >
                Profile
              </button>
            </li>
            {/* )} */}
          </Menu.Item>
          <Menu.Item >
            {/* {({ active }) => ( */}
            <li>
              <button
                onClick={() => handleClick(`/departments/${_.get(cookieUser, 'departmentOnDuty._id')}`)}
                className={cn(
                  'block w-full py-2.5 px-6 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent focus:outline-none ltr:text-left rtl:text-right',
                  'text-heading'
                  // active ? 'text-accent' : 'text-heading'
                )}
              >
                My Department
              </button>
            </li>
            {/* )} */}
          </Menu.Item>
          {/* ))} */}
          <Menu.Item>
            <li>
              <button
                onClick={() => router.replace(ROUTES.LOGOUT)}
                // onClick={() => logout()}
                className={cn(
                  'block w-full py-2.5 px-6 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent focus:outline-none ltr:text-left rtl:text-right'
                )}
              >
                Logout
                {/* {t('auth-menu-logout')} */}
              </button>
            </li>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AuthorizedMenu;
