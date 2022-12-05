import ABContTitle from '@/components/customs/labels/ABContTitle';
import Link from '@/components/ui/link';
import { breadcrumbType } from '@/types/custom';
import Card from '@admin/components/common/card';
import Search from '@admin/components/common/search';
import LinkButton from '@admin/components/ui/link-button';
import Title from '@admin/components/ui/title';
import ABButton, { BtnColorClass } from '../buttons/ABbutton';

type Props = {
  title?: String;
  subtitle?: String | null;
  buttonName?: String;
  buttonRoute?: String;
  showSearch?: boolean;
  searchInput?: any;
  onSearchChangeInput?: any;
};

const HeaderDetails = ({ title,subtitle, buttonName, buttonRoute, showSearch = true, searchInput, onSearchChangeInput }: Props) => {
  const handleSearch = (data: any) => {
    console.log('search data', data);
    if(searchInput){searchInput(data)}
  };

  return (
    <Card className="mb-5 flex flex-col items-center xl:flex-row md:p-4">
      <div className="mb-2 md:w-1/4 xl:mb-0">
        <h1 className="text-xl font-bold text-heading md:pl-5">{title}</h1>
      </div>

     {subtitle &&  <div className='md:w-1/4  md:mr-5  flex justify-end grid content-center'>
        <ABContTitle>
         {subtitle}
        </ABContTitle>
      </div>}

      <div className="ms-auto pt-2 md:pt-0 flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 xl:w-1/2 mx-6">
        {showSearch &&
         <Search onSearchChange={(data:any) =>{onSearchChangeInput ?onSearchChangeInput(data): {}}} onSearch={handleSearch} placeholder='' />}

        {buttonName ?

          <div className='flex justify-center grid content-center'>
            <Link href={buttonRoute ? (buttonRoute as string) : '#'}>
              <ABButton className="md:ms-6  h-12 w-full md:w-auto flex justify-center ">
                <div>
                  <span className="block md:hidden xl:block">{buttonName}</span>
                  <span className="hidden md:block xl:hidden">{buttonName}</span>
                </div>
              </ABButton>
            </Link>
          </div>
          : <></>}


      </div>
    </Card>
  );
};

export default HeaderDetails;
