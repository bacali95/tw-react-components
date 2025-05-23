import { CloudUploadIcon } from 'lucide-react';
import { type FC, useRef } from 'react';

import { cn } from '../../../../helpers';
import type { BasicInputProps } from '../primitive';
import { TextInput } from '../primitive';

export type FileInputProps = {
  value?: string | null;
  onChange?: (item?: string) => void;
  onFileChange?: (file?: File) => void;
} & Pick<
  BasicInputProps<'text'>,
  | 'className'
  | 'inputClassName'
  | 'extensionClassName'
  | 'name'
  | 'label'
  | 'placeholder'
  | 'description'
  | 'size'
  | 'accept'
  | 'required'
  | 'hasErrors'
  | 'disabled'
  | 'dataTestId'
>;

export const FileInput: FC<FileInputProps> = ({
  className,
  inputClassName,
  value,
  onChange,
  onFileChange,
  accept,
  dataTestId = 'file-input',
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length > 0) {
      const file = files[0];

      onChange?.(file.name);
      onFileChange?.(file);
    }
  };

  return (
    <>
      <TextInput
        className={cn('[&>div>*]:cursor-pointer', className)}
        inputClassName={cn('text-left', inputClassName)}
        {...props}
        value={value ?? ''}
        onClick={() => fileInputRef.current?.click()}
        suffixIcon={CloudUploadIcon}
        onSuffixIconClick={() => fileInputRef.current?.click()}
        dataTestId={dataTestId}
        readOnly
      />
      <input
        ref={(ref) => {
          fileInputRef.current = ref;
        }}
        type="file"
        hidden
        accept={accept}
        onChange={handleFileChange}
        data-testid={`${dataTestId}-hidden`}
      />
    </>
  );
};
