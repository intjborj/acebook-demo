import Input from '@admin/components/ui/input';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { PropForm } from '@/types/forms/propHookForm'
import ImageUpload from '@/components/upload/image';
import WorkAttPreviews from './previews';

type Props = {
  hookFormProp: PropForm;
};
const WorkAttachments = ({ hookFormProp }: Props) => {
  const { register, errors, getValues, setValue, watch } = hookFormProp
  return (
    <div className="my-5 flex flex-wrap sm:my-8">
      <Description
        title={'Attchments'}
        details={'Attach work documents here'}
        className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">

        <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2">

          <div className='w-10 text-slate-500'>
            <ImageUpload
              register={register}
              getValues={getValues}
              setValue={setValue}
              watch={watch} />
          </div>
        </div>
        <div>
          <WorkAttPreviews hookFormProp={hookFormProp} />
        </div>



      </Card>
    </div>
  )
}

export default WorkAttachments