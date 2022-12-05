import React from 'react'
import Card from '@/components/common/card';
import { XCircleIcon } from '@/components/icons/xcircle-icon';
import Input from '@admin/components/ui/input';
import Image from 'next/image';
import ImageInputPreview from '@/components/upload/image/imageInputPreview';
import ImagePreview from '@/components/upload/previews/imagePreview';

type Props = {
    data?: any;
    remove?: any;
    candidateChange?: any
}

const SelectedCandidates = ({ data, remove, candidateChange }: Props) => {

    return (
        <div className=' mt-2'>
            {
                data.length > 0 && data.map((item: any, index: number) => (
                    <>
                        <div className='p-3 bg-light shadow rounded flex mb-2'>
                            <div className='bg-teal-600 text-zinc-100 w-6 h-5 flex pb-[1.5rem] justify-center rounded-full'>{index + 1}</div>
                            <div className='pl-2 flex w-full'>
                                <div className='w-[97%]'>  {item.firstName}, {item.lastName}</div>
                                <div className=' w-28 pr-3'>
                                  
                                    <ImageInputPreview hookFormProp={{}} defaultImage={item.thumbnail ?? null} selected={(e:any)=>{ candidateChange ? candidateChange({ _id: item._id, value: e, type: "image" }) : {} }}  />
                                    {/* <ImagePreview attachment={'/img/combo-banner-1.png'} /> */}
                                </div>
                                <div className='grid content-center'>
                                    <Input
                                        placeholder='Custom Vote'
                                        variant="outline"
                                        className=' mr-3'
                                        type='number'
                                        defaultValue={item.customVoteCount}
                                        onBlur={(e: any) => { candidateChange ? candidateChange({ _id: item._id, value: e.target.value, type: "vote" }) : {} }}
                                    />
                                </div>
                                <div className='w-5 cursor-pointer' onClick={() => remove(item)} ><XCircleIcon /></div>
                            </div>
                        </div>
                    </>
                ))
            }

        </div>
    )
}

export default SelectedCandidates