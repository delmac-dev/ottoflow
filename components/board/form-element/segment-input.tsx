import { cn } from '@/lib/utils';
import { SegmentedControl, SegmentedControlItem, Select } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  data: SegmentedControlItem[];
  readOnly?: boolean;
  type?: "string" | "number";
}

export default function SegmentInput<T extends FieldValues>(props: Props<T>) {
  const { name, control, data, readOnly, type="string" } = props;
  const { field } = useController({ name, control });

  return (
      <div className={cn("p-0 col-span-2")}>
        <SegmentedControl
          w="100%"
          size="xs"
          readOnly={readOnly}
          value={ String(field.value) }
          onChange={(val) => field.onChange( type === "number" ? Number(val) : val )}
          transitionDuration={0}
          data={data}
        />
      </div>
  )
};
