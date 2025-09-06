import { ZSignIn, ZSignUp } from '@/lib/schema';
import { ISignIn, ISignUp } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Anchor, Box, Button, Center, Group, Loader, Modal, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import React, { use, useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';

enum AuthMode {
  SignIn = "sign-in",
  SignUp = "sign-up"
}

export default function AuthButtons() {
  const [mode, setMode] = useState<AuthMode>();
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: signInMutate, isPending: isSignInPending } = useMutation({
    mutationFn: (data: ISignIn) => signIn("credentials", { ...data, signIn: true, redirectTo: '/' })
  });
  const { mutate: signUpMutate, isPending: isSignUpPending } = useMutation({
    mutationFn: (data: ISignUp) => signIn("credentials", { ...data, signIn: false, redirectTo: '/' })
  });

  const { handleSubmit: handleInSubmit, control: inControl, reset: inReset } = useForm<ISignIn>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(ZSignIn)
  });

  const { handleSubmit: handleUpSubmit, control: upControl, reset: upReset } = useForm<ISignUp>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(ZSignUp)
  });

  const inEmailControl = useController({ name: 'email', control: inControl });
  const inPasswordControl = useController({ name: 'password', control: inControl });

  const upEmailControl = useController({ name: 'email', control: upControl });
  const upPasswordControl = useController({ name: 'password', control: upControl });
  const upConfirmPasswordControl = useController({ name: 'confirmPassword', control: upControl });

  const onSignInSubmit = (data: ISignIn) => {
    signInMutate(data);
  };

  const onSignUpSubmit = (data: ISignUp) => {
    signUpMutate(data);
  };

  const openSignIn = () => {
    setMode(AuthMode.SignIn);
    open();
  }

  const openSignUp = () => {
    setMode(AuthMode.SignUp);
    open();
  };

  const isSignIn = mode === AuthMode.SignIn;

  useEffect(() => {
    if (!opened) {
      inReset({
        email: '',
        password: ''
      });
      upReset({
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [opened]);

  return (
    <>
      <Group>
        <Button variant="outline" size='xs' onClick={openSignIn}>Sign In</Button>
        <Button variant="light" size='xs' onClick={openSignUp}>Sign Up</Button>
      </Group>
      <Modal.Root
        opened={opened}
        onClose={close}
        size={"xl"}
        keepMounted={false}
        closeOnClickOutside={!isSignInPending && !isSignUpPending}
        closeOnEscape={!isSignInPending && !isSignUpPending}
        centered
      >
        <Modal.Overlay backgroundOpacity={0.55} blur={3} />
        <Modal.Content>
          <Modal.Body className='h-lg p-0'>
            <Group className='w-full h-full gap-0'>
              <Stack flex={1} h={"100%"} gap={0}>
                <Center flex={1} p={"md"}>

                  {isSignIn ? (
                    <Stack w={"100%"}>
                      <Title order={3} c={"dark.0"}>
                        Welcome back!
                      </Title>
                      <form onSubmit={handleInSubmit(onSignInSubmit)}>
                        <Stack>
                          <TextInput
                            label="Email"
                            placeholder="you@example.com"
                            {...inEmailControl.field}
                            error={inEmailControl.fieldState?.error?.message}
                            required
                          />
                          <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            {...inPasswordControl.field}
                            error={inPasswordControl.fieldState?.error?.message}
                            required
                          />
                          <Button type="submit" disabled={isSignInPending}>
                            {isSignInPending ? <Loader size="xs" color='dark.2' /> : "Sign In"}
                          </Button>
                        </Stack>
                      </form>
                    </Stack>
                  ) : (
                    <Stack w={"100%"}>
                      <Title order={3} c={"dark.0"}>
                        Create your account
                      </Title>
                      <form onSubmit={handleUpSubmit(onSignUpSubmit)}>
                        <Stack>
                          <TextInput
                            label="Email"
                            placeholder="you@example.com"
                            {...upEmailControl.field}
                            error={upEmailControl.fieldState?.error?.message}
                            required
                          />

                          <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            {...upPasswordControl.field}
                            error={upPasswordControl.fieldState?.error?.message}
                            required
                          />

                          <PasswordInput
                            label="Confirm Password"
                            placeholder="Your password"
                            {...upConfirmPasswordControl.field}
                            error={upConfirmPasswordControl.fieldState?.error?.message}
                            required
                          />
                          <Button type="submit" disabled={isSignUpPending}>
                            {isSignUpPending ? <Loader size="xs" color='dark.2' /> : "Sign Up"}
                          </Button>
                        </Stack>
                      </form>
                    </Stack>
                  )}
                </Center>
                <Group p={"md"}>
                  <Anchor
                    size='sm'
                    c={"dark.2"}
                    component='button'
                    onClick={isSignIn ? openSignUp : openSignIn}
                  >
                    {isSignIn ? "Don't have an account? Register" : "Have an account? Login"}
                  </Anchor>
                </Group>
              </Stack>
              <Center flex={1} bg={"dark.8"} h={"100%"}>
                <Text size='sm'>[ Image goes here... ]</Text>
              </Center>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}
