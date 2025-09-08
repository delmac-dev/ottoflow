import { useGetAllProjects } from '@/lib/query.hooks'
import { Select } from '@mantine/core'
import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from 'react'

type Props = {
  disabled: boolean;
}

export default function ProjectSelector({ disabled }: Props) {
  const { data: projects } = useGetAllProjects();
  const router = useRouter();
  const currentID = useSearchParams().get("id");

  return (
    <Select
      className='grow-0'
      size="xs"
      radius="xl"
      classNames={{
        input: "border-transparent hover:border-dark-400 focus:border-blue-400 px-md"
      }}
      placeholder="Start a workspace"
      rightSection={<ChevronDown size={14} />}
      value={currentID || undefined}
      onChange={(value) => {
        if (value) {
          router.push(`/?id=${value}`);
        }
      }}
      data={projects?.map(project => ({
        value: project.id,
        label: project.name
      })) || []}
      disabled={disabled}
    />
  )
}
