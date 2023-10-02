import {
  Button,
  Container,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { loanFormSchema } from "../api/schema"
import { generateId } from "../api/utils"
import { Loan } from "../types"

interface LoanFormProps {
  loanTypes: string[]
  initialLoanState: Loan
  type?: "Create" | "Edit"
  onSubmit: (loan: Loan) => void
}

const LoanForm: React.FC<LoanFormProps> = ({
  loanTypes,
  initialLoanState,
  onSubmit,
  type = "Create",
}) => {
  const form = useForm<Loan>({
    initialValues: initialLoanState,
    validate: yupResolver(loanFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  })

  return (
    <Container>
      <Title order={2} color="blue" my={20}>
        {type} Loan
      </Title>
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
              value: d,
            }))}
            defaultValue={initialLoanState.loanType}
            withAsterisk
            {...form.getInputProps("loanType")}
          />
          <NumberInput
            withAsterisk
            min={1}
            label="Duration (in Years)"
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
