"use client";

import AuthButtons from '@/components/header/auth-buttons';
import DeleteProject from '@/components/header/delete-project';
import EditProject from '@/components/header/edit-project';
import NewProject from '@/components/header/new-project';
import ProfileButton from '@/components/header/profile-button';
import ProjectSelector from '@/components/header/project-selector'
import { AppShell, Avatar, Group, Select, Text, Title } from '@mantine/core'
import { useSession } from 'next-auth/react';
import React from 'react'

export default function Header() {
  const {data: session, status} = useSession();

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify='space-between' className='relative'>
        <Title order={6} className='text-sm'>Ottoflow</Title>
        <Group className='absolute left-1/2 -translate-x-1/2'>
          <ProjectSelector disabled={!session} />
          {status === "authenticated" && (
            <>
              <EditProject />
              <DeleteProject />
            </>
          )}
        </Group>
        {!session? (<AuthButtons />): (
          <Group>
            <NewProject />
            <ProfileButton user={session?.user ?? null} />
          </Group>
        )}
      </Group>
    </AppShell.Header>
  )
}
