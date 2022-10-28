import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, FC, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SubmitErrorHandler } from 'react-hook-form/dist/types/form';

import {
  Card,
  CheckboxInput,
  DateTimeInput,
  Flex,
  FormInputs,
  NumberInput,
  TextInput,
  TextareaInput,
} from 'tw-react-components';

type State = {
  text?: string;
  textarea?: string;
  number?: number;
  checkbox?: boolean;
  date?: Date;
};

export const FormControls: FC = () => {
  const form = useForm<State>({ defaultValues: {} });
  const [formState, setFormState] = useState<State>({});

  const onSubmit: SubmitHandler<State> = (data) => alert(JSON.stringify(data, null, 2));

  const onInvalid: SubmitErrorHandler<State> = (data) => {
    console.log({ form: form.getValues(), data }, form.formState.errors);
  };

  const setFormField =
    <T extends HTMLElement>(field: keyof typeof formState, attr: keyof ChangeEvent<T>['target']) =>
    (event: ChangeEvent<T> | Date) =>
      setFormState((state) => ({
        ...state,
        [field]: 'target' in event ? event.target[attr] : event,
      }));

  return (
    <Flex>
      <Flex className="w-1/2" direction="column" centered>
        <Card fullWidth>
          With <code className="rounded bg-gray-100 p-1 dark:bg-gray-900">use-form-hook</code>{' '}
          context
        </Card>
        <Card fullWidth>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
              <Flex direction="column">
                <FormInputs.Text
                  className="w-full"
                  name="text"
                  label="Text"
                  placeholder="Text"
                  required
                />
                <FormInputs.Textarea
                  className="w-full"
                  name="textarea"
                  label="Full Text"
                  placeholder="Full Text"
                  rows={5}
                  required
                />
                <FormInputs.Number
                  className="w-full"
                  name="number"
                  label="Number"
                  placeholder="0"
                  min={0}
                  validate={(value) => value < 11}
                  ExtraIcon={CurrencyDollarIcon}
                  required
                />
                <FormInputs.Checkbox className="w-full" name="checkbox" label="Checkbox" required />
                <FormInputs.DateTime
                  className="w-full"
                  name="date"
                  label="DateTime"
                  displayFormat="DD-MM-YYYY [at] HH:mm"
                  minDate={new Date(2010, 1, 5, 13, 44)}
                  maxDate={new Date(2030, 4, 5, 13, 44)}
                  required
                  clearable
                />
                <button type="submit">Submit</button>
              </Flex>
            </form>
          </FormProvider>
        </Card>
      </Flex>
      <Flex className="w-1/2" direction="column" centered>
        <Card fullWidth>
          <span className="underline decoration-wavy underline-offset-2">Without</span>{' '}
          <code className="rounded bg-gray-100 p-1 dark:bg-gray-900">use-form-hook</code> context
        </Card>
        <Card fullWidth>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit(formState);
            }}
          >
            <Flex direction="column">
              <TextInput
                className="w-full"
                name="text"
                label="Text"
                value={formState.text ?? ''}
                onChange={setFormField('text', 'value')}
                placeholder="Text"
                required
              />
              <TextareaInput
                className="w-full"
                name="textarea"
                label="Full Text"
                value={formState.textarea ?? ''}
                onChange={setFormField('textarea', 'value')}
                placeholder="Full Text"
                rows={5}
                required
              />
              <NumberInput
                className="w-full"
                name="number"
                label="Number"
                value={formState.number ?? ''}
                onChange={setFormField('number', 'value')}
                placeholder="0"
                min={0}
                hasErrors={(formState.number ?? 0) > 10}
                ExtraIcon={CurrencyDollarIcon}
                required
              />
              <CheckboxInput
                className="w-full"
                name="checkbox"
                label="Checkbox"
                checked={formState.checkbox ?? false}
                onChange={setFormField('checkbox', 'checked')}
                required
              />
              <DateTimeInput
                className="w-full"
                name="date"
                label="DateTime"
                displayFormat="DD-MM-YYYY [at] HH:mm"
                value={formState.date}
                onChange={setFormField('date', 'value')}
                minDate={new Date(2010, 1, 5, 13, 44)}
                maxDate={new Date(2030, 4, 5, 13, 44)}
                required
                clearable
              />
              <button type="submit">Submit</button>
            </Flex>
          </form>
        </Card>
      </Flex>
    </Flex>
  );
};
