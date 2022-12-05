import React from 'react';
import PostedByDetails from './components/postedByDetails';
import PostLayout from './components/postLayout';
import PostImageContent from './components/postImageContent';
import PostTextContent from './components/postTextContent';
import ReactionIcons from './components/reactionIcons';
import Parser from 'html-react-parser';
import PostTime from './components/postTime';
import { PostFormDefaultType, PostFormValues, PostViewDefaultType } from '@/types/posts/postTypes';
import _ from 'lodash'
import PostPrivacyView from './components/postPrivacyView';
import PostTagIcon from '@/components/tags/tagIcon';
import GenComments from '../comments';
import PostTagContainer from './components/postTagContainer';
import PostFileContent from './components/postFileContent';
import PostAttachments from './components/attachments';
import { VerticalDotsIcon } from '@/components/icons/vertical-dots';
import PostOptions from './components/options';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { SelectContainerIcon } from '@/components/ui/select/select-container-icon';
import { PrivacyLabeler } from './components/forms/postPrivacy';
import { postDefaultFormService } from './components/services/postDefaultFormServices';
import { getAuthCredentials } from '@/utils/auth-utils';
import PostTicket from './components/postTicket';

type Props = { data: PostFormValues, tags: any, index: number };

export const PostContext = React.createContext({})
const { token } = getAuthCredentials();
const PostIndex = ({ data, tags, index }: Props) => {
  const postValue: PostFormValues = data
 
  const { openModal } = useModalAction();
  const optionClicked = async (clicked: any) => {

    //  console.log("postDefaultFormService(data)", postDefaultFormService(data))
    switch (clicked) {
      case "edit": {
        openModal('POST_FORM', data);
      } break;
      case "ticket":
        window.open(`/tickets/form/post/${_.get(data, '_id')}`, '_self')
        break;
      default:
        break;
    }
  }
  return (
    <div className="pt-3 " key={'post' + index}>
      <PostContext.Provider value={postValue} >
        <PostLayout>
          <div className='flex w-full'>
            <div className=''>
              <PostedByDetails firstName={_.get(data, 'createdBy.firstName')} lastName={_.get(data, 'createdBy.lastName')} department={_.get(data, 'createdByDepartment.name')} profilePicture={_.get(data, 'createdBy.profilePicture')} />
              <div className='absolute top-[2.8rem] left-[4.2rem]'>
                <div className='flex gap-2'>
                  <PostTime created_at={_.get(data, 'created_at')} />
                  <PostPrivacyView privacy={data.privacy} />
                </div>
              </div>
            </div>
            <div className='absolute right-3 flex'>

              {_.get(data, 'ticket') && <PostTicket ticket={_.get(data, 'ticket')} />}

              <PostOptions
                index={index}
                clicked={optionClicked}
                postUserId={_.get(data, "createdBy._id")}
                postId={_.get(data, "_id")}
                ticketId={_.get(data, "ticket._id")}
              />
            </div>
          </div>
          <PostTextContent content={_.get(data, 'content')} />

          <PostAttachments attachments={_.get(data, 'attachments')} />

          <PostTagContainer tags={tags} />
          <GenComments />

          {/* <PostTagIcon identifier='20' name='Departments'/> */}

          {/* <div className="border-b border-dashed border-gray-300 py-3"></div> */}
          {/* <ReactionIcons /> */}
        </PostLayout>
      </PostContext.Provider>
    </div>
  );
};

export default PostIndex;
