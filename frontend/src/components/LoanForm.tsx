import {
  Button,
  Container,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { loanFormSchema } from "../api/schema"
import { generateId } from "../api/utils"
import { Loan } from "../types"

interface LoanFormProps {
  loanTypes: string[]
  initialLoanState: Loan
  onSubmit: (loan: Loan) => void
}

const LoanForm: React.FC<LoanFormProps> = ({
  loanTypes,
  initialLoanState,
  onSubmit,
}) => {
  const form = useForm<Loan>({
    initialValues: initialLoanState,
    validate: yupResolver(loanFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  })

  return (
    <Container>
      <Text component="h2">Create Loan</Text>
      <form
        onSubmit={form.onSubmit((loan) => {
          onSubmit(loan)
          form.setValues({
            ...initialLoanState,
            loanId: generateId("L", 7),
          })
        })}
      >
        <Stack>
          <TextInput
            withAsterisk
            label="Loan Id"
            disabled
            {...form.getInputProps("loanId")}
          />
          <Select
            label="Loan Type"
            data={loanTypes.map((d) => ({
              label: d,
              value: d.toLowerCase(),
            }))}
            withAsterisk
            {...form.getInputProps("loanType")}
          />
          <NumberInput
            withAsterisk
            min={1}
            label="Duration"
            {...form.getInputProps("duration")}
          />
        </Stack>

        <Button.Group my={20}>
          <Button type="submit">Submit</Button>
          <Button variant="light" type="button" onClick={form.reset}>
            Reset
          </Button>
        </Button.Group>
      </form>
    </Container>
  )
}

export default LoanForm
