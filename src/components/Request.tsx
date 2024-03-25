import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

export interface RequestObject {
    requestNumber: string;
    dateWithTime: string;
    clientCompanyName: string;
    driverName: string;
    driverPhoneNumber: string;
    comment: string;
    requestStatus: string;
    ATIcode: string;
}

interface RequestProps {
    requestData: RequestObject | any,
}

const Request: FC<RequestProps> = ({requestData}) => {
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate('/')}>Назад к таблице</button>
            <div>
               <p>{requestData.requestNumber}</p>
               <p>{requestData.dateWithTime}</p>
               <p>{requestData.clientCompanyName}</p>
               <p>{requestData.driverName}</p>
               <p>{requestData.driverPhoneNumber}</p>
               <p>{requestData.comment}</p>
               <p>{requestData.requestStatus}</p>
               <p>{requestData.ATIcode}</p>
            </div>
        </div>
    );
};

export default Request;