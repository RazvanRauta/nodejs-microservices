import { Heading, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import { get } from 'lodash'
import { useState } from 'react'

const useRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null)

    const doRequest = async (props = {}) => {
        try {
            setErrors(null)
            const response = await axios[method](url, { ...body, ...props })
            if (onSuccess) {
                onSuccess(response.data)
            }
            return response.data
        } catch (errs) {
            const errors = get(errs, 'response.data.errors', [])
            errors.length > 0
                ? setErrors(
                      <Text mt="7" color="red.500">
                          <Heading mb="3" as={'h4'} size="md">
                              Ooops...
                          </Heading>
                          <Stack direction="column">
                              {errors.map((err) => (
                                  <Text key={err.message}>{err.message}</Text>
                              ))}
                          </Stack>
                      </Text>
                  )
                : setErrors(null)
        }
    }

    return { doRequest, errors }
}

export default useRequest
