"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/lib/keys";
import * as P from "@/lib/actions/project.actions";
import { editBoard } from "./actions/board.actions";

export function useGetProjects() {
  const queryKey = keys.projects;
  const queryFn = async () => await P.getProjects();

  return useQuery({ queryKey, queryFn });
};

export function useNewProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: P.newProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.projects })
    },
  })
}

export function useCloneProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: P.cloneProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.projects })
    },
  })
}

export function useEditProjectInfo(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: P.editProjectInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.project(id) })
    },
  })
}

export function useEditScheduleData() {
  return useMutation({
    mutationFn: P.editScheduleData
  })
}

export function useEditScheduleInfo() {
  return useMutation({
    mutationFn: P.editScheduleInfo
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: P.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.projects })
    },
  })
}

export function useEditBoard() {
  return useMutation({
    mutationFn: editBoard
  })
}

export function useHandlePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: P.handlePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.projects })
    },
  })
}