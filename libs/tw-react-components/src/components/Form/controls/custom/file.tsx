import { CloudUploadIcon } from 'lucide-react';
import { forwardRef, useRef } from 'react';

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
>;

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, value, onChange, onFileChange, accept, ...props }, ref) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = async ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
      console.log(files);

      if (files && files.length > 0) {
        const file = files[0];
        console.log(file, file.name, onChange, onFileChange);

        onChange?.(file.name);
        onFileChange?.(file);
      }
    };

    return (
      <>
        <TextInput
          className={cn('[&>div>*]:cursor-pointer', className)}
          inputClassName="text-left"
          {...props}
          value={value ?? ''}
          onClick={() => fileInputRef.current?.click()}
          suffixIcon={CloudUploadIcon}
          onSuffixIconClick={() => fileInputRef.current?.click()}
          ref={ref}
          readOnly
        />
        <input
          ref={(ref) => (fileInputRef.current = ref)}
          type="file"
          hidden
          accept={accept}
          onChange={handleFileChange}
        />
      </>
    );
  },
);
