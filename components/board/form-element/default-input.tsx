import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  icon?: LucideIcon;
  isFull?: boolean;
  type?: "text" | "number";
  disabled?: boolean;
}

export default function DefaultInput<T extends FieldValues>(props: Props<T>) {
  const { name, control, label, icon, isFull, type="number", disabled=false } = props;
  const { field } = useController({ name, control });
  const [value, setvalue] = useState<number | string>(field.value ?? "");
  const Icon = icon;

  // Sync local state with field value when it changes (form reset)
  useEffect(() => {
    setvalue(field.value ?? "");
  }, [field.value]);

  return (
    <div className={cn("relative h-7 p-0", {"col-span-2": isFull})}>
      <label
        className={cn('absolute top-1/2 -translate-y-1/2 left-1 flex justify-center items-center',
          {"": !!icon},
          {"text-xs font-bold px-1": !!label}
        )}
      >
        {label ? label : null}
        {Icon ? <Icon size={16} /> : null}
      </label>
      <input
        type={type}
        disabled={disabled}
        placeholder={type === "number"? "0" : "string"}
        className={cn('w-full h-full text-xs font-medium bg-dark-600 rounded pl-7 ring-1 ring-transparent hover:ring-dark-400',
          "focus:outline-none focus-within:outline-none focus:ring-blue-500"
        )}
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        onBlur={() => field.onChange(type === "number" ? Number(value) : value)}
        onFocus={(e) => e.target.select()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
          e.currentTarget.blur();
          }
        }}
      />
    </div>
  )
}