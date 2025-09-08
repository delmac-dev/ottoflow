import { useNewProject } from '@/lib/query.hooks';
import { ZNewProject } from '@/lib/schema';
import { INewProject } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, Stack, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react'
import { useController, useForm } from 'react-hook-form';

export default function NewProject() {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const { mutate, isPending, isSuccess, data } = useNewProject();

  const { handleSubmit, control, reset } = useForm<INewProject>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(ZNewProject),
  });

  const nameControl = useController({ control, name: 'name' });

  const onSubmit = (data: INewProject) => {
    mutate(data);
  };

  useEffect(() => {
    if (!opened) {
      reset({ name: '' });
    }
  }, [opened]);

  useEffect(() => {
    if (isSuccess) {
      close();
      router.push(`/?id=${data.id}`);
    }
  }, [isSuccess]);

  return (
    <>
      <Button variant="outline" color='dark.0' size='compact-sm' onClick={open}>New Project</Button>

      <Modal 
        opened={opened} 
        onClose={close} 
        title="New Project"
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
            <Button type='submit' loading={isPending} disabled={isPending}>Create</Button>
          </Stack>
        </form>
      </Modal>
    </>
  )
}
