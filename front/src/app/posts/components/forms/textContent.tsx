import TextArea from '@/components/ui/forms/text-area'
import React from 'react'
// import TextArea from "@components/ui/text-area";

type Props = {
  register: any
}

const TextContent = ({ register }: Props) => {
  return (
    <div className='mb-3'>
      <TextArea
        // label={t("text-street-address")}
        {...register("content")}
        // error={"Error"}
        placeholder="Tell us your concerns"
        variant="outline"
        inputClassName='rounded-md'
        className="col-span-2"
      />
    </div>
  )
}

export default TextContent