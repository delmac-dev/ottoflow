"use client";

import { useDeleteProject } from '@/lib/query.hooks';
import { ActionIcon } from '@mantine/core'
import { Trash } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function DeleteProject() {
  const currentID = useSearchParams().get("id");
  const router = useRouter();
  const { mutate, isSuccess, isPending } = useDeleteProject();

  const handleDelete = () => {
    if (currentID) {
      mutate({ projectID: currentID });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(`/`);
    }
  }, [isSuccess]);

  return (
    <ActionIcon 
      hidden={!currentID} 
      onClick={handleDelete} 
      variant="light"
      size={24}
      color='dark.1'
      loading={isPending}
      disabled={isPending}
    >
      <Trash size={16} />
    </ActionIcon>
  )
}
