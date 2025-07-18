const keys = {
  projects: ["projects"] as const,
  project: (id: string) => ["projects", id] as const,
  board: (id: string) => ["projects", id, "board"] as const,  
};

export default keys;