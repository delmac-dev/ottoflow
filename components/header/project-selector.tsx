import { useGetAllProjects } from '@/lib/query.hooks'
import { Select } from '@mantine/core'
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
      placeholder="Start a workspace"
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
