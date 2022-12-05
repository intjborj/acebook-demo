import { Image } from '@/components/ui/image';
import cn from 'classnames';
import Link from '@/components/ui/link';
import { logoPlaceholder } from '@/lib/placeholders';
import { useSettings } from '@/framework/settings';
import { PROJECT_NAME } from '@/constants/projectFixEnv';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const {
    settings: { logo, siteTitle },
  } = useSettings();

  return (
    // <Link href="/" className={cn('inline-flex', className)} {...props}>
      <span className="relative h-10 w-80 overflow-hidden md:w-96">
      {/* <span className="relative h-10 w-32 overflow-hidden md:w-40"> */}
        <Image
          src={'/img/acebook-logo.png'}
          // src={logo?.original ?? logoPlaceholder}
          alt={PROJECT_NAME}
          layout="fill"
          objectFit="contain"
          loading="eager"
        />
      </span>
    // </Link>
  );
};

export default Logo;
