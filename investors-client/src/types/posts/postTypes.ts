

export type PostFormValues = {
  _id?: string;
  content?: string;
  privacy?: any ;
  attachments?: object[] | [] | undefined;
  created_at?: string | null;
  createdBy?: any | null
  createdByDepartment?: string | null;
  taggedDepartments?: string[] | null;
  tags?: object[] | null;
  ticket?: any;

  tempAttachments?: any
  attachments_image?: any;
  tempAttachments_image?: any;
  attachments_file?: any;
  tempAttachments_file?: any;

};


export type PostedByType = {
  firstName: string;
  lastName: string;
  department: string;
  profilePicture?: string;
}

export type PostFormDefaultType = {
  content?: string;
  privacy?: any;
  taggedDepartments?: any[];
  _id?: string;
}

export type PostViewDefaultType = {
  postedBy: PostedByType;
  postData: PostFormValues;
  // postData: PostFormDefaultType;
}
