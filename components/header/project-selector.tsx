import { useGetAllProjects } from '@/lib/query.hooks'
import { Select } from '@mantine/core'
import React, { useEffect } from 'react'

type Props = {
  disabled: boolean;
}

export default function ProjectSelector({ disabled }: Props) {
  const { data: projects } = useGetAllProjects();

  useEffect(()=> console.log({projects}), [projects])

  return (
    <Select
      className='grow-0'
      size="xs"
      placeholder="Start a workspace"
      data={projects?.map(project => ({
        value: project.id,
        label: project.name
      })) || []}
      disabled={disabled}
    />
  )
}
