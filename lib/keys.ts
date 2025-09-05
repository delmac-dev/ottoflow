const keys = {
  profile: ["profile"] as const,
  workspaces: ["workspaces"] as const,
  workspaceContext: (projectId: string) => ["workspaceContext", projectId] as const,
};

export default keys;