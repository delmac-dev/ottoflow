import { useGetAllProjects } from '@/lib/query.hooks'
import { Select } from '@mantine/core'
import React from 'react'

export default function ProjectSelector() {
  const { data: projects } = useGetAllProjects();
  
  return (
    <Select
      className='grow-0'
      size="xs"
      placeholder="Start a workspace"
      data={projects?.map(project => "hello") || []}
    />
  )
}
