import React from 'react';
import { PostFormDefaultType, PostFormValues, PostViewDefaultType } from '@/types/posts/postTypes';
import _ from 'lodash'
import { SelectContainerIcon } from '@/components/ui/select/select-container-icon';
import { PrivacyLabeler } from '../forms/postPrivacy';
import { extractAttch, extractFileBlob, extractFileBlobDynamic } from '@/services/extractions';
import { UPLOAD_LINK } from '@/constants/uploads';
import { PostAttachmentUploadPath } from '@/constants/uploadPaths';

type Props = {
  data?: any;

}

const attExtractProcess = async (attachments: any, type: string, userId: string) => {
  let getAttBlob = await extractFileBlobDynamic({
    attachments: attachments,
    type: 'posts',
    completePath: PostAttachmentUploadPath({ id: userId, type: type })
  })

  getAttBlob.map((item: any) => {
    item.isOld = 1
    return item
  })

  return getAttBlob
}

export const postDefaultFormService = async (data: any) => {


  let imageAttch = extractAttch(_.get(data, "attachments"), "image")
  let fileAttch = extractAttch(_.get(data, "attachments"), "file")

  let blobImage = await attExtractProcess(imageAttch, "image", _.get(data, "createdBy._id"))
  let blobFile = await attExtractProcess(fileAttch, "file", _.get(data, "createdBy._id"))

  // let blobImage = extractFileBlob(imageAttch, "images")
  //   let blobFile = extractFileBlob(fileAttch, "files")


  let defaultPost: PostFormValues = {
    // let defaultPost : PostFormDefaultType = {
    content: _.get(data, "content"),
    privacy: {
      value: _.get(data, "privacy"),
      label: <SelectContainerIcon iconName={_.get(data, "privacy") || ''} label={PrivacyLabeler(_.get(data, "privacy") || '')} />
    },
    taggedDepartments: _.get(data, "taggedDepartments") || [],
    _id: _.get(data, "_id"),
    attachments_image:  blobImage,
    attachments_file:  blobFile,
    // attachments_image: await blobImage,
    // attachments_file: await blobFile,
  }

  let defaultPayload: PostViewDefaultType = {
    postedBy: {
      _id: _.get(data, "createdBy._id"),
      firstName: _.get(data, "createdBy.firstName"),
      profilePicture: _.get(data, "createdBy.profilePicture"),
      lastName: _.get(data, "createdBy.lastName"),
      department: _.get(data, "createdByDepartment.name")
    },
    postData: defaultPost
  }


  return defaultPayload
}
