import { cn } from '@/lib/utils';
import { ComboboxData, Select } from '@mantine/core';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  pH: string,
  data: ComboboxData,
  isFull?: boolean,
  type?: "text" | "number";
}

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
  const { name, control, pH, data, isFull=true, type="text" } = props;
  const { field } = useController({ name, control });

  return (
    <div className={cn("p-0", {"col-span-2": isFull})}>
      <Select
        size='xs'
        w="100%"
        value={type === "number" ? field.value.toString() : field.value}
        onChange={(value) => field.onChange(type === "number" ? parseFloat(value || "0") : value)}
        rightSection={<ChevronDown size={14} />}
        classNames={{
          input: "border-transparent hover:border-dark-400 focus:border-blue-400"
        }}
        placeholder={pH}
        data={data}
      />
    </div>
  )
}
