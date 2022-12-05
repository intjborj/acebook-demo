import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from 'formidable';
import mv from 'mv'

/* Don't miss that! */
export const config = {
    api: {
        bodyParser: false,
    }
};

type PathUpType = {
    type: string;

}

type ProcessedFiles = Array<[string, File]>;

const UploadProcess = async (req: NextApiRequest, res: NextApiResponse, pathUpload: string) => {
    let status = 200,
        resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

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

        /* Create directory for uploads */
        // const targetPath = `\\\\172.16.12.30\\misbackup\\acebook\\public\\uploads\\${pathUpload}\\`;
        const targetPath = process.env.NODE_ENV == "production" ?  `\\\\172.16.12.30\\misbackup\\acebook\\public\\uploads\\${pathUpload}` : path.join(process.cwd(), `/public/uploads/${pathUpload}/` ) ;
      
      
      
      
        // const targetPath = "\\\\172.16.12.30\\mis\\JACKY\\storage\\acebook\\files\\";

        // const targetPath = "http://172.16.12.30:5000/misbackup/acebook/public/uploads";
        // const targetPath = "C:\Users\ACEMCB\Documents\storage\acebook";
        
        // const targetPath = path.join(process.cwd(), pathUpload);
        // const targetPath = path.join(process.cwd(), pathUpload);
         
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath, {recursive:true});
        }

        /* Move uploaded files to directory */
        for (const file of files) {
            const tempPath = file[1].filepath;

            await fs.copyFile(tempPath, targetPath + file[1].originalFilename);
            // await mv(tempPath, targetPath + file[1].originalFilename,  {mkdirp: true});
            // await fs.rename(tempPath, targetPath + file[1].originalFilename);
        }
    }

    res.status(status).json(resultBody);
}

export default UploadProcess;