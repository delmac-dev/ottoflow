"use client";

import { AppShell } from '@mantine/core';
import React, { useEffect } from 'react'
import Header from './header';
import Footer from './footer';
import { useViewportSize } from '@mantine/hooks';
import { boardStore } from '@/lib/stores/board.store';
import { useStore } from 'zustand';
import { BoardMode } from '@/lib/types';
import { useSession } from 'next-auth/react';
import BoardContainer from '@/components/board/board-container';
import SignInBody from '@/components/signin-body';
import DataContainer from '@/components/data/data-container';
import Loading from '@/components/loading';

export default function TestPage() {
  const { width, height } = useViewportSize();
  const { data: session, status } = useSession();
  const setWidth = useStore(boardStore, (s) => s.setWidth);
  const setHeight = useStore(boardStore, (s) => s.setHeight);

  const headerSize = 44;
  const footerSize = 24;
  const boardOffset = 64;
  const navbarWidth = 300;

  useEffect(() => {
    const stageHeight = height - (headerSize + footerSize + boardOffset);
    const stageWidth = width - navbarWidth;
    setHeight(stageHeight);
    setWidth(stageWidth);
  }, [height, width, session]);

  useEffect(() => {
    const handleMouseUp = () => {
      const { mode, setMode, hideSelectionNet } = boardStore.getState();
      if (mode === BoardMode.Selecting) {
        setMode(BoardMode.Idle);
        hideSelectionNet();
      };
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {status === "loading" ? (<Loading />) : (
        <AppShell
          header={{ height: headerSize }}
          footer={{ height: footerSize, collapsed: !session }}
          navbar={{ width: navbarWidth, breakpoint: 'xs',  collapsed: { desktop: !session, mobile: !session } }}
          padding={0}
          className='overflow-hidden'
        >
          <Header />
          <DataContainer />
          <AppShell.Main className='relative'>
            {status === "unauthenticated" ? (<SignInBody />) : (<BoardContainer />)}
          </AppShell.Main>
          <Footer />
        </AppShell>
      )}
    </>
  )
};