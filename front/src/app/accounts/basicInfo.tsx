import Input from '@admin/components/ui/input';
import Button from '@admin/components/ui/button';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { getLayout } from '@/components/layouts/layout';
import { useTranslation } from 'next-i18next';

type Props = {
    register?: any;
    errors?: any;
  };

const AccBasicInfo = ({register , errors } : Props) => {
    const { t } = useTranslation();
  return (
    <>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={'Basic Information'}
          details={'Add user details and necessary information from here'}
          className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2">
            <div>
              <Input
                label={'First Name *'}
                {...register('firstName')}
                error={t(errors.firstName?.message!)}
                variant="outline"
                className="mb-5"
              />
            </div>
            <div>
              <Input
                label={'Middle Name '}
                {...register('middleName')}
                error={t(errors.middleName?.message!)}
                variant="outline"
                className="mb-5"
              />
            </div>
            <div>
              <Input
                label={'Last Name *'}
                {...register('lastName')}
                error={t(errors.lastName?.message!)}
                variant="outline"
                className="mb-5"
              />
            </div>
            <div>
              <Input
                label={'Suffix'}
                {...register('suffix')}
                error={t(errors.suffix?.message!)}
                variant="outline"
                className="mb-5"
              />
            </div> 
            <div>
              <Input
                label={'Name Extension'}
                {...register('nameExtension')}
                error={t(errors.nameExtension?.message!)}
                variant="outline"
                className="mb-5"
              />
            </div>
          </div>

        </Card>
      </div>
    </>
  );
};


export default AccBasicInfo;
