import { FBCatFormValues } from '@/types/feedbacks/feedbackType';
import React from 'react'
import { useForm } from 'react-hook-form';
import Input from '@admin/components/ui/input';
import Button from '@admin/components/ui/button';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { useMutation } from '@apollo/client';
import { UPSERT_FBCATEGORY, UPSERT_FBQUESCATEGORY } from '@graphql/operations/feedbacks/feedbackMutations';
import { toast } from 'react-toastify';
import FormQuestion from './formQuestion';

type Props = {
    defaultValues ?:any;
    itemId?: any;
}

const FbCategoryForm = ({defaultValues, itemId}: Props) => {

    const [upsertCat] = useMutation(UPSERT_FBQUESCATEGORY);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setValue,
        watch
    } = useForm<FBCatFormValues>({
        defaultValues: defaultValues?? {},
        // defaultValues: defaultValues ?? {},

        // resolver: yupResolver(defaultValues ? accValidationSchemaUpdate : accValidationSchema),
    });

    const onSubmit = (data: any) => {
        let payload = {
            categoryId:  itemId,
            category: {
                name: data.name,
                color: data.color,
                icon: data.icon,
                description: data.description,
                _id: itemId
            },
            questions: data.submQuestions
        }

      

        if (confirm("Are you sure you want to save details?")) {


            upsertCat({
                variables: {
                    input: payload,
                },
            })
                .then((resp) => {
                    toast.success('Category successfully saved');
                })
                .catch((error) => {
                    toast.error('Category failed to save');
                });
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="my-5 flex flex-wrap sm:my-8">
                    <Description
                        title={'Basic Information'}
                        details={'Add category details and necessary information from here'}
                        className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
                    />

                    <Card className="w-full sm:w-8/12 md:w-2/3">
                        <div className="grid  gap-3 md:grid-cols-1 lg:grid-cols-1">
                            <div>
                                <Input
                                    label={'Category Name*'}
                                    {...register('name')}
                                    error={errors.name?.message!}
                                    variant="outline"
                                    className="mb-5"
                                />
                            </div>
                            <div>
                                <Input
                                    label={'Description'}
                                    {...register('description')}
                                    error={errors.description?.message!}
                                    variant="outline"
                                    className="mb-5"
                                />
                            </div>
                            <div>
                                <Input
                                    label={'Color'}
                                    {...register('color')}
                                    error={errors.color?.message!}
                                    variant="outline"
                                    className="mb-5"
                                />
                            </div>
                             <div>
                                <Input
                                    label={'Icon'}
                                    {...register('icon')}
                                    error={errors.icon?.message!}
                                    variant="outline"
                                    className="mb-5"
                                />
                            </div>
                        </div>

                    </Card>

                </div>

                <FormQuestion itemId={itemId} control={control} register={register} getValues={getValues} setValue={setValue} watch={watch}/>

                <div className="text-end mb-4 ">
                    <Button loading={false}>Save Details</Button>
                </div>
            </form>
        </div>
    )
}

export default FbCategoryForm