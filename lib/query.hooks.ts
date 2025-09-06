"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/lib/keys";
import * as A from "@/lib/actions";
import { appStore } from "./stores/app.store";
import { INode, IProject } from "./types";

export function useEditProfile(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: A.editProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.profile })
    },
  })
};

export function useGetAllProjects() {
  const queryKey = keys.workspaces;
  const queryFn = async () => await A.getAllProjects();

  return useQuery({ queryKey, queryFn });
};

export function useGetWorkspaceContext({ projectId }: { projectId: string }) {
  const queryKey = keys.workspaceContext(projectId);
  const queryFn = async () => await A.getWorkspaceContext(projectId);

  return useQuery({ queryKey, queryFn });
};

export function useNewProject({name}: {name: string}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => A.newProject({name}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.workspaces })
    },
  })
};

export function useSaveBoardRoot({boardID, root}: {boardID: string; root: INode;}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => A.saveBoardRoot({boardID, root}),
  })
};

export function useChangeProjectName({projectID, name}: {projectID: string; name: string;}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => A.changeProjectName({projectID, name}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.workspaces })
    },
  })
};

export function useSaveProjectData({projectID, data}: {projectID: string; data: IProject["data"];}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => A.saveProjectData({projectID, data}),
  })
};

export function useSaveProjectProperties({projectID, properties}: {projectID: string; properties: IProject["properties"];}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => A.saveProjectProperties({projectID, properties}),
  })
};

export function useAIChat() {
  const { projectID } = appStore.getState();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: A.aiChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.workspaceContext(projectID) });
    },
  })
}