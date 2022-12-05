// Dependencies
import React from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
// Constants
import { PostFormValues } from '@/types/posts/postTypes';
import { PostContextRd } from '@/reducers/posts/postContextRd';
import { ARCHIVE_POST } from '@graphql/operations/posts/postMutation';
// Hooks
import { useRouter } from "next/router";
import { getAuthCredentials } from '@/utils/auth-utils';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { VerticalDotsIcon } from '@/components/icons/vertical-dots'
// Local Components
import PostedByDetails from '@/app/posts/components/postedByDetails';
import PostLayout from '@/app/posts/components/postLayout';
import PostTextContent from '@/app/posts/components/postTextContent';
import PostTime from '@/app/posts/components/postTime';
import PostPrivacyView from '@/app/posts/components/postPrivacyView';
import GenComments from '@/app/comments';
import PostTagContainer from '@/app/posts/components/postTagContainer';
import PostAttachments from '@/app/posts/components/attachments';
import PostOptions from '@/app/posts/components/options';
import PostTicket from '@/app/posts/components/postTicket';
import ABDropdownMenuList, { ABDropMenuType } from '@/components/customs/menu/ABDropdownMenuList';
import ABArchiveTag from '@/components/customs/labels/ArchiveTag';
import ArchivedSvg from '@/components/customs/information/archived';
import ABTransition from '@/components/customs/transitions/ABTransition';
import ReactionIcons from './components/reactionIcons';
import Reactions from './components/reactions';

// const GenComments = React.lazy(() => import('@/app/comments'));
// const Reactions = React.lazy(() => import('./components/reactions'));
// const PostedByDetails = React.lazy(() => import('@/app/posts/components/postedByDetails'));
// const ABDropdownMenuList = React.lazy(() => import('@/components/customs/menu/ABDropdownMenuList'));

type Props = {
  data: PostFormValues,
  tags: any,
  index: number,
  isFeed?: boolean,
};

export const PostContext = React.createContext<PostFormValues>({})

const PostIndex = ({ data, tags, index, isFeed }: Props) => {
  const { user } = getAuthCredentials();
  const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
  const postValue: PostFormValues = data
  const router = useRouter();
  const [archivePost] = useMutation(ARCHIVE_POST);
  const { openModal } = useModalAction();

  const archivePostProc = (arhive: boolean) => {
    archivePost({
      variables: {
        input: {
          "_id": _.get(data, '_id'),
          "isArchived": arhive
        },
      },
    })
      .then((resp) => {
        toast.success("Success");
        dispatchPostRd({ type: "refetchPost", active: true })
      })
      .catch((error) => {
        toast.error("Process Failed");
      });
  }


  const optionClicked = async (clicked: any) => {
    switch (clicked) {
      case "edit": {
        openModal('POST_FORM', data);
      } break;
      case "archive": {
        if (confirm("Are you sure you want to change archive status?")) {
          archivePostProc(_.get(data, 'isArchived') ? false : true)
        }
      } break;
      case "ticket":
        router.push(`/tickets/form/post/${_.get(data, '_id')}`)
        // window.open(`/tickets/form/post/${_.get(data, '_id')}`, '_self')
        break;
      default:
        break;
    }
  }


  const postOpts: ABDropMenuType[] = [
    {
      label: "View Post",
      action: () => router.push(`/post/${_.get(data, "_id")}`),
      display: _.get(data, "_id") ? true : false
    },
    {
      label: _.get(data, 'isArchived') ? "Retrieve Post" : "Archive Post",
      action: () => optionClicked("archive"),
      display: _.get(data, "createdBy._id") === _.get(user, '_id')
    },
    {
      label: "Create Ticket",
      action: () => router.push(`/tickets/form/post/${_.get(data, "_id")}`),
      display: _.get(data, "_id") && _.get(data, "ticket._id") == null ? true : false
    },
    {
      label: "Edit",
      action: () => optionClicked("edit"),
      display: _.get(data, "createdBy._id") === _.get(user, '_id')
    },
    {
      label: "Update Ticket",
      action: () => router.push(`/tickets/form/update/${_.get(data, "ticket._id")}`),
      display: _.get(data, "ticket._id") ? true : false
    },
    {
      label: "View Ticket",
      action: () => router.push(`/tickets/view/${_.get(data, "ticket._id")}`),
      display: _.get(data, "ticket._id") ? true : false
    },
  ]


  return (
    <div className="pt-3 " key={'post' + index}>
      {(_.get(data, 'isArchived') && _.get(data, "createdBy._id") !== _.get(user, '_id')) ? <ArchivedSvg /> :
        <PostContext.Provider value={postValue} >
          <PostLayout>
            <div className='flex w-full'>
              <div className=''>
                <PostedByDetails
                  id={_.get(data, 'createdBy._id')} firstName={_.get(data, 'createdBy.firstName')} lastName={_.get(data, 'createdBy.lastName')} department={_.get(data, 'createdByDepartment.name')}
                  profilePicture={_.get(data, 'createdBy.profilePicture')} />
                <div className='absolute top-[2.8rem] left-[4.2rem]'>
                  <div className='flex gap-2'>
                    <PostTime created_at={_.get(data, 'created_at')} />
                    <PostPrivacyView privacy={data.privacy} />
                    {_.get(data, 'isArchived') && <div className='flex justify-end'> <span className='scale-50  '> <ABArchiveTag /></span></div>}
                  </div>
                </div>
              </div>
              <div className='absolute right-3 flex'>

                {_.get(data, 'ticket') && <PostTicket ticket={_.get(data, 'ticket')} />}

                {/* <PostOptions
               index={index}
               clicked={optionClicked}
               postUserId={_.get(data, "createdBy._id")}
               postId={_.get(data, "_id")}
               ticketId={_.get(data, "ticket._id")}
             /> */}

                <div className='w-fit'>
                  <ABDropdownMenuList
                    button={<div className='cursor-pointer text-slate-400'> <VerticalDotsIcon /> </div>}
                    menu={postOpts}
                  />
                </div>
              </div>
            </div>
            <PostTextContent content={_.get(data, 'content')} />

            <PostAttachments attachments={_.get(data, 'attachments')} />

            <PostTagContainer tags={tags} />
            <Reactions/>
            <GenComments isFeed={isFeed} />

            {/* <PostTagIcon identifier='20' name='Departments'/> */}

            {/* <div className="border-b border-dashed border-gray-300 py-3"></div> */}
            {/* <ReactionIcons /> */}
          </PostLayout>
        </PostContext.Provider>

      }
    </div>
  );
};

export default PostIndex;
