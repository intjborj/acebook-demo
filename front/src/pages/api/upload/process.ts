import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from 'formidable';
import * as getRawBody from 'raw-body';
// import mv from 'mv'

/* Don't miss that! */
export const config = {
    api: {
        // bodyParser: true,
        bodyParser: false,
    }
};

type PathUpType = {
    type: string;

}

type FormReq ={
    fieldName: string;
    fieldValue: string;
}

type ProcessedFiles = Array<[string, File]>;
type ProcessedString = Array<FormReq>;



const UploadProcess = async (req: NextApiRequest, res: NextApiResponse, pathUpload: string) => {
    let status = 200,
        resultBody = { status: 'ok', message: 'Files were uploaded successfully' },
        reqbody = { code: '' };

    /* Get files using formidable */
    const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
        const form = new formidable.IncomingForm();

        const files: ProcessedFiles = [];

        form.on('file', function (field, file) {
            files.push([field, file]);
        })
        form.on('end', () => resolve(files));
        form.on('error', err => reject(err));
        form.parse(req, () => {
            //

        });
    }).catch(e => {

        status = 500;
        resultBody = {
            status: 'fail', message: 'Upload error'
        }
    });



    if (files?.length) {
        // const json = await req.json();

        /* Create directory for uploads */
        // const targetPath = path.join(process.cwd(), `/public/uploads/${pathUpload}/${req.body.code}/` ) ;
        // const targetPath = path.join(process.cwd(), `/public/uploads/${req.body.path}/` ) ;
        const targetPath = path.join(process.cwd(), `/public/uploads/${pathUpload}/`);

        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath, { recursive: true });
        }

        /* Move uploaded files to directory */
        for (const file of files) {
            const tempPath = file[1].filepath;
            await fs.copyFile(tempPath, targetPath + file[1].originalFilename);
        }
    }

    res.status(status).json(resultBody);
}

export default UploadProcess;