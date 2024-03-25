import React, {FC, useState} from 'react';
import {RequestObject} from "./Request";

interface CreateAndEditWindowPropsTypes {
    isOpen: boolean;
    closeWindow: () => void;
    requestList: RequestObject[];
    setRequestList: (value: any) => void;
    isRequestCreating: boolean;
    currentRequestNumber: string;
}

const defaultState = {
    requestNumber: '',
    dateWithTime: '',
    clientCompanyName: '',
    driverName: '',
    driverPhoneNumber: '',
    comment: '',
    requestStatus: '',
    ATIcode: ''
}

const CreateAndEditWindow: FC<CreateAndEditWindowPropsTypes> = ({closeWindow, requestList, setRequestList, isRequestCreating, currentRequestNumber}) => {

    const currentRequestObject = requestList.find((request: any) =>
        request.requestNumber === currentRequestNumber
    )
    console.log(currentRequestObject)

    const [inputValues, setInputValues] = useState(isRequestCreating ? defaultState : currentRequestObject || defaultState)

    const submitHandler = (e: any) => {
        e.preventDefault()
        if(isRequestCreating) {
            setRequestList((prev: any) => [...prev, {...inputValues, requestStatus: 'новая'}]
            )
        } else {
            setRequestList((prev: any) => prev.map((request: any) =>
                request.requestNumber !== currentRequestNumber
                    ? request
                    : inputValues
            ))
            setInputValues(defaultState)
        }
        closeWindow()
    }

    const validationAction = Object.entries(inputValues).some(([inputKey, inputValue]: any) => inputKey === 'requestStatus' ? false :  inputValue?.length === 0)

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            }}>
            <form>
                {
                    isRequestCreating
                    &&
                    <div>
                        <label htmlFor='requestNumber' style={{fontWeight: 'bold', color: 'white'}}>Номер заявки </label>
                        <input
                            id='requestNumber'
                            defaultValue={'2'}
                            value={inputValues?.requestNumber || '' /*|| requestList.length === 0 ? '1' : requestList[requestList.length - 1]?.requestNumber*/ }
                            onInput={(e: any) =>
                                setInputValues((prev: any) => ({...prev, requestNumber: e.target.value}))}
                            type="text"
                        />
                    </div>
                }
                <div>
                    <label htmlFor='dateWithTime' style={{fontWeight: 'bold', color: 'white'}}>Дата и время получения заявки от клиента </label>
                    <input
                        id='dateWithTime'
                        value={inputValues?.dateWithTime || ''}
                        onInput={(e: any) =>
                            setInputValues((prev: any) => ({...prev, dateWithTime: e.target.value}))}
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor='clientCompanyName' style={{fontWeight: 'bold', color: 'white'}}>Название компании клиента </label>
                    <input
                        id='clientCompanyName'
                        value={inputValues?.clientCompanyName || ''}
                        onInput={(e: any) =>
                            setInputValues((prev: any) => ({...prev, clientCompanyName: e.target.value}))}
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor='driverName' style={{fontWeight: 'bold', color: 'white'}}>ФИО перевозчика </label>
                    <input
                        id='driverName'
                        value={inputValues?.driverName || ''}
                        onInput={(e: any) =>
                            setInputValues((prev: any) => ({...prev, driverName: e.target.value}))}
                        type="text"
                    />
                </div>
                    <div>
                    <label htmlFor='driverPhoneNumber' style={{fontWeight: 'bold', color: 'white'}}>Контактный телефон перевозчика </label>
                    <input
                        id='driverPhoneNumber'
                        value={inputValues?.driverPhoneNumber || ''}
                        onInput={(e: any) =>
                            setInputValues((prev: any) => ({...prev, driverPhoneNumber: e.target.value}))}
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor='comment' style={{fontWeight: 'bold', color: 'white'}}>Комментарии </label>
                    <input
                        id='comment'
                        value={inputValues?.comment || ''}
                        onInput={(e: any) =>
                            setInputValues((prev: any) => ({...prev, comment: e.target.value}))}
                        type="text"
                    />
                </div>
                {   !isRequestCreating
                    &&
                    <div>
                        <label htmlFor='requestStatus' style={{fontWeight: 'bold', color: 'white'}}>Статус заявки </label>
                        <select
                            id='requestStatus' value={inputValues?.requestStatus || 'новая'}
                            onInput={(e: any) =>
                                setInputValues((prev: any) => ({...prev, requestStatus: e.target.value}))}
                        >
                            <option value='новая'>новая</option>
                            <option value='в работе'>в работе</option>
                            <option value='завершено'>завершено</option>
                        </select>
                    </div>
                }
                <div>
                    <label htmlFor='ATIcode' style={{fontWeight: 'bold', color: 'white'}}>ATI код сети перевозчика </label>
                    <input
                        id='ATIcode'
                        value={inputValues?.ATIcode || ''}
                        onInput={(e: any) =>
                            setInputValues((prev: any) => ({...prev, ATIcode: e.target.value}))}
                        type="text"
                    />
                </div>
                { isRequestCreating
                    ?
                    <button
                        disabled={validationAction}
                        onClick={submitHandler}
                    >
                        Создать
                    </button>
                    :
                    <button
                        disabled={validationAction}
                        onClick={submitHandler}
                    >
                        Применить изменения
                    </button>
                }
                <button onClick={closeWindow}>Закрыть</button>
            </form>
        </div>
    );
};

export default CreateAndEditWindow;