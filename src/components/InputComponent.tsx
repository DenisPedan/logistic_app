import React, {FC, useCallback} from "react";
import {TextInput} from "@gravity-ui/uikit";

export interface InputComponentProps {
    label: string;
    value: string;
    id: string;
    onChange: (value: string, id: string) => void;
    validationState?: 'invalid';
    errorMessage?: string;
}


export const InputComponent: FC<InputComponentProps> = ({ label, id, onChange, validationState, errorMessage, value }) => (
    <div style={{marginBottom: '14px'}}>
        <label htmlFor={id} style={{fontWeight: 'bold'}}>{label}</label>
        <TextInput
            id={id}
            value={value}
            onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
                onChange(e.target.value, e.target.id), [onChange])}
            type="text"
            validationState={validationState}
            errorMessage={errorMessage}
        />
    </div>
)