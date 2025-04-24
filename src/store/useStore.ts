import { create } from 'zustand';

export interface Project {
  name: string;
  location: string;
  priceRange: string;
  builderName: string;
  coordinates: {
    lat: number | null;
    lon: number | null;
  };
}

interface StoreState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  addProject: (project: Project) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearProjects: () => void;
}

export const useStore = create<StoreState>((set) => ({
  projects: [],
  isLoading: false,
  error: null,
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearProjects: () => set({ projects: [] }),
})); 