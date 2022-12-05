import { useRouter } from 'next/router';
import { Image } from '@/components/ui/image';
import { MapPin } from '@/components/icons/map-pin';
import { useTranslation } from 'next-i18next';
import { formatAddress } from '@/lib/format-address';
import { ROUTES } from '@/lib/routes';
import Link from '@/components/ui/link';
import isEmpty from 'lodash/isEmpty';
import { productPlaceholder } from '@/lib/placeholders';
import EditPackIcon from '@/components/customs/iconPackage/editPack-icon';
import { COMPANY_LOGO } from '@/constants/image';


type ShopCardProps = {
  data: any;
  editPath?: string | null;
  viewPath?: string | null;
};

const LabelDescCard: React.FC<ShopCardProps> = ({ data, editPath, viewPath }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const clickedLink = (event: any, route: string) => {
    event.stopPropagation();
    router.push(route)
  }

  const isNew = false;

  return (

    <div className="flex items-center p-5 border border-gray-200 rounded cursor-pointer relative w-full">
      {isNew && (
        <span className="text-xs text-light px-2 py-1 rounded bg-blue-500 absolute top-2 ltr:right-2 rtl:left-2">
          {t('common:text-new')}
        </span>
      )}
      <div className="w-16 h-16 relative flex shrink-0 items-center justify-center bg-gray-300 rounded-full overflow-hidden">
        <img
          alt={t('common:text-logo')}
          src={`${COMPANY_LOGO}`}
          // layout="fill"
          // objectFit="cover"
        />
      </div>

      <div className="flex flex-col ltr:ml-4 rtl:mr-4 w-full">
        <div className=''>
          <span className="text-lg font-semibold text-heading mb-2 w-full">
            {data?.name}
          </span>
        </div>
        <span className="text-xs text-body flex">
          {/* <MapPin className="w-3.5 h-3.5 ltr:mr-1 rtl:ml-1 text-muted shrink-0" /> */}
          {data?.description}
          {/* {!isEmpty(formatAddress(data?.description))
              ? formatAddress(data?.description)
              : t('common:text-no-address')} */}
        </span>

      </div>
      {editPath && <div className='flex justify-end scale-75 pl-3 content-top' onClick={(event: any) => { editPath ? clickedLink(event, `${editPath}`) : {} }}>
        <EditPackIcon />
      </div>}
    </div>

  );
};

export default LabelDescCard;
