import React, {FC, useState} from 'react';
import CreateAndEditWindow from "./CreateAndEditWindow";
import {useNavigate} from "react-router-dom";

const requestListArray = [
    {
        requestNumber: '12345',
        dateWithTime: '22.10.2022',
        clientCompanyName: 'Стройматериалы',
        driverName: 'Андрей Витальевич Проняшин',
        driverPhoneNumber: '83330003300',
        comment: '??!!',
        requestStatus: 'в работе',
        ATIcode: 'https://ati.su/firms/12345/info'
    },
    {
        requestNumber: '12346',
        dateWithTime: '22.09.2022',
        clientCompanyName: 'МеталлХолдинг',
        driverName: 'Мылов Алексей Викторович',
        driverPhoneNumber: '89999999999',
        comment: 'Как-то так',
        requestStatus: 'новая',
        ATIcode: 'https://ati.su/firms/12345/info'
    },
]

interface RequestTableProps {
    setRequestData: (value: any) => void;
    adminMode: boolean;
}

const RequestsTable: FC<RequestTableProps> = ({setRequestData, adminMode}) => {
    const [requestList, setRequestList] = useState(requestListArray)
    const [windowState, setWindowState] = useState(
        {
                isOpen: false,
                requestNumber: '0',
                isRequestCreating: false
            })
    const navigate = useNavigate()

const createRequest = () => {
        setWindowState((prev: any) => ({
            ...prev, isOpen: true, isRequestCreating: true
        }))
}

const doubleClickHandler = (requestNumber: any) => {
    setRequestData(requestList.find(a => requestNumber === a.requestNumber))
    navigate(`request/${requestNumber}`)
}

    return (
        <div>
            <div>Количество заявок: {requestList.length}</div>
            <button disabled={!adminMode} onClick={createRequest}>Создать заявку</button>
            <table>
                <thead>
                <tr>
                    <th>Номер заявки</th>
                    <th>Дата и время получения заявки от клиента</th>
                    <th>Название компании клиента</th>
                    <th>ФИО перевозчика</th>
                    <th>Контактный телефон перевозчика</th>
                    <th>Комментарии</th>
                    <th>Статус заявки</th>
                    <th>ATI код сети перевозчика</th>
                </tr>
                </thead>
                <tbody>
                {
                    requestList.map((request, index) => (
                        <tr onDoubleClick={() => doubleClickHandler(request.requestNumber)} key={request.requestNumber}>
                            <td>{request.requestNumber}</td>
                            <td>{request.dateWithTime}</td>
                            <td>{request.clientCompanyName}</td>
                            <td>{request.driverName}</td>
                            <td>{request.driverPhoneNumber}</td>
                            <td>{request.comment}</td>
                            <td>{request.requestStatus}</td>
                            <td><a href={request.ATIcode}>{request.ATIcode}</a></td>
                            <button
                                onClick={() => setWindowState((prev: any) =>
                                ({...prev, isOpen: true, requestNumber: request.requestNumber, isRequestCreating: false}))}
                                disabled={!adminMode}
                            >
                                Изменить заявку
                            </button>
                            <button
                                onClick={() => setRequestList((prev: any) => prev.filter((a: any) =>
                                    a.requestNumber !== request.requestNumber
                                ))}
                                disabled={!adminMode}
                            >
                                Удалить заявку
                            </button>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {windowState.isOpen &&
            <CreateAndEditWindow
                isOpen={windowState.isOpen}
                closeWindow={() =>
                    setWindowState((prev: any) => ({...prev, isOpen: false}))
                }
                currentRequestNumber={windowState.requestNumber}
                isRequestCreating={windowState.isRequestCreating}
                requestList={requestList}
                setRequestList={setRequestList}
            />}
        </div>
    );
};

export default RequestsTable;