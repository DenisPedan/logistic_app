export type ValidationFunctionType = (value: string) => string | null

export const isRequired: ValidationFunctionType = (value) => (!value || value.length === 0 ) ? 'Поле обязательно к заполнению' : null
export const isNumber: ValidationFunctionType = (value) => (value && isNaN(parseInt(value)) ) ? 'Введите числовое значение' : null

export const validate = (validationRules: ValidationFunctionType[], value: string): string => validationRules
    .reduce<string[]>((acc, rule) => {
        const res = rule(value)
        if (res !== null) {
            acc.push(res)
        }
        return acc
    }, [])
    .join(',')