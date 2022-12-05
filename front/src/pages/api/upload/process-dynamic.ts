import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from 'formidable';
import * as getRawBody from 'raw-body';
import { template } from 'lodash';
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

type FormReq = {
    fieldName: string;
    fieldValue: string;
}

type ProcessedFiles = Array<[string, File]>;
type ProcessedString = Array<FormReq>;



const UploadProcessDynamic = async (req: NextApiRequest, res: NextApiResponse, pathUpload: string) => {
    let status = 200,
        resultBody = { status: 'ok', message: 'Files were uploaded successfully' },
        reqbody = { code: '' };

    // let formdd = formidable({ multiples: true });
    // formdd.parse(req, (err, fields, files) => {
    //     if (!err) {
    //         req.body = fields; // sets the body field in the request object
    //         // req.files = files; // sets the files field in the request object
    //     }
    // })

    //  form11.parse(req, (err, fields, files) => {
    // console.log("|||||||||")
    // console.log(fields)
    // console.log("|||||||||")
    //     reqbody.code = fields.code as string

    // });









    /* Get files using formidable */
    const dataForm: ProcessedString = [];
    const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
        const form = new formidable.IncomingForm();

        const files: ProcessedFiles = [];

        form.on('file', function (field, file) {
            files.push([field, file]);
        })
        form.on('field', (fieldName, fieldValue) => {
            dataForm.push({ fieldName, fieldValue });
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

  


    // const dataForm = await new Promise<ProcessedString | undefined>((resolve, reject) => {

    //     const dataForm: ProcessedString =[] ;
    //     const form11 = new formidable.IncomingForm();
    //     form11.on('field', (fieldName, fieldValue) => {
    //         dataForm.push({fieldName,fieldValue});
    //     })
    //     form11.on('end', () => resolve(dataForm));
    //     form11.on('error', err => reject(err));
    //     form11.parse(req, () => {
    //         //
    //     });


    // }).catch(e => {

    //     status = 500;
    //     resultBody = {
    //         status: 'fail', message: 'Upload error'
    //     }
    // });


    let extractPath = dataForm?.filter((item: FormReq) => {
        return item.fieldName === 'path'
    })
   

    if (files?.length) {
        // const json = await req.json();

        /* Create directory for uploads */
        // const targetPath = path.join(process.cwd(), `/public/uploads/${pathUpload}/`);
        const targetPath = path.join(process.cwd(), `/public/uploads/${extractPath ? extractPath[0].fieldValue : pathUpload}/`);

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

export default UploadProcessDynamic;