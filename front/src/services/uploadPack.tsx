import moment from "moment";

type UploadType = {
    attachments?: any;
    type?: string;
    initialFilename?: string;
    codePaths?: string;
}

const createFile = (bits:any, name:any, options:any) => {
    try {
        // If this fails, we go for Blob
        return new File(bits, name, options);
    } catch (e) {
        // If we're here a new File could not be constructed
        var myBlob:any = new Blob(bits, options || {});
        myBlob.lastModified = new Date();
        myBlob.name = name;
        return myBlob;
    }
};

export const renamingFiles = async ({ attachments, type,initialFilename }: UploadType) => {
  
    let allFilename : string[]= []


    // Object.values(attachments).forEach((file: any, index: number) => {
       
    //     let filename = `${initialFilename}_${index}_${uniqueId(8)}_${getTime()}${extExtract(file.name)}`
    //     allFilename.push(filename)

    //     formData.append('file', file, filename);
    // })


    let newFiles = attachments.map((file: any, index: number)=>{
        let filename = `${initialFilename}_${index}_${uniqueId(8)}_${getTime()}${extExtract(file.name)}`
        let nfile =   new File( [file], filename,{type: file.type})
        allFilename.push(filename)

        return nfile
    })

    return {newFiles: newFiles, filenames: allFilename}
}



export const uploadPack = async ({ attachments, type,initialFilename,codePaths }: UploadType) => {
    /* Add files to FormData */
    const formData = new FormData();
    let allFilename : string[]= []


    Object.values(attachments).forEach((file: any, index: number) => {
       
        // let filename = `${initialFilename}_${index}_${uniqueId(8)}_${getTime()}${extExtract(file.name)}`
        // allFilename.push(filename)

        formData.append('file', file);
        // formData.append('file', file, filename);
    })


    formData.append('path', `/${codePaths}`);
    // formData.append('path', `${type}/${codePaths}`);
    // formData.append('path', `upload/${type}`);
    /* Send request to our api route */
    // const response = await fetch(`/api/upload/${type}`, {
        const response = await fetch('/api/upload/dynamic', {
        method: 'POST',
        body: formData
    });

    const body = await response.json() as { status: 'ok' | 'fail', message: string, filenames: string[] };
    body.filenames = allFilename

    return body;
}

function extExtract(filename: string) {
    let extracted = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;

    let ext = ''
    if (extracted) {
        ext = '.' + extracted[0]
    }


    return ext;
}

function uniqueId(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function getTime() {
    let year = moment().format('YYYY')
    let month = moment().format('M')
    let day = moment().format('D')
    let hour = moment().format('H')
    let min = moment().format('mm')
    let secs = moment().format('ss')

    return `M${month}D${day}Y${year}H${hour}Mn${min}S${secs}`;
}
