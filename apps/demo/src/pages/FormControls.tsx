import { DollarSignIcon } from 'lucide-react';
import type { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import type { SelectItem, Size } from 'tw-react-components';
import {
  Button,
  CheckboxInput,
  DateTimeInput,
  Flex,
  FormInputs,
  NumberInput,
  SelectInput,
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

const countriesItems: SelectItem<string, true>[] = Object.entries(countriesByContinent).map(
  ([continent, countries]) => ({
    id: continent,
    label: continent,
    group: true,
    items: countries.map((country) => ({ id: country, value: country, label: country })),
  }),
);

export const FormControls: FC = () => {
  const form = useForm<State>({ defaultValues: {} });
  const [inputSize, setInputSize] = useState<Size | undefined>('medium');
  const [formState, setFormState] = useState<State>({ countries: [] });

  const onSubmit: SubmitHandler<State> = (data) => alert(JSON.stringify(data, null, 2));

  const onInvalid: SubmitErrorHandler<State> = (data) => {
    console.log({ form: form.getValues(), data }, form.formState.errors);
  };

  const setFormField =
    <T extends HTMLElement>(field: keyof typeof formState, attr?: keyof ChangeEvent<T>['target']) =>
    (event: ChangeEvent<T> | Date | null | string | string[] | undefined) =>
      setFormState((state) => ({
        ...state,
        [field]:
          event && attr && typeof event === 'object' && 'target' in event
            ? event.target[attr]
            : event,
      }));

  return (
    <Flex className="gap-6 overflow-auto" direction="column" fullWidth fullHeight>
      <SelectInput
        label="Size"
        placeholder="Size"
        value={inputSize}
        items={[
          { id: 'small', label: 'Small', value: 'small' },
          { id: 'medium', label: 'medium', value: 'medium' },
        ]}
        onChange={setInputSize}
      />
      <Flex direction="column" fullWidth>
        <p className="mb-2">
          With <code className="rounded-sm bg-slate-100 p-1 dark:bg-slate-900">use-form-hook</code>{' '}
          context
        </p>
        <FormProvider {...form}>
          <form className="w-full px-1" onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
            <Flex direction="column">
              <FormInputs.Text
                name="text"
                label="Text"
                placeholder="Text"
                size={inputSize}
                required
                clearable
              />
              <FormInputs.Textarea
                name="textarea"
                label="Full Text"
                placeholder="Full Text"
                size={inputSize}
                required
                clearable
              />
              <FormInputs.Number
                name="number"
                label="Number"
                placeholder="0"
                min={0}
                validate={(value) => value < 11}
                suffixIcon={DollarSignIcon}
                size={inputSize}
                required
                clearable
              />
              <FormInputs.Checkbox name="checkbox" label="Checkbox" size={inputSize} required />
              <FormInputs.DateTime
                name="date"
                label="DateTime"
                placeholder="Select date..."
                displayFormat="DD-MM-YYYY [at] HH:mm"
                step={5}
                minDate={new Date(2010, 1, 5, 13, 44)}
                maxDate={new Date(2030, 4, 5, 13, 44)}
                size={inputSize}
                required
                clearable
              />
              <FormInputs.Select
                name="countries"
                label="Countries"
                placeholder="Select country..."
                items={countriesItems}
                multiple
                size={inputSize}
                required
                allowAddition
                onNewItemAdded={alert}
                clearable
                search
              />
              <Flex justify="end" fullWidth>
                <Button color="red" onClick={() => form.reset()} size={inputSize}>
                  Clear
                </Button>
                <Button type="submit" color="green" size={inputSize}>
                  Submit
                </Button>
              </Flex>
            </Flex>
          </form>
        </FormProvider>
      </Flex>
      <Flex direction="column" fullWidth>
        <p className="mb-2">
          Without{' '}
          <code className="rounded-sm bg-slate-100 p-1 dark:bg-slate-900">use-form-hook</code>{' '}
          context
        </p>
        <form
          className="w-full px-1"
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
              size={inputSize}
              required
            />
            <TextareaInput
              name="textarea"
              label="Full Text"
              value={formState.textarea ?? ''}
              onChange={setFormField('textarea', 'value')}
              placeholder="Full Text"
              size={inputSize}
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
              suffixIcon={DollarSignIcon}
              size={inputSize}
              required
            />
            <CheckboxInput
              name="checkbox"
              label="Checkbox"
              checked={formState.checkbox ?? false}
              onChange={setFormField('checkbox', 'checked')}
              size={inputSize}
              required
            />
            <DateTimeInput
              name="date"
              label="DateTime"
              placeholder="Select date..."
              displayFormat="DD-MM-YYYY [at] HH:mm"
              value={formState.date}
              onChange={setFormField('date')}
              minDate={new Date(2010, 1, 5, 13, 44)}
              maxDate={new Date(2030, 4, 5, 13, 44)}
              size={inputSize}
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
              size={inputSize}
              required
              clearable
              search
            />
            <Button className="self-end" type="submit" color="green" size={inputSize}>
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
