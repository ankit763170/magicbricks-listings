'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import ProjectList from '@/components/ProjectList';
import { motion } from 'framer-motion';

// Dynamically import the ProjectMap component with no SSR
const ProjectMap = dynamic(() => import('@/components/ProjectMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 animate-pulse rounded-lg" />
  ),
});

export default function CityPage() {
  const params = useParams();
  const cityName = params.cityName as string;
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/scrape/${cityName}`);
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('Failed to read response');
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6));
              setProjects(prev => [...prev, data.project]);
            }
          }
        }
      } catch (err) {
        setError('Failed to fetch projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [cityName]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (!priceFilter) return true;
    
    const [minPrice, maxPrice] = priceFilter.split('-').map(p => 
      parseFloat(p.replace(/[^0-9.]/g, ''))
    );
    
    const projectMinPrice = parseFloat(project.priceRange.split('-')[0].replace(/[^0-9.]/g, ''));
    const projectMaxPrice = parseFloat(project.priceRange.split('-')[1].replace(/[^0-9.]/g, ''));
    
    return projectMinPrice >= minPrice && projectMaxPrice <= maxPrice;
  });

  const handleProjectSelect = (project: any) => {
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Real Estate Projects in {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
          </h1>
          <p className="mt-2 text-gray-600">
            Explore the latest real estate projects and find your dream home
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProjectMap
              projects={filteredProjects}
              onProjectSelect={handleProjectSelect}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search Projects
                  </label>
                  <input
                    type="text"
                    placeholder="Search by name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Price Ranges</option>
                    <option value="0-50">Under ₹50 Lac</option>
                    <option value="50-100">₹50 Lac - ₹1 Cr</option>
                    <option value="100-200">₹1 Cr - ₹2 Cr</option>
                    <option value="200-500">₹2 Cr - ₹5 Cr</option>
                    <option value="500-1000">₹5 Cr+</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ProjectList
                projects={filteredProjects}
                selectedProject={selectedProject}
                onProjectSelect={handleProjectSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 