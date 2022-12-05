import React from 'react'
import Input from '@admin/components/ui/input';
import Button from '@admin/components/ui/button';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { getLayout } from '@/components/layouts/layout';
import { useTranslation } from 'next-i18next';
import Checkbox from '@admin/components/ui/checkbox/checkbox';
import { PropForm } from '@/types/forms/propHookForm';



type Props = {}

const InvestmentDetails = ({ register, errors }: PropForm) => {
    const { t } = useTranslation();


    return (
        <div className="my-5 flex flex-wrap sm:my-8">
            <Description
                title={'Investment Details'}
                details={
                    "Add investment details here"
                }
                className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
                <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                        <Input
                            label={'Investor ID'}
                            {...register('investorId')}
                            error={t(errors.investorId?.message!)}
                            // defaultValue={0}
                            variant="outline"
                            className="mb-5"
                        />
                    </div>
                    <div>
                        <Input
                            label={'Number of Blocks'}
                            {...register('blocks')}
                            error={t(errors.blocks?.message!)}
                            // defaultValue={0}
                            variant="outline"
                            className="mb-5"
                            type='number'
                        />
                    </div>
                    {/* <div>
                        <Input
                            label={'Email'}
                            {...register('email')}
                            error={t(errors.email?.message!)}
                            variant="outline"
                            className="mb-5"
                        />
                    </div> */}
                </div>

            </Card>
        </div>
    )
}

export default InvestmentDetails