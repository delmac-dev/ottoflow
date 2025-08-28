"use client";

import { ActionIcon, Box, Button, Center, Container, PasswordInput, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { ISignIn } from "@/lib/types";
import { ZSignIn } from "@/lib/schema";
import { useSearchParams } from "next/navigation";
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver'

export default function Auth() {
  const redirectUrl = useSearchParams().get("redirect");
  const error = useSearchParams().get("code");
  const [login, setLogin] = useState(true);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: zod4Resolver(ZSignIn),
  });

  function onSubmit(values: ISignIn) {
    form.setSubmitting(true);
    signIn("credentials", { ...values, signUp: !login, redirectTo: redirectUrl || "/" });
    form.setSubmitting(false);
  }

  return (
    <Container fluid mih={"100vh"}>
      <Container mih={"100vh"} size={"xl"} p={"0px"} component={"main"}>
        <Stack w={"100%"} mih={"100vh"} py={"md"}>
          <Center>
            <Link href={"/"} className="p-1.5 rounded-full bg-green-500/30">
              <Image src={"/common/icon.png"} alt={"logo"} height={100} width={100} className="size-8" />
            </Link>
          </Center>
          <Center flex={"1"}>
            {login? (
              <Box bg={"dark.8"} p={"lg"} bdrs={"md"}>
                <form onSubmit={form.onSubmit(onSubmit)}>
                  <Stack className="w-2xs">
                    <Center>
                      <Title order={3}>Login</Title>
                    </Center>
                    <TextInput
                      key={form.key('email')}
                      {...form.getInputProps('email')}
                      label="Username/Email"
                      placeholder="Username or email"
                    />
                    <PasswordInput
                      key={form.key('password')}
                      {...form.getInputProps('password')}
                      label="Password"
                      placeholder="**** ****"
                    />
                    <Button type="submit" fullWidth loading={form.submitting}>
                      Login
                    </Button>
                  </Stack>
                </form>
              </Box>
            ): (
              <Box bg={"dark.8"} p={"lg"} bdrs={"md"}>
                <Stack className="w-2xs">
                  <Center>
                    <Title order={3}>Sign Up</Title>
                  </Center>
                  <TextInput
                    type="email"
                    label="Email"
                    placeholder="email"
                  />
                  <PasswordInput
                    label="Password"
                    placeholder="**** ****"
                  />
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="**** ****"
                  />
                  <Button fullWidth>
                    Get Started
                  </Button>
                </Stack>
              </Box>
            )}
          </Center>
          <Center py="md">
            <ActionIcon variant="outline" color="dark" size={"lg"} radius={"lg"} onClick={() => setLogin((prev) => !prev)}>
              {login ? (<ChevronRight className="size-5" />):(<ChevronLeft className="size-5" />)}
            </ActionIcon>
          </Center>
        </Stack>
      </Container>
    </Container>
  )
}