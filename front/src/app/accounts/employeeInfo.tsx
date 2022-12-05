import Input from '@admin/components/ui/input';
import Card from '@/components/common/card';
import Label from '@admin/components/ui/label';
import Description from '@admin/components/ui/description';
import { useTranslation } from 'next-i18next';
import Checkbox from '@admin/components/ui/checkbox/checkbox';
import { useQuery } from '@apollo/client';
import { GET_ALL_DEPTS } from '@/graphql/queries/departments/departmentQueries';
import SelectInput from '@admin/components/ui/select-input';
// import SelectInput from '@admin/components/ui/select-input';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';

type Props = {
  register?: any;
  errors?: any;
  control?: any;
  watch?: any
  isMaster?: boolean
};

const initialState = {
  departmentList: [],
};

const AccEmpInfo = ({ register, watch, errors, control, isMaster }: Props) => {
  const { data: alldepts, refetch } = useQuery(GET_ALL_DEPTS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
  const { t } = useTranslation();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (_.get(alldepts, 'departments.data')) {
      let clonedList = _.cloneDeep(_.get(alldepts, 'departments.data'));

      let departmentList = clonedList.map((item: any) => {
        item.label = (
          <div className="flex items-center space-s-5">
            {/* <span className="flex w-5 h-5 items-center justify-center">
              {getIcon({
                iconList: categoriesIcon,
                iconName: item.value,
                className: "max-h-full max-w-full",
              })}
            </span> */}
            <span>{item.name}</span>
          </div>
        );
        return item;
      });

      setState((p) => ({ ...p, departmentList: departmentList }));
    }
  }, [alldepts]);

  return (
    <>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={'Employee Information'}
          details={
            "Add user's employment details and necessary information from here"
          }
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          {isMaster && <Input
            label={'Position'}
            {...register('position')}
            error={t(errors.position?.message!)}
            variant="outline"
            className="mb-5"
          />}
          <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2">
            {isMaster &&
              <div>
                {/* <Input
                label={'Origin Department'}
                {...register('department')}
                error={t(errors.department?.message!)}
                variant="outline"
                className="mb-5"
              /> */}
                <div className="mb-5">
                  <Label>{t('Origin Department/s *')}</Label>
                  {/* <SelectInput
                  name="department"
                  control={control}
                  options={state.departmentList}
                  isClearable={true}
                  className="mb-5"
                /> */}
                  <SelectInput
                    name="department"
                    {...register('department')}
                    errors={t(errors.department?.message!)}
                    control={control}
                    getOptionLabel={(option: any) => option.name}
                    getOptionValue={(option: any) => option._id}
                    options={
                      _.get(alldepts, 'departments.data')
                        ? _.get(alldepts, 'departments.data')
                        : []
                    }
                    isLoading={false}
                    isMulti={true}
                  />
                </div>
              </div>
            }
            <div>
              {/* <Input
                label={'Department on Duty'}
                {...register('departmentOnDuty')}
                error={t(errors.departmentOnDuty?.message!)}
                variant="outline"
                className="mb-5"
              /> */}
              <Label>{t('Department on Duty *')}</Label>
              <SelectInput
                name="departmentOnDuty"
                {...register('departmentOnDuty')}
                errors={t(errors.departmentOnDuty?.message!)}
                control={control}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option._id}
                options={
                  watch("department")
                    ? watch("department")
                    : []
                }
                // options={
                //   _.get(alldepts, 'departments.data')
                //     ? _.get(alldepts, 'departments.data')
                //     : []
                // }
                isLoading={false}
              />

            </div>
          </div>
          {isMaster &&
            <div className="grid pt-2 md:grid-cols-2 lg:grid-cols-6">
              <div>
                <Checkbox
                  {...register('isActive')}
                  // id="is_active"
                  label={t('is Active')}
                  name={'isActive'}
                  // disabled={Boolean(false)}
                  // disabled={Boolean(is_external)}
                  className="mb-5"
                />
              </div>
              <div>
                <Checkbox
                  {...register('isApprover')}
                  // id="is_approver"
                  label={t('is Approver')}
                  // disabled={Boolean(false)}
                  // disabled={Boolean(is_external)}
                  className="mb-5"
                  name={'isApprover'}
                />
              </div>
            </div>
          }
        </Card>
      </div>
    </>
  );
};

export default AccEmpInfo;
