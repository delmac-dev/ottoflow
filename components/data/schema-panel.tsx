import { Button, Center, Combobox, Group, Input, ScrollArea, Stack, Text, UnstyledButton, useCombobox } from '@mantine/core';
import { ChevronDown, FilePlus2, Plus, Save, Trash, Type } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import IconButton from './icon-button';
import { Control, FieldArrayWithId, useController, useFieldArray, UseFieldArrayRemove, useForm, UseFormRegister } from 'react-hook-form';
import { useStore } from 'zustand';
import { scheduleStore } from '@/lib/stores/schedule.store';
import snakeCase from 'lodash.snakecase';

type IControl = Control<{
  schema: {
    type: string;
    key: string;
  }[];
}, any, {
  schema: {
    type: string;
    key: string;
  }[];
}>

export default function SchemaPanel() {
  const properties = useStore(scheduleStore, (s) => s.properties);
  const setProperties = useStore(scheduleStore, (s) => s.setProperties);
  const setData = useStore(scheduleStore, (s) => s.setData);

  const { handleSubmit, reset, control, register, formState: { isDirty } } = useForm({
    defaultValues: {
      schema: properties || []
    }
  });

  const { fields: rows, append, remove } = useFieldArray({
    control,
    name: "schema",
  });

  useEffect(() => {
    if (isDirty) {
      handleSubmit((data) => {
        // collect allowed keys from schema
        const allowedKeys = new Set(data.schema.map((f) => snakeCase(f.key)));

        const storeData = scheduleStore.getState().data;
        const cleaned = storeData
          ? storeData.map((row) =>
            Object.fromEntries(
              Object.entries(row).filter(([key]) => allowedKeys.has(key))
            )
          )
          : [];
        setData(cleaned);
        setProperties(data.schema);
      })();
    }
  }, [isDirty]);

  useEffect(() => {
    reset({ schema: properties || [] }, { keepDirty: false });
  }, [properties]);

  const tools = [
    {
      icon: Plus,
      label: 'Add',
      action: () => append({ type: 'text', key: '' })
    }
  ];
  return (
    <Stack gap={0}>
      <Group bg="dark.6" justify='flex-end' px="xs" gap={4} className='h-8'>
        {tools.map(tool => (
          <IconButton key={tool.label} {...tool} />
        ))}
      </Group>
      <ScrollArea
        offsetScrollbars
        scrollbarSize={4}
        overscrollBehavior="contain"
        className='h-[calc(100vh-232px)]'
      >
        {rows.map((row, i) => (
          <SchemaRow
            key={row.id}
            index={i}
            control={control}
            remove={remove}
          />
        ))}
        {rows.length === 0 && (
          <Center className='h-full pt-14'>
            <Text className='text-dark-200 text-xs italic'>No schema available. Please add a schema.</Text>
          </Center>
        )}
      </ScrollArea>
    </Stack>
  )
};

type ISchemaRow = {
  index: number;
  control: IControl;
  remove: UseFieldArrayRemove;
};

function SchemaRow(props: ISchemaRow) {
  const { index, control, remove } = props;
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const typeControl = useController({
    name: `schema.${index}.type` as const,
    control,
  });
  const keyControl = useController({
    name: `schema.${index}.key` as const,
    control,
  });
  const [key, setKey] = useState(keyControl.field.value);

  const Icon = Type;

  return (
    <Group mt={8} className="ml-2 gap-0.5 bg-dark-600 rounded-sm">
      <Combobox
        store={combobox}
        width={148}
        position="bottom"
        onOptionSubmit={(val) => {
          typeControl.field.onChange(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <button
            className="bg-dark-600 h-7 rounded-l-sm px-2 cursor-pointer hover:bg-dark-500"
            onClick={() => combobox.toggleDropdown()}
          >
            <Group gap={"xs"}>
              <Group flex={1} gap={4}>
                <Icon className="size-3.5" />
                <Text className="text-xs font-semibold lowercase">
                  {typeControl.field.value}
                </Text>
              </Group>
              <ChevronDown className="size-3 text-dark-300" />
            </Group>
          </button>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            {["text"].map((item) => (
              <Combobox.Option
                value={item}
                key={item}
                className="px-2 py-2"
              >
                <Group>
                  <Icon className="size-4" />
                  <Text className="text-xs font-semibold capitalize">{item}</Text>
                </Group>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      <input
        className="flex-1 px-2 bg-dark-600 text-xs font-semibold h-7 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={key}
        placeholder="key name"
        onChange={(e) => setKey(e.target.value)}
        onBlur={() => keyControl.field.onChange(key)}
        onFocus={(e) => e.target.select()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur();
          }
        }}
      />

      <button
        className="bg-dark-600 h-7 rounded-r-sm px-2 cursor-pointer hover:bg-dark-500"
        onClick={() => remove(index)}
      >
        <Trash className="size-3.5 text-dark-200" />
      </button>
    </Group>
  );
}