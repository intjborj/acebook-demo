import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import ActionWorkDesc from './actionWorkDesc';
import { PropForm } from '@/types/forms/propHookForm';
import { WorkFormValues } from '@/types/workDetails/workTypes';
import ABButton from '@/components/ui/buttons/ABbutton';
import { useMutation } from '@apollo/client';
import { UPSERT_TICKET, UPSERT_WORKDETAIL } from '@graphql/operations/tickets/ticketMutation';
import { toast } from 'react-toastify';
import moment from 'moment';
import TimeDetails from './timeDetails';
import WorkAttachments from './attachments';
import { uploadAttachment } from '@/services/uploading';
import { renamingFiles, uploadPack } from '@/services/uploadPack';
// type Props = {
//     ticketId?: string;
//     workId?: string;
//     defaultVals?: WorkFormValues;
// }

// type AttType = {
//     path?: string;
//     type?: string;
// }

// type UploadProcType = {
//     newImages: string;
//     data: any;
//     codePaths: string;
// }

// const WorkFormApp = ({ ticketId, defaultVals, workId }: Props) => {


//     const hookFormProp = useForm<WorkFormValues>({
//         //@ts-ignore
//         defaultValues: defaultVals ?? {},
//         // resolver: yupResolver(ticketValidationSchema),
//     });


//     const {
//         register,
//         handleSubmit,
//         control,
//         formState: { errors },
//         watch,
//         reset,
//         setValue,
//         getValues
//     } = hookFormProp

//     const [upsertDet] = useMutation(UPSERT_WORKDETAIL);

//     const uploadProcess = async ({ newImages, data, codePaths }: UploadProcType) => {
//         console.log("codePaths", codePaths)
//         let newUpsFn = await uploadPack({
//             attachments: newImages,
//             type: 'ticketworks',
//             initialFilename: `tckwrk_${data.workCode ?? 'new'}`,
//             codePaths: codePaths
//         })
//     }

//     const processSubmission = async (data: WorkFormValues, type: string) => {
//         let modAttachments: AttType[] = []

//         let newFiles: any
//         let oldFiles: any
//         let renamedFiles: any = []
//         let renamedAllFiles: any = []
//         let forRefetchFiles: any = []

//         if (data.attachments_image) {
//             let allFilenames: any = []

//             newFiles = data.attachments_image.filter((item: any) => {
//                 return item.isOld !== 1
//             })
//             oldFiles = data.attachments_image.filter((item: any) => {
//                 return item.isOld === 1
//             })

//             let oldFilenames = _.map(oldFiles, "name")





//             //Upload only new files
//             if (newFiles.length > 0) {

//                 let renamed = await renamingFiles({
//                     attachments: newFiles,
//                     type: 'ticketworks',
//                     initialFilename: `tckwrk_${data.workCode ?? 'new'}`
//                 })

//                 renamedFiles = renamed.newFiles

//                 allFilenames = [...oldFilenames, ...renamed.filenames]


//             } else {
//                 allFilenames = oldFilenames
//             }

//             renamedAllFiles = [...oldFiles, ...renamedFiles]

//             modAttachments = allFilenames.map((item: string) => {
//                 return {
//                     path: item,
//                     type: 'image'
//                 }
//             })

//         }

//         forRefetchFiles = renamedAllFiles.map((item: any) => {
        
//             item.isOld = 1
//             // let fl = new File([clone], item.name)
//             return item
//         })


//         console.log("oldFiles", oldFiles)
//         console.log("renamedAllFiles", renamedAllFiles)
//         console.log("renamedFiles", renamedFiles)
//         console.log("forRefetchFiles", forRefetchFiles)


//         let payload = {
//             // descActualWorkDone: data.descActualWorkDone,
//             _id: workId ?? null,
//             findings: data.findings,
//             dateTimeStarted: data.dateTimeStarted,
//             dateTimeFinished: data.dateTimeFinished,
//             descActualWorkDone: data.descActualWorkDone,
//             ticketId: ticketId,
//             workStatus: type,
//             attachments: modAttachments
//         }


//         upsertDet({
//             variables: {
//                 input: payload,
//             },
//         })
//             .then((resp) => {


//                 if (renamedFiles.length > 0) {  

//                     uploadProcess({
//                         newImages: renamedFiles,
//                         data: data,
//                         codePaths: `${_.get(resp, "data.upsertWorkDetail.ticket.code")}/${_.get(resp, "data.upsertWorkDetail.code")}`,
//                     })

//                     setValue("attachments_image", renamedAllFiles)
//                 }

//                 toast.success('Work successfully saved');
//                 if (!workId) { reset() }
//             })
//             .catch((error) => {

//                 toast.error('Work failed to save');
//             });


//     }




//     const onSubmit = async (data: WorkFormValues, type: string) => {
//         if (confirm("Are you sure you want to create work for this ticket?")) {
//             processSubmission(data, type)
//         }

//     }


//     return (
//         <div>
//             <form >
//                 <TimeDetails hookFormProp={hookFormProp as PropForm} />
//                 <ActionWorkDesc hookFormProp={hookFormProp as PropForm} />
//                 <WorkAttachments hookFormProp={hookFormProp as PropForm} />

//                 <div className='flex justify-end text-end'>
//                     <div className=" mb-4 flex">

//                         <div><ABButton onClick={handleSubmit(e => onSubmit(e, "draft"))}  >Save As Draft</ABButton></div>
//                         <div><ABButton onClick={handleSubmit(e => onSubmit(e, "completed"))} >Submit Final</ABButton></div>
//                         {/*                     
//                       <ABButton onClick={handleSubmit(e => onSubmit(e, "draft"))}  loading={false}>Save As Draft</Button>
//                     <ABButton onClick={handleSubmit(e => onSubmit(e, "pending"))} loading={false}>Submit Final</Button> */}
//                     </div>
//                 </div>

//             </form>
//         </div>
//     )
// }

// export default WorkFormApp