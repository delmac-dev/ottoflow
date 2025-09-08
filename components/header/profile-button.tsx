"use client";

import { useChangePassword, useDeleteProfile, useEditProfile, useGetProfileByID } from '@/lib/query.hooks';
import { ZChangePassword, ZProfileDetails } from '@/lib/schema';
import { IChangePassword, IProfileDetails } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, Button, Group, Modal, PasswordInput, ScrollArea, Stack, Tabs, Text, TextInput, Title, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown, LogOut, Palette, User as UserIcon } from 'lucide-react';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';

type Props = {
  user: User | null;
}

export default function ProfileButton({ user }: Props) {
  const [tab, setTab] = useState<string | null>('profile');
  const [opened, { open, close }] = useDisclosure(false);
  const { data: profileDetail } = useGetProfileByID(user?.id ?? null);
  const { mutate: saveDetails, isPending: savingDetails } = useEditProfile();
  const { mutate: changePassword, isPending: savingSecret, isError: changingPasswordError } = useChangePassword();
  const { mutate: deleteProfile, isPending: deletingProfile } = useDeleteProfile();

  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const tabs = [
    { value: "profile", label: "Edit Profile", icon: UserIcon },
    { value: "theme", label: "Change Theme", icon: Palette },
    { value: "logout", label: "Logout", icon: LogOut },
  ]

  const themeOptions = [
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
    { label: "System", value: "auto" },
  ];

  const { 
    handleSubmit: handleSubmitDetails, 
    control: controlDetails, 
    reset: resetDetails, 
    formState: { isDirty: isDetailsDirty }
  } = useForm<IProfileDetails>({
    defaultValues: {
      username: profileDetail?.username || "",
      email: profileDetail?.email || "",
      avatar: profileDetail?.avatar || "blue",
    },
    resolver: zodResolver(ZProfileDetails)
  });

  const { 
    handleSubmit: handleSubmitSecret, 
    control: controlSecret, 
    reset: resetSecret,
    formState: { isDirty: isSecretDirty }
  } = useForm<IChangePassword>({
    defaultValues: {
      old: "",
      new: "",
      confirm: "",
    },
    resolver: zodResolver(ZChangePassword)
  });

  const nameControl = useController({ name: "username", control: controlDetails });
  const emailControl = useController({ name: "email", control: controlDetails });
  const avatarControl = useController({ name: "avatar", control: controlDetails });

  const oldControl = useController({ name: "old", control: controlSecret });
  const newControl = useController({ name: "new", control: controlSecret });
  const confirmControl = useController({ name: "confirm", control: controlSecret });

  const onDetailSubmit = (data:IProfileDetails) => {
    console.log("passed - sent data:", data);
    saveDetails({data});
  };

  const onPasswordSubmit = (data: IChangePassword) => {
    changePassword({old: data.old, newPassword: data.new});
    onPasswordReset();
  };

  const onDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteProfile();
  };

  const onDetailReset = () => {
    resetDetails({
      username: profileDetail?.username || "",
      email: profileDetail?.email || "",
      avatar: profileDetail?.avatar || "blue",
    })
  }

  const onPasswordReset = () => {
    resetSecret({
      old: "",
      new: "",
      confirm: "",
    });
  };

  useEffect(() => {
    onDetailReset();
  }, [profileDetail]);

  useEffect(() => {
    if (changingPasswordError) {
      console.log("Error changing password:", changingPasswordError);
    }
  }, [changingPasswordError]);

  return (
    <>
      <Button 
        variant="transparent"
        size={"xs"}
        onClick={open}
        classNames={{
          label: "text-sm font-medium text-dark-100"
        }}
        leftSection={
          <Avatar size={26} src={`/avatars/${profileDetail?.avatar || user?.image}.jpg`} alt="user avatar" />
        }
        rightSection={
          <ChevronDown size={14} className='text-dark-100' />
        }
      >
        {profileDetail?.username || user?.name || "User"}
      </Button>
      <Modal.Root
        opened={opened}
        onClose={close}
        size={"xl"}
        keepMounted={false}
        closeOnClickOutside={true}
        closeOnEscape={true}
        centered
      >
        <Modal.Overlay backgroundOpacity={0.55} blur={3} />
        <Modal.Content>
          <Modal.Body className='h-lg p-0'>
            <Tabs
              orientation="vertical"
              classNames={{
                root: 'w-full h-lg',
                tab: 'rounded-none',
                tabLabel: 'text-start text-sm',
                tabSection: 'bg-purple',
                list: 'py-6 min-w-60',
                panel: 'overflow-hidden'
              }}
              value={tab}
              onChange={(value) => {
                if (value === "logout") {
                  signOut();
                }else {
                  setTab(value);
                }
              }}
            >

              <Tabs.List className=''>
                {tabs.map((tab) => (
                  <Tabs.Tab 
                    key={tab.value} 
                    value={tab.value}
                    leftSection={<tab.icon size={18} />}
                  >
                    {tab.label}
                  </Tabs.Tab>
                ))}
              </Tabs.List>

              <Tabs.Panel value="profile" p={"md"} component={ScrollArea}>
                <Stack>
                  <form onSubmit={handleSubmitDetails(onDetailSubmit)}>
                    <Stack w={"100%"} maw={"100%"} p={"md"} gap={8} className='border border-dark-400'>
                      <Title order={6} fw="600">Profile Details</Title>
                      <TextInput 
                        label="Email"
                        size='xs'
                        {...emailControl.field}
                        disabled
                      />
                      <TextInput 
                        label="Username"
                        size='xs'
                        {...nameControl.field}
                        error={nameControl.fieldState?.error?.message}
                      />
                      <TextInput 
                        label="Avatar"
                        size='xs'
                        {...avatarControl.field}
                        error={avatarControl.fieldState?.error?.message}
                      />
                      <Group justify='flex-end' mt={"xs"}>
                        <Button variant='outline' size='compact-xs' type="button" onClick={onDetailReset} hidden={!isDetailsDirty}>Reset</Button>
                        <Button size='compact-xs' type="submit" loading={savingDetails} disabled={!isDetailsDirty}>Save</Button>
                      </Group>
                    </Stack>
                  </form>
                  <form onSubmit={handleSubmitSecret(onPasswordSubmit)}>
                    <Stack w={"100%"} p={"md"} gap={8} className='border border-dark-400'>
                      <Title order={6} fw="600">Change Password</Title>
                      <PasswordInput 
                        label="Current Password"
                        placeholder="Your current password"
                        size='xs'
                        {...oldControl.field}
                      />
                      <PasswordInput 
                        label="New Password"
                        placeholder="Your new password"
                        size='xs'
                        {...newControl.field}
                      />
                      <PasswordInput 
                        label="Confirm Password"
                        placeholder="Confirm your new password"
                        size='xs'
                        {...confirmControl.field}
                      />
                      <Group justify='flex-end' mt={"xs"}>
                        <Button variant='outline' size='compact-xs' type="button" onClick={onPasswordReset} hidden={!isSecretDirty}>Reset</Button>
                        <Button size='compact-xs' type="submit" loading={savingSecret} disabled={!isSecretDirty}>Save</Button>
                      </Group>
                    </Stack>
                  </form>
                  <form onSubmit={onDeleteSubmit}>
                    <Stack w={"100%"} p={"md"} gap={8} className='border border-dark-400'>
                      <Title order={6} fw="600">Delete Account</Title>
                      <Group align='center' justify='space-between'>
                        <Text flex={1} size='xs'>
                          Are you sure you want to delete your account?{" "}
                          This action is <Text span fw={700} c="red">permanent</Text> and{" "}
                          <Text span fw={700}>cannot be undone</Text>. All your projects and data will be lost.
                        </Text>
                        <Button
                          size="compact-xs"
                          type="submit"
                          color="red"
                          loading={deletingProfile}
                        >
                          Delete
                        </Button>
                      </Group>
                    </Stack>
                  </form>
                </Stack>
              </Tabs.Panel>
              <Tabs.Panel value="theme" p={"md"}>
                Theme tab content
              </Tabs.Panel>
            </Tabs>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
