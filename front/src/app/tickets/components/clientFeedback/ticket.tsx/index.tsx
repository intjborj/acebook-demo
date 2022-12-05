import React from 'react'
import ClientFeedback from '..'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { UPSERT_TICKET_FEEDBACK } from '@graphql/operations/tickets/ticketMutation';
import moment from 'moment';
import { toast } from 'react-toastify';
import { TicketDataType } from '@/types/tickets/ticketType';
import _, { isEmpty } from 'lodash';
import { getAuthCredentials } from "@utils/auth-utils";
import { PostContextRd, PostContextType } from '@/reducers/posts/postContextRd';

type Props = { ticketData?: TicketDataType }
type FeedbackType = { message: string }


const validationSchema = yup.object().shape({
    message: yup.string().required('Required field'),
});



const TicketClientFeedback = ({ ticketData }: Props) => {
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
  
    const { user } = getAuthCredentials();
    const hookFormProp = useForm<FeedbackType>({
        //@ts-ignore
        defaultValues: !isEmpty(_.get(ticketData, "clientFeedback.message"))? {message : _.get(ticketData, "clientFeedback.message")}: {},
        resolver: yupResolver(validationSchema),
    });
    const [upsertFD] = useMutation(UPSERT_TICKET_FEEDBACK);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset,
        setValue,
        getValues
    } = hookFormProp

    const onSubmit = (data: FeedbackType) => {



        if (confirm("Are you sure you want to send feedback?")) {

            let payload = {
                _id: _.get(ticketData, "_id"),
                clientFeedback: {
                    "reactionIcon": null,
                    "message": data.message,
                    "updatedAt": moment().format()
                },
            }

            upsertFD({
                variables: {
                    input: payload,
                },
            })
                .then((resp) => {
                    toast.success('Feedback succesfully sent');
                    dispatchPostRd({ type: "refetch", modalData: true })
                })
                .catch((error) => {

                    toast.error('Feedback failed to send');
                });
        }
    }

    return (
        <div>
            <ClientFeedback
                isUser={_.get(user, "_id") === _.get(ticketData, "requestedBy._id")}
                hookFormProp={hookFormProp} onSubmit={onSubmit}
                hasMessage={!isEmpty(_.get(ticketData, "clientFeedback.message")) ? true : false}
                message={_.get(ticketData, "clientFeedback.message")}
                updatedAt={_.get(ticketData, "clientFeedback.updatedAt")}
          />
        </div>
    )
}

export default TicketClientFeedback