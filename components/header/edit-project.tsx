import { useEditProjectName } from '@/lib/query.hooks';
import { ZEditProjectName } from '@/lib/schema';
import { IEditProjectName } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActionIcon, Button, Modal, Stack, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { SquarePen } from 'lucide-react'
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useController, useForm } from 'react-hook-form';

export default function EditProject() {
  const [opened, { open, close }] = useDisclosure(false);
  const currentID = useSearchParams().get("id");
  const { mutate, isSuccess, isPending } = useEditProjectName();

  const { handleSubmit, control, reset } = useForm<IEditProjectName>({
    defaultValues: {
      name: ''
    },
    resolver: zodResolver(ZEditProjectName)
  });

  const nameControl = useController({ control, name: 'name' });

  const onSubmit = (data: IEditProjectName) => {
    if (currentID) {
      mutate({ projectID: currentID, ...data });
    }
  };

  useEffect(() => {
    if (!opened) {
      reset({ name: '' });
    }
  }, [opened]);

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess]);

  return (
    <>
      <ActionIcon
        hidden={!currentID}
        variant="light"
        size={24}
        color='dark.1'
        onClick={open}
      >
        <SquarePen  size={16} />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        title="Edit Project Name"
        closeOnClickOutside={!isPending}
        closeOnEscape={!isPending}
        closeButtonProps={{ disabled: isPending }}
        centered
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              label="Project Name"
              placeholder="Enter project name"
              {...nameControl.field}
            />
            <Button type='submit' loading={isPending} disabled={isPending}>Save</Button>
          </Stack>
        </form>
      </Modal>
    </>
  )
}
