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

const AccCredentials = ({ register, errors }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={'Credentials'}
          details={"Add user's credentials from here"}
          className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={'Username *'}
            {...register('username')}
            error={t(errors.username?.message!)}
            variant="outline"
            className="mb-5"
          />
          <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2">
            <div>
              <Input
                label={'Password'}
                type="password"
                {...register('password')}
                error={t(errors.password?.message!)}
                variant="outline"
                className="mb-5"
              />
            </div>
            <div>
              <Input
               type="password"
                label={'Confirm Password'}
                {...register('confPassword')}
                error={t(errors.confPassword?.message!)}
                variant="outline"
                className="mb-5"
              />
            </div>
          </div>

          <Input
            label={'Restrictions'}
            {...register('restrictionCode')}
            error={t(errors.restrictionCode?.message!)}
            variant="outline"
            className="mb-5"
          />

          
        </Card>
      </div>
    </>
  );
};

export default AccCredentials;
