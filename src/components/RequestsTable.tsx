import React, {FC, useState} from 'react';
import CreateAndEditWindow, {defaultState} from "./CreateAndEditWindow";
import {useNavigate} from "react-router-dom";
import {RequestObject} from "./Request";
import {Modal, Select} from '@gravity-ui/uikit'

const tableValueMap = [
    'Номер заявки',
    'Дата и время заявки',
    'Название компании клиента',
    'ФИО водителя',
    'Номер телефона водителя',
    'Комментарии',
    'Статус заявки',
    'ATIcode'
]

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
    setRequestData: (value: RequestObject) => void;
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
        setWindowState((prev) => ({
            ...prev, isOpen: true, isRequestCreating: true
        }))
}

const doubleClickHandler = (requestNumber: string) => {
    setRequestData(requestList.find(a => requestNumber === a.requestNumber) || defaultState)
    navigate(`request/${requestNumber}`)
}

    return (
        <div>
            <div style={{marginBottom: 10, fontWeight: 'bold'}}><p style={{fontSize: 12}}>Количество заявок:</p> {requestList.length}</div>
            <button style={{marginBottom: 10}} className={`button ${!adminMode && 'button--disabled'}`} disabled={!adminMode} onClick={createRequest}>Создать заявку</button>
            <table style={{borderCollapse: 'collapse'}}>
                <thead style={{fontSize: '11px'}}>
                <tr>
                    {tableValueMap.map((value) =>
                        <th>{value}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {
                    requestList.map((request, index) => (
                        <tr style={{border: '1px solid black'}} onDoubleClick={() => doubleClickHandler(request.requestNumber)} key={request.requestNumber}>
                            {Object.entries(request).map(([key, value]) =>
                                key !== 'ATIcode'
                                    ? (<td style={{border: '1px solid black'}}>{value}</td>)
                                    : (<td style={{border: '1px solid black'}}><a style={{textDecoration: 'none'}} href={value}>{value}</a></td>)
                            )}
                            <td className='td_with_buttons'>
                                <td className='td_with_button'>
                                    <button
                                        className={`button button--table ${!adminMode && 'button--disabled'}`}
                                        onClick={() => setWindowState((prev) =>
                                        ({...prev, isOpen: true, requestNumber: request.requestNumber, isRequestCreating: false}))}
                                        disabled={!adminMode}
                                    >
                                        Изменить заявку
                                    </button>
                                </td>
                                <td className='td_with_button'>
                                    <button
                                        className={`button button--table ${!adminMode && 'button--disabled'}`}
                                        onClick={() => setRequestList((prev) => prev.filter((a) =>
                                            a.requestNumber !== request.requestNumber
                                        ))}
                                        disabled={!adminMode}
                                    >
                                        Удалить заявку
                                    </button>
                                </td>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <Modal/>
            {windowState.isOpen &&
            <CreateAndEditWindow
                closeWindow={() =>
                    setWindowState((prev) => ({...prev, isOpen: false}))
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