import Link from '@/components/ui/link';
import { breadcrumbType } from '@/types/custom';
import Card from '@admin/components/common/card';
import Search from '@admin/components/common/search';
import LinkButton from '@admin/components/ui/link-button';
import Title from '@admin/components/ui/title';

type Props = {
  title?: String;
  buttonName?: String;
  buttonRoute?: String;
};

const HeaderDetails = ({title, buttonName, buttonRoute}: Props) => {
  const handleSearch = () => {
    console.log('fdsafdsafsd');
  };

  return (
    <Card className="mb-8 flex flex-col items-center xl:flex-row">
      <div className="mb-4 md:w-2/4 xl:mb-0">
        <h1 className="text-xl font-semibold text-heading">{title}</h1>
      </div>

     
      {/* <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0 xl:w-1/2"> */}
        <div className="ms-auto flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 xl:w-1/2 mx-6">
        <Search onSearch={handleSearch} />

       {buttonName ? <LinkButton
          href={buttonRoute ? buttonRoute : '/'}
          className="md:ms-6 mx-3 h-12 w-full md:w-auto"
        >
          <span className="block md:hidden xl:block">{buttonName}</span>
          <span className="hidden md:block xl:hidden">{buttonName}</span>
        </LinkButton> : <></>}
      </div>
    </Card>
  );
};

export default HeaderDetails;
