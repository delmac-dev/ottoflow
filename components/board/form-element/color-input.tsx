import { cn } from '@/lib/utils';
import { ColorInput as MantineColorInput, DEFAULT_THEME } from '@mantine/core';
import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
}

export default function ColorInput<T extends FieldValues>({ name, control }: Props<T>) {
  const { field } = useController({ name, control });

  return (
    <div className={cn("p-0 col-span-2")}>
      <MantineColorInput
        format="hexa"
        fixOnBlur={false}
        closeOnColorSwatchClick
        placeholder="#FFFFFF"
        value={field.value || ''}
        onChange={(color) => field.onChange(color)}
        classNames={{ 
          input: 'border-transparent hover:border-dark-400 focus:border-blue-400' 
        }}
        swatches={[
          ...DEFAULT_THEME.colors.red,
          ...DEFAULT_THEME.colors.green,
          ...DEFAULT_THEME.colors.blue,
        ]}
        size='xs'
      />
    </div>
  )
}
