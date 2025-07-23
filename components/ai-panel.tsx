import { useHandlePrompt } from '@/lib/query.hooks';
import { ZPromptAI } from '@/lib/schema';
import { IPromptAI } from '@/lib/types';
import { ActionIcon, Container, Group, Stack, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form';
import { ImagePlusIcon, PlusIcon, SendHorizonalIcon } from 'lucide-react'
import { zod4Resolver } from 'mantine-form-zod-resolver';

export default function AIPanel() {
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
    <Container fluid className="w-full h-auto p-xs bg-dark-900">
      <form onSubmit={aiForm.onSubmit(onSubmit)}>
        <Stack className='bg-dark-800 p-xs rounded-md gap-2 border border-dark-600'>
          <Textarea
            autosize
            minRows={1}
            maxRows={2}
            key={aiForm.key('prompt')}
            {...aiForm.getInputProps('prompt')}
            variant="unstyled"
            placeholder="Your prompt goes here"
            size="sm"
            aria-label="ai-prompt"
          />
          <Group justify="space-between">
            <ActionIcon
              type="button"
              variant="subtle"
              size="md"
              color="dark"
              className="bg-dark-600 hover:bg-dark-500"
            >
              <ImagePlusIcon className="size-5 text-dark-50" />
            </ActionIcon>
            <ActionIcon
              type="submit"
              variant="subtle"
              size="md"
              color="dark"
              className="bg-dark-600 hover:bg-dark-500"
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
