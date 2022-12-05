import ImageView from '@/components/attachments/imageView';
// import ImageClick from '@/components/customs/modals/imageClickModal';
// import { fileImport } from '@/services/fileManangement';
// import { AttachmentObj, WorkFormValues } from '@/types/workDetails/workTypes';
// import React, { useContext } from 'react'
// import WorkSectionHeader from './components/layouts/sectionHeader'
// import { WorkViewContext } from '@/app/tickets/works/view';
// import { TicketWorksUploadPath } from '@/constants/uploadPaths';
// type Props = {
//     ticketData?: any;
//     workData?: WorkFormValues;
// }


// const AttachDetails = ({ }: Props) => {
//     const { workData, ticketData } = useContext(WorkViewContext) || {};

//     return (
//         <div className='w-full'>
//             <WorkSectionHeader>Attachments</WorkSectionHeader>
//             <div className='grid grid-cols-2'>
//                 {
//                     workData?.attachments?.map((item: AttachmentObj, index: number) => (
//                         <div className='p-3 drop-shadow-md'>
//                             <ImageClick image={fileImport({ type: "post", fileName: TicketWorksUploadPath({ticketCode:ticketData.code, workCode:workData.code as string, fileName: item.path  }) })}>
//                             {/* <ImageClick image={fileImport({ type: "post", fileName: `ticketworks/${ticketData.code}/${workData.code}/${item.path}` })}> */}
//                                 <ImageView index={index}
//                                     className='rounded-lg object-cover h-48 w-96'
//                                     // className='rounded-lg object-cover object-center '
//                                     fileName={TicketWorksUploadPath({ticketCode:ticketData.code, workCode:workData.code as string, fileName: item.path  })}
//                                     // fileName={`ticketworks/${ticketData.code}/${workData.code}/${item.path}`}
//                                 />
//                             </ImageClick>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }

// export default AttachDetails