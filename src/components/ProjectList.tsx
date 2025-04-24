'use client';

import { motion } from 'framer-motion';

interface ProjectListProps {
  projects: any[];
  selectedProject: any;
  onProjectSelect: (project: any) => void;
}

export default function ProjectList({ projects, selectedProject, onProjectSelect }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No projects found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`cursor-pointer ${
            selectedProject === project
              ? 'ring-2 ring-blue-500'
              : 'hover:ring-2 hover:ring-blue-200'
          }`}
          onClick={() => onProjectSelect(project)}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {project.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{project.location}</p>
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-semibold">
                  {project.priceRange}
                </span>
                <span className="text-gray-500 text-sm">
                  by {project.builderName}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 