import { auth } from "@/auth";
import BoardEditor from "@/components/board-editor";
import Profile from "@/components/common/profile";
import ScheduleEditor from "@/components/schedule-editor";
import { Breadcrumbs, Center, Container, Flex, Group, Stack, Title} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { redirect, RedirectType } from 'next/navigation'

export default async function Home() {
  const session = await auth();

  if(session === null) {
    redirect('/redirect-to', RedirectType.replace);
  }

  return (
    <Stack className="gap-0 min-h-dvh">
      <Group justify="space-between" component="header" className="w-full px-xs h-12 bg-dark-900 border-b border-dark-600">
        <Breadcrumbs separatorMargin={"md"} classNames={{separator: "text-dark-500"}}>
          <Link href={"/"}>
            <Image src={"/common/icon.png"} alt="logo" width={100} height={100} className="size-6" />
          </Link>
          <Title order={6} className="font-medium text-dark-50">Projects</Title>
        </Breadcrumbs>

        <Profile {...session.user} />
      </Group>
      <Group className="gap-0">
        <Container fluid className="flex-1 max-w-sm p-0 border-r border-dark-600">
          <ScheduleEditor />
        </Container>
        <Container fluid className="flex-1 h-[calc(100dvh_-_48px)] p-0">
          <BoardEditor />
        </Container>
      </Group>
    </Stack>
  );
}
