import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, FC, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SubmitErrorHandler } from 'react-hook-form/dist/types/form';

import {
  Button,
  Card,
  CheckboxInput,
  DateTimeInput,
  Flex,
  FormInputs,
  NumberInput,
  SelectInput,
  SelectItem,
  TextInput,
  TextareaInput,
} from 'tw-react-components';

import { countriesByContinent } from '../data';

type State = {
  text?: string;
  textarea?: string;
  number?: number;
  checkbox?: boolean;
  date?: Date;
  countries: string[];
};

const countriesItems: SelectItem<string>[] = Object.entries(countriesByContinent).map(
  ([continent, countries]) => ({
    id: continent,
    label: continent,
    group: true,
    value: continent,
    items: countries.map((country) => ({ id: country, value: country, label: country })),
  })
);

export const FormControls: FC = () => {
  const form = useForm<State>({ defaultValues: {} });
  const [formState, setFormState] = useState<State>({ countries: [] });

  const onSubmit: SubmitHandler<State> = (data) => alert(JSON.stringify(data, null, 2));

  const onInvalid: SubmitErrorHandler<State> = (data) => {
    console.log({ form: form.getValues(), data }, form.formState.errors);
  };

  const setFormField =
    <T extends HTMLElement>(field: keyof typeof formState, attr?: keyof ChangeEvent<T>['target']) =>
    (event: ChangeEvent<T> | Date | string | string[] | undefined) =>
      setFormState((state) => ({
        ...state,
        [field]:
          event && attr && typeof event === 'object' && 'target' in event
            ? event.target[attr]
            : event,
      }));

  return (
    <Flex>
      <Flex className="w-1/2" direction="column" centered>
        <Card fullWidth>
          <p className="mb-2">
            With <code className="rounded bg-gray-100 p-1 dark:bg-gray-900">use-form-hook</code>{' '}
            context
          </p>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
              <Flex direction="column">
                <FormInputs.Text name="text" label="Text" placeholder="Text" required />
                <FormInputs.Textarea
                  name="textarea"
                  label="Full Text"
                  placeholder="Full Text"
                  rows={5}
                  required
                />
                <FormInputs.Number
                  name="number"
                  label="Number"
                  placeholder="0"
                  min={0}
                  validate={(value) => value < 11}
                  ExtraIcon={CurrencyDollarIcon}
                  required
                />
                <FormInputs.Checkbox name="checkbox" label="Checkbox" required />
                <FormInputs.DateTime
                  name="date"
                  label="DateTime"
                  displayFormat="DD-MM-YYYY [at] HH:mm"
                  minDate={new Date(2010, 1, 5, 13, 44)}
                  maxDate={new Date(2030, 4, 5, 13, 44)}
                  required
                  clearable
                />
                <FormInputs.Select
                  name="countries"
                  label="Countries"
                  placeholder="Select country..."
                  items={countriesItems}
                  multiple
                  required
                  clearable
                  search
                />
                <Button className="self-end" type="submit" color="green">
                  Submit
                </Button>
              </Flex>
            </form>
          </FormProvider>
        </Card>
      </Flex>
      <Flex className="w-1/2" direction="column" centered>
        <Card fullWidth>
          <p className="mb-2">
            Without <code className="rounded bg-gray-100 p-1 dark:bg-gray-900 ">use-form-hook</code>{' '}
            context
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit(formState);
            }}
          >
            <Flex direction="column">
              <TextInput
                name="text"
                label="Text"
                value={formState.text ?? ''}
                onChange={setFormField('text', 'value')}
                placeholder="Text"
                required
              />
              <TextareaInput
                name="textarea"
                label="Full Text"
                value={formState.textarea ?? ''}
                onChange={setFormField('textarea', 'value')}
                placeholder="Full Text"
                rows={5}
                required
              />
              <NumberInput
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
                name="checkbox"
                label="Checkbox"
                checked={formState.checkbox ?? false}
                onChange={setFormField('checkbox', 'checked')}
                required
              />
              <DateTimeInput
                name="date"
                label="DateTime"
                displayFormat="DD-MM-YYYY [at] HH:mm"
                value={formState.date}
                onChange={setFormField('date')}
                minDate={new Date(2010, 1, 5, 13, 44)}
                maxDate={new Date(2030, 4, 5, 13, 44)}
                required
                clearable
              />
              <SelectInput
                name="countries"
                label="Countries"
                placeholder="Select..."
                items={countriesItems}
                value={formState.countries}
                onChange={setFormField('countries')}
                multiple
                required
                clearable
                search
              />
              <Button className="self-end" type="submit" color="green">
                Submit
              </Button>
            </Flex>
          </form>
        </Card>
      </Flex>
    </Flex>
  );
};
