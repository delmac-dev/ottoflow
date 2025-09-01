import { useAIChat } from '@/lib/query.hooks';
import { ZAIArea } from '@/lib/schema';
import { IAIArea } from '@/lib/types';
import { ActionIcon, AppShell, Center, Group, Loader, Stack, Text, Tooltip } from '@mantine/core'
import { Paperclip, SendHorizontal, X } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useRef } from 'react'
import { useController, useForm } from "react-hook-form";
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils';
import { useEdgeStore } from '@/lib/edgestore';

export default function AIArea() {
  const { mutate } = useAIChat();
  const { edgestore } = useEdgeStore();

  const form = useForm<IAIArea>({
    defaultValues: {
      prompt: "",
      file: null
    },
    resolver: zodResolver(ZAIArea)
  });
  
  const { handleSubmit, register, watch, control } = form;
  const { field } = useController({control, name: "file"});
  const file = watch("file");

  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    field.onChange({
      name: file.name,
      uploaded: false,
      url: null
    });
    try {
      const res = await edgestore.promptFiles.upload({
        file,
        options: {
          temporary: true,
        },
        onProgressChange: (progress) => {},
      });

      if(!res) {
        field.onChange(null);
      }
      
      field.onChange({
        name: file.name,
        uploaded: true,
        url: res.url,
      });
    } catch (error) {
      console.error(error);
      //show error toast
      field.onChange(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ 
    onDrop,
    noClick: true,
    accept: {
      'application/pdf': [".pdf"]
    },
    disabled: !!file
  });

  const onSubmit = (data: IAIArea) => {
    console.log(data);
    mutate(data);
  }

  return (
    <AppShell.Section mih={100} p={4} {...getRootProps()}>
      <form className='h-full' onSubmit={handleSubmit(onSubmit)}>
        <Stack className='relative gap-1 h-full rounded-sm border border-dark-400'>
          <Group flex="1">
            <input
              {...register("prompt")}
              className='w-full px-2 text-sm font-normal text-dark-100 placeholder:text-dark-100 focus:outline-none'
              placeholder='Ask me anything...'
            />
            <input {...getInputProps()} />
          </Group>
          <Group className='h-9 justify-between px-1.5'>
            <Group 
              className={cn(
                'gap-2 rounded-sm mx-1 px-0',
                file && 'border border-dark-400'
              )}
            >
              <ToolButton
                icon={Paperclip}
                label='upload'
                action={open}
                disabled={!!file}
                isSubmit={false}
              />
              {file && (
                <>
                  <Text truncate className='flex-1 max-w-40 text-xs font-semibold text-dark-200'>{file.name}</Text>
                  {!file.uploaded? (<Loader color='dark.2' size={12} className='mx-1' />) : (
                    <ActionIcon 
                      color='dark.2' 
                      variant='subtle' 
                      size={20} 
                      radius={'lg'} 
                      onClick={()=> field.onChange(null)}
                    >
                      <X className='size-3.5' />
                    </ActionIcon>
                  )}
                </>
              )}
            </Group>
            <ToolButton
              icon={SendHorizontal}
              label='send'
              action={() => { }}
              disabled={!!file && !file.uploaded}
              isSubmit={true}
            />
          </Group>
          {isDragActive && (
            <Center className='absolute inset-1 bg-dark-600 border border-dark-400 rounded-sm'>
              <Text className='text-xs font-semibold text-dark-200'>Upload pdf attachment</Text>
            </Center>
          )}
        </Stack>
      </form>
    </AppShell.Section>
  )
}

type ToolButtonProps = {
  icon: React.ElementType;
  label: string;
  action: () => void;
  disabled: boolean;
  isSubmit: boolean;
}

const ToolButton = (props: ToolButtonProps) => {

  return (
    <Tooltip
      key={props.label}
      label={props.label}
      position='bottom'
      h={24}
      color='dark.6'
      classNames={{ tooltip: 'text-xs border border-dark-400' }}
    >
      <ActionIcon
        onClick={props.action}
        disabled={props.disabled}
        type={props.isSubmit ? 'submit' : 'button'}
        variant='subtle'
        color='dark.2'
        size={24}
      >
        <props.icon className='size-4' />
      </ActionIcon>
    </Tooltip>
  )
}