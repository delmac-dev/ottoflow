"use client";

import { ActionIcon, Button, Divider, MantineColorScheme, Popover, Radio, Stack, Text, Title, useMantineColorScheme } from '@mantine/core';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

export default function Profile(user:User) {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const themeOptions = [
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
    { label: "System", value: "auto" },
  ]

  return (
    <Popover position="bottom-end" shadow="md" offset={14}>
      <Popover.Target>
        <ActionIcon variant="subtle" color="dark" size={"lg"} p={"0px"}>
          <Image
            src={"/avatars/brown.jpg"}
            alt="user avatar"
            width={512}
            height={512}
            className="size-full rounded-full"
          />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown className="bg-dark-700 border-dark-600 p-0">
        <Stack className="w-72 gap-0">
          <Stack className="gap-0 p-2">
            <Title order={6} className='text-dark-50 px-xs'>{user.name}</Title>
            <Text size="xs" className="text-dark-200 px-xs">
              {user.email}
            </Text>
          </Stack>
          <Divider color="dark.6" />
          <Stack className="p-2">
            <Button
              leftSection={<UserIcon className="size-4" />}
              size="xs"
              justify="start"
              variant="subtle"
              color="dark.1"
            >
              Edit your profile
            </Button>
          </Stack>
          <Divider color="dark.6" />
          <Stack className="p-2">
            <Text size="xs" className="text-dark-200 px-xs">
              Theme
            </Text>
            <Radio.Group
              value={colorScheme}
              onChange={(value) => setColorScheme(value as MantineColorScheme)}
              size="xs"
              px="xs"
            >
              <Stack className="gap-0 space-y-2">
                {themeOptions.map(({ value, label }) => (
                  <Radio
                    key={value}
                    value={value}
                    label={label}
                    iconColor="dark.1"
                    color="dark.7"
                    size="xs"
                    classNames={{ radio: "bg-dark-600 border-0", label: "text-dark-100" }}
                  />
                ))}
              </Stack>
            </Radio.Group>
          </Stack>
          <Divider color="dark.6" />
          <Stack className="p-2">
            <Button
              leftSection={<LogOutIcon className="size-4" />}
              size="xs"
              justify="start"
              variant="subtle"
              color="dark.1"
              px={"xs"}
              onClick={() => signOut({redirect: true, redirectTo: "/auth"})}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
