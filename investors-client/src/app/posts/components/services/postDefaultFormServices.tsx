import React from 'react';
import { PostFormDefaultType, PostFormValues, PostViewDefaultType } from '@/types/posts/postTypes';
import _ from 'lodash'
import { SelectContainerIcon } from '@/components/ui/select/select-container-icon';
import { PrivacyLabeler } from '../forms/postPrivacy';
import { extractAttch, extractFileBlob } from '@/services/extractions';
import { UPLOAD_LINK } from '@/constants/uploads';

type Props = {
  data?: any;

}

export const postDefaultFormService = async (data: any) => {

  let imageAttch =extractAttch(_.get(data, "attachments"), "image") 
  let fileAttch = extractAttch(_.get(data, "attachments"), "file") 

  let blobImage = extractFileBlob(imageAttch, "images")
  let blobFile = extractFileBlob(fileAttch, "files")


  let defaultPost: PostFormValues = {
    // let defaultPost : PostFormDefaultType = {
    content: _.get(data, "content"),
    privacy: {
      value: _.get(data, "privacy"),
      label: <SelectContainerIcon iconName={_.get(data, "privacy") || ''} label={PrivacyLabeler(_.get(data, "privacy") || '')} />
    },
    taggedDepartments: _.get(data, "taggedDepartments") || [],
    _id: _.get(data, "_id"),
    attachments_image: await blobImage,
    attachments_file: await blobFile,
  }

  let defaultPayload: PostViewDefaultType = {
    postedBy: {
      firstName: _.get(data, "createdBy.firstName"),
      lastName: _.get(data, "createdBy.lastName"),
      department: _.get(data, "createdByDepartment.name")
    },
    postData: defaultPost
  }

  return defaultPayload
}
