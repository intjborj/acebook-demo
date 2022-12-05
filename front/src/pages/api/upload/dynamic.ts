import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from 'formidable';
import UploadProcess from './process';
import UploadProcessDynamic from './process-dynamic';

/* Don't miss that! */
export const config = {
    api: {
        bodyParser: false,
    }
};

type UploadResult ={
    status: any;
    resultBody: any;
}

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    UploadProcessDynamic(req, res, 'ticketworks')
    // UploadProcess(req, res, '/public/uploads/images/')
    // return  res.status(result?.status).json(result?.resultBody);
}

export default handler;