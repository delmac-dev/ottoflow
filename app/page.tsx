import { auth } from "@/auth";
import BoardEditor from "@/components/board-editor";
import Profile from "@/components/common/profile";
import ScheduleEditor from "@/components/schedule-editor";
import { Box, Breadcrumbs, Group, Stack, Title} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { redirect, RedirectType } from 'next/navigation'

export default async function Home() {
  const session = await auth();

  if(session === null) {
    redirect('/auth', RedirectType.replace);
  }

  return (
    <Stack className="w-full gap-0">
      <Group justify="space-between" component="header" className="w-full px-xs h-12 bg-dark-900 border-b border-dark-600">
        <Breadcrumbs separatorMargin={"md"} classNames={{separator: "text-dark-300"}}>
          <Link href={"/"}>
            <Image src={"/common/icon.png"} alt="logo" width={100} height={100} className="size-6" />
          </Link>
          <Title order={6} className="font-medium text-dark-50">Projects</Title>
        </Breadcrumbs>
        <Profile {...session.user} />
      </Group>
      <Box className="grid grid-cols-[var(--size-xs)_minmax(0,_1fr)] gap-0">
        <ScheduleEditor />
        <BoardEditor />
      </Box>
    </Stack>
  );
}
