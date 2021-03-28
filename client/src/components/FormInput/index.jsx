import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Field } from 'formik'
import React from 'react'

const FormInput = ({
    name,
    label,
    placeholder,
    type = 'test',
    formProps = null,
    onBlur = null,
}) => {
    const handleOnBlur = (event) => {
        onBlur(formProps, event)
    }
    return (
        <Field name={name}>
            {({ field }) => {
                return (
                    <FormControl mt={3}>
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                        <Input
                            {...field}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            onBlur={onBlur ? handleOnBlur : null}
                            _focus={{
                                borderColor: 'purple.500',
                            }}
                        />
                    </FormControl>
                )
            }}
        </Field>
    )
}

export default FormInput
