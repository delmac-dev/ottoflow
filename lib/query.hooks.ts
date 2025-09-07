"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/lib/keys";
import * as A from "@/lib/actions";
import { appStore } from "./stores/app.store";
import { INode, IProject } from "./types";
import { signOut } from "next-auth/react";

export function useEditProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: A.editProfile,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: keys.profile });
    },
  });
};

export function useChangePassword() {
  return useMutation({
    mutationFn: A.changePassword
  })
};

export function useEditProjectName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: A.editProjectName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.workspaces });
    },
  });
};

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: A.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.workspaces });
    },
  });
};

export function useGetProfileByID(id: string | null) {
  const queryKey = keys.profile;
  const queryFn = async () => await A.getProfileByID(id??"");

  return useQuery({ queryKey, queryFn, enabled: !!id });
};

export function useDeleteProfile() {
  return useMutation({
    mutationFn: A.deleteProfile,
    onSuccess: async () => {
      await signOut();
    }
  })
};

export function useGetAllProjects() {
  const queryKey = keys.workspaces;
  const queryFn = async () => await A.getAllProjects();

  return useQuery({ queryKey, queryFn });
};

export function useGetWorkspaceContext(projectId: string) {
  const queryKey = keys.workspaceContext(projectId);
  const queryFn = async () => await A.getWorkspaceContext(projectId);

  return useQuery({ queryKey, queryFn, enabled: !!projectId });
};

export function useNewProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: A.newProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.workspaces })
    },
  })
};

export function useSaveBoardRoot() {
  return useMutation({
    mutationFn: A.saveBoardRoot,
  })
};

export function useSaveProjectData() {
  return useMutation({
    mutationFn: A.saveProjectData,
  })
};

export function useSaveProjectProperties() {
  return useMutation({
    mutationFn: A.saveProjectProperties,
  })
};

export function useAIChat() {
  const { projectID } = appStore.getState();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: A.aiChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.workspaceContext(projectID??"") });
    },
  })
}