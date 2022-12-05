import { Image } from '@/components/ui/image';
import cn from 'classnames';
import Link from '@/components/ui/link';
import { logoPlaceholder } from '@/lib/placeholders';
import { useSettings } from '@/framework/settings';
import { FilePath } from '@/constants/enums/paths';
import React from 'react'

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const {
    settings: { logo, siteTitle },
  } = useSettings();

  const [imgerror, setImgerror] = React.useState<boolean>(false)

  return (

    <Link href="/" className={cn('inline-flex', className)} {...props}>
      {
        imgerror == false &&
        <span className="relative h-10 w-32 overflow-hidden md:w-40">
          <img
          // <Image
            onError={() => setImgerror(true)}
            src={`${process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_FILE_SERVER_DEV : process.env.NEXT_PUBLIC_FILE_SERVER_PROD}${FilePath.LOGO}`}
            // src={logo?.original ?? logoPlaceholder}
            alt={siteTitle || 'Acebook Logo'}
            // layout="fill"
            // objectFit="contain"
            loading="eager"
          />
        </span>
      }
    </Link>

  );
};

export default Logo;
