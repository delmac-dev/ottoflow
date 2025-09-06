import AuthButtons from '@/components/header/auth-buttons';
import NewProject from '@/components/header/new-project';
import ProfileButton from '@/components/header/profile-button';
import ProjectSelector from '@/components/header/project-selector'
import { AppShell, Avatar, Group, Select, Text, Title } from '@mantine/core'
import { useSession } from 'next-auth/react';
import React from 'react'

export default function Header() {
  const {data: session} = useSession();

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify='space-between'>
        <Title order={6} className='text-sm'>Ottoflow</Title>
        <ProjectSelector disabled={!session} />
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
