import { useRouter } from 'next/router';
import { ROUTES } from '@/lib/routes';
import { useTranslation } from 'next-i18next';
import DrawerWrapper from '@/components/ui/drawer/drawer-wrapper';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';
import SidebarItem from './mobile-sidebar-item';

const headerLinks = [
  { href: ROUTES.DEPARTMENT, icon: 'AttributeIcon', label: 'Departments' },
  // { href: ROUTES.MANUFACTURERS, label: 'text-manufacturers' },
  // { href: ROUTES.AUTHORS, label: 'text-authors' },
  // { href: ROUTES.OFFERS, label: 'nav-menu-offer' },
  // { href: ROUTES.HELP, label: 'nav-menu-faq' },
  // { href: ROUTES.CONTACT, label: 'nav-menu-contact' },
];

export default function MobileMainMenu() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [_, closeSidebar] = useAtom(drawerAtom);

  function handleClick(path: string) {
    router.push(path);
    closeSidebar({ display: false, view: '' });
  }

  return (
    <DrawerWrapper>
      <div className="flex flex-col space-y-6 p-5">
        <ul className="flex-grow">
        {/* <ul className="flex-grow"> */}
          {headerLinks.map(({ href, label, icon }) => (
            <li key={`${href}${label}`}>
              <button
                onClick={() => handleClick(href)}
                className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent cursor-pointer"
              >
                {t(label)}
              </button>
            </li>
            // <SidebarItem
            //   key={label}
            //   href={href}
            //   // href={href(shop?.toString()!)}
            //   label={t(label)}
            //   icon={icon}
            // />
          ))}
        </ul>
      </div>
    </DrawerWrapper>
  );
}
