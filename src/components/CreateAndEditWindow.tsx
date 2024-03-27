import React, { ComponentType, FC, useCallback, useEffect, useMemo, useState } from 'react'
import {RequestObject} from "./Request";
import { InputComponent, InputComponentProps } from "./InputComponent";
import {Option, SelectComponent} from "./SelectComponent"
import { isRequired, isNumber, validate, ValidationFunctionType } from "../functions/validationLogic";

interface CreateAndEditWindowPropsTypes {
    closeWindow: () => void;
    requestList: RequestObject[];
    setRequestList: (value: (prev: RequestObject[]) => RequestObject[]) => void;
    isRequestCreating: boolean;
    currentRequestNumber: string;
}

interface FieldType {
    label: string;
    id: string;
    validationRules: ValidationFunctionType[];
    Component: ComponentType<InputComponentProps>;
    options?: any
}

interface StringDicts {
    [key: string]: string;
}

export const defaultState = {
    requestNumber: '',
    dateWithTime: '',
    clientCompanyName: '',
    driverName: '',
    driverPhoneNumber: '',
    comment: '',
    requestStatus: '',
    ATIcode: ''
}

const fields: FieldType[] = [
    {
        label: 'Дата и время получения заявки от клиента',
        id: 'dateWithTime',
        validationRules: [isRequired],
        Component: InputComponent
    },
    {
        label: 'Название компании клиента',
        id: 'clientCompanyName',
        validationRules: [isRequired],
        Component: InputComponent
    },
    {
        label: 'ФИО перевозчика ',
        id: 'driverName',
        validationRules: [isRequired],
        Component: InputComponent
    },
    {
        label: 'Контактный телефон перевозчика',
        id: 'driverPhoneNumber',
        validationRules: [isRequired, isNumber],
        Component: InputComponent
    },
    {
        label: 'Комментарии',
        id: 'comment',
        validationRules: [isRequired],
        Component: InputComponent
    },
    {
        label: 'ATI код сети перевозчика ',
        id: 'ATIcode',
        validationRules: [isRequired],
        Component: InputComponent
    },
]

const CreateAndEditWindow: FC<CreateAndEditWindowPropsTypes> = ({closeWindow, requestList, setRequestList, isRequestCreating, currentRequestNumber}) => {

    const currentRequestObject = requestList.find((request) =>
        request.requestNumber === currentRequestNumber
    )
    console.log(currentRequestObject);
    const [inputValues, setInputValues] = useState<RequestObject>(isRequestCreating ? defaultState : currentRequestObject  || defaultState)

    const [validationErorrs, setValidationErros] = useState<StringDicts>({})
    const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(isRequestCreating) {
            setRequestList((prev) => [...prev, {...inputValues, requestStatus: 'новая'}]
            )
        } else {
            setRequestList((prev) => prev.map((request) =>
                request.requestNumber !== currentRequestNumber
                    ? request
                    : inputValues
            ))
            setInputValues(defaultState)
        }
        closeWindow()
    }

    const conditionFields = useMemo(() => {
        const newFields = [...fields]
        if (isRequestCreating) {
            newFields.unshift({
                label: 'Номер заявки',
                id: 'requestNumber',
                validationRules: [isRequired, isNumber],
                Component: InputComponent
            })
        } else {
            newFields.splice(newFields.length - 2, 0, {
                label: 'Статус заявки',
                id: 'requestStatus',
                validationRules: [isRequired],
                // @ts-ignore
                Component: SelectComponent,
                options: [
                    [
                        {value: 'новая', content: 'новая'},
                        {value: 'в работе', content: 'в работе'},
                        {value: 'завершено', content: 'завершено'},
                    ]
                ]
            })
        }
        return newFields
    }, [isRequestCreating])

    const onInput = useCallback((id: string, validationRules: ValidationFunctionType[]) => (value: string) => {
        setInputValues((prev) => ({...prev, [id]: value}))
        setValidationErros((prev) => ({
            ...prev,
            [id]: validate(validationRules, value)
        }))
    }, [])

    useEffect(() => {
        setValidationErros(conditionFields.reduce<StringDicts>((acc ,{ id, validationRules}) => {
            acc[id] = validate(validationRules, inputValues[id as keyof typeof inputValues])
            return acc
        }, {}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            <div className='modal-container'>
                <form>
                    {conditionFields.map(({Component, validationRules, ...props}) =>
                        (<Component
                            {...props}
                            {...(props.options && {options: props.options[0]})}
                            key={props.id}
                            value={inputValues[props.id as keyof typeof inputValues]}
                            onChange={onInput(props.id, validationRules)}
                            validationState={validationErorrs[props.id as keyof typeof validationErorrs] && validationErorrs[props.id as keyof typeof validationErorrs].length > 0 ? 'invalid' : undefined}
                            errorMessage={validationErorrs[props.id as keyof typeof validationErorrs]}
                        />
                    ))}
                    <button
                        style={{marginRight: 10}}
                        className={`button ${useMemo(() => Object.values(validationErorrs).some(v => !!v), [validationErorrs]) && 'button--disabled'}`}
                        disabled={useMemo(() => Object.values(validationErorrs).some(v => !!v), [validationErorrs])}
                        onClick={submitHandler}
                    >
                        {isRequestCreating ? 'Создать' : 'Применить изменения'}
                    </button>
                    <button className='button' onClick={closeWindow}>Закрыть</button>
                </form>
            </div>
        </div>
    );
};

export default CreateAndEditWindow;