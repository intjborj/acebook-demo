import Link from "@/components/ui/link";
import { getIcon } from "@/utils/get-icon";
import * as sidebarIcons from "@/components/icons/sidebar";
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { drawerAtom } from '@/store/drawer-atom';
// import { useUI } from "@contexts/ui.context";

const SidebarItem = ({ href, icon, label }: any) => {
  // const { closeSidebar } = useUI();
  const router = useRouter();
  const [_, closeSidebar] = useAtom(drawerAtom);

  function handleClick(path: string) {
    router.push(path);
    closeSidebar({ display: false, view: '' });
  }
  return (
    <Link
      href={href}
      className="flex w-full items-center text-base text-body-dark text-start focus:text-accent"
    >
      {getIcon({
        iconList: sidebarIcons,
        iconName: icon,
        className: "w-5 h-5 me-4",
      })}
      <span onClick={() => handleClick(href)}>{label}</span>
    </Link>
  );
};

export default SidebarItem;
