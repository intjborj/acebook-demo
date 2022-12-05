import Input from '@admin/components/ui/input';
import Button from '@admin/components/ui/button';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { getLayout } from '@/components/layouts/layout';
import { useTranslation } from 'next-i18next';
import generator from 'generate-password';
import { GET_ALL_RESTRICTIONS } from '@graphql/operations/restrictions/restrictionQueries';
import { useQuery } from '@apollo/client';
import SelectInput from '@admin/components/ui/select-input';
import _ from 'lodash';
import Label from '@admin/components/ui/label';

type Props = {
  register?: any;
  errors?: any;
  autoPassword?: boolean;
  watch?: any;
  isUpdate?: boolean;
  control?: any;
  isMaster?: boolean;
};

const AccCredentials = ({ register, errors, autoPassword = false, watch, isUpdate = false, control, isMaster }: Props) => {
  const { t } = useTranslation();

  var defPassword = "password"
// var defPassword = generator.generate({
//     length: 10,
//     numbers: true
//   });

  const { data: allRestrictions, refetch } = useQuery(GET_ALL_RESTRICTIONS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });



  return (
    <>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={'Credentials'}
          details={"Add user's credentials from here"}
          className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          {isMaster &&
            <Input
              label={'Username *'}
              {...register('username')}
              error={t(errors.username?.message!)}
              variant="outline"
              className="mb-5"
            />
          }
          <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2">
            <div>
              <Input
                label={'Password'}
                type="password"
                {...register('password')}
                error={t(errors.password?.message!)}
                variant="outline"
                className="mb-5"
                defaultValue={isUpdate ? null : (autoPassword ? defPassword : null)}

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
                defaultValue={isUpdate ? null : (autoPassword ? defPassword : null)}
              />
            </div>
          </div>

          {/* <Input
            label={'Restrictions'}
            {...register('restrictionCode')}
            error={t(errors.restrictionCode?.message!)}
            variant="outline"
            className="mb-5"
          /> */}
          {isMaster &&
            <>
              <Label>{t('Restrictions')}</Label>
              <SelectInput
                name="restrictionCode"
                {...register('restrictionCode')}
                errors={t(errors.restrictionCode?.message!)}
                control={control}
                getOptionLabel={(option: any) => option.code}
                getOptionValue={(option: any) => option.code}
                options={
                  _.get(allRestrictions, 'restrictions.data')
                    ? _.get(allRestrictions, 'restrictions.data')
                    : []
                }
                isLoading={false}
                isMulti={true}
              />
            </>
          }


        </Card>
      </div>
    </>
  );
};

export default AccCredentials;
