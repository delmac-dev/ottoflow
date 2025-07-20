import { useHandlePrompt } from '@/lib/query.hooks';
import { ZPromptAI } from '@/lib/schema';
import { IPromptAI } from '@/lib/types';
import { ActionIcon, Container, Group, Stack, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form';
import { FilePlusIcon, SendHorizonalIcon } from 'lucide-react'
import { zod4Resolver } from 'mantine-form-zod-resolver';

export default function ConfigPanel() {
  const { mutate: handlePrompt, isPending } = useHandlePrompt();
  const aiForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      prompt: '',
      file: null
    },
    validate: zod4Resolver(ZPromptAI),
  });

  function onSubmit(values:IPromptAI) {
    handlePrompt({prompt: values.prompt, fileUrl: "example.com"});
    aiForm.reset();
  };

  return (
    <Container
      fluid
      className="absolute w-full h-auto p-xs left-0 bottom-0 border-t border-dark-600"
    >
      <form onSubmit={aiForm.onSubmit(onSubmit)}>
        <Stack gap={"xs"} className='bg-dark-800 p-xs rounded-md'>
          <Textarea
            autosize
            minRows={1}
            maxRows={3}
            key={aiForm.key('prompt')}
            {...aiForm.getInputProps('prompt')}
            variant="unstyled"
            placeholder="Your prompt goes here"
            size="xs"
            aria-label="ai-prompt"
          />
          <Group justify="space-between">
            <ActionIcon
              type="button"
              variant="subtle"
              size="md"
              color="dark"
              className="hover:bg-dark-700"
            >
              <FilePlusIcon className="size-4 text-dark-50" />
            </ActionIcon>
            <ActionIcon
              type="submit"
              variant="subtle"
              size="md"
              color="dark"
              className="hover:bg-dark-700"
              loading={isPending}
            >
              <SendHorizonalIcon className="size-4 text-dark-50" />
            </ActionIcon>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}
