import _ from "lodash"
import { renamingFiles } from "./uploadPack"

type AttType = {
    path?: string;
    type?: string; //

}


type Props = {
    attachments: any;
    filenameCode?: string; // filename code
    transactionType: string;
    transactionCode: string;
    fileType: string;
}


export type UploadRenamingType = {
    oldFiles: any,
    renamedAllFiles: any,
    renamedFiles: any,
    forRefetchFiles: any, // convert new files as old files
    forSubmissionData: AttType[],
}


export async function uploadRenaming({ attachments, filenameCode, transactionType, transactionCode, fileType }: Props): Promise<UploadRenamingType> {
    let forSubmissionData: AttType[] = [] // restructured object

    let newFiles: any
    let oldFiles: any
    let renamedFiles: any = []
    let renamedAllFiles: any = []
    let forRefetchFiles: any = []

    if (attachments) {
        let allFilenames: any = []

        newFiles = attachments.filter((item: any) => {
            return item.isOld !== 1
        })
        oldFiles = attachments.filter((item: any) => {
            return item.isOld === 1
        })

        let oldFilenames = _.map(oldFiles, "name")





        //Upload only new files
        if (newFiles.length > 0) {

            let renamed = await renamingFiles({
                attachments: newFiles,
                type: transactionType,
                initialFilename: `${transactionCode}_${filenameCode ?? 'new'}`
            })

            renamedFiles = renamed.newFiles

            allFilenames = [...oldFilenames, ...renamed.filenames]


        } else {
            allFilenames = oldFilenames
        }

        renamedAllFiles = [...oldFiles, ...renamedFiles]

        forSubmissionData = allFilenames.map((item: string) => {
            return {
                path: item,
                type: fileType
            }
        })

    }

    forRefetchFiles = renamedAllFiles.map((item: any) => {

        item.isOld = 1
        // let fl = new File([clone], item.name)
        return item
    })


    // console.log("oldFiles", oldFiles)
    // console.log("renamedAllFiles", renamedAllFiles)
    // console.log("renamedFiles", renamedFiles)
    // console.log("forRefetchFiles", forRefetchFiles)


    return {
        oldFiles: oldFiles,
        renamedAllFiles: renamedAllFiles,
        renamedFiles: renamedFiles,
        forRefetchFiles: forRefetchFiles,
        forSubmissionData: forSubmissionData,
    }

}