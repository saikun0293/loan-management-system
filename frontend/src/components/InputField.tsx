import { TextInput } from "@mantine/core"
import { FieldHookConfig, useField } from "formik"
import { FC } from "react"

interface InputFieldProps<T> {
  config: FieldHookConfig<T>
  label: string
}

const TextInputField: FC<InputFieldProps<string>> = ({ config, label }) => {
  const [field, meta] = useField(config)

  return (
    <TextInput
      {...field}
      label={label}
      withAsterisk={config.required}
      error={meta.error ? meta.error : false}
    />
  )
}

export default TextInputField
