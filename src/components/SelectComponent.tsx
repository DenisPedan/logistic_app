import {InputComponentProps} from "./InputComponent";
import React, {FC, useCallback} from "react";
import {Select} from "@gravity-ui/uikit";

export interface Option {
    value: string;
    content: string;
}

export interface SelectComponentProps extends InputComponentProps{
    options: Option[];
}

export const SelectComponent: FC<SelectComponentProps> = ({ label, id, onChange, validationState, errorMessage, value, options }) => (
    <div style={{marginBottom: '14px'}}>
        <label htmlFor={id} style={{ fontWeight: 'bold'}}>{label}</label>
            <Select
                id={id}
                value={[value]}
                onUpdate={useCallback((value: string[]) =>
                    onChange(value[0], id), [onChange, id])}
                validationState={validationState}
                errorMessage={errorMessage}
                options={options}
            />
    </div>
)