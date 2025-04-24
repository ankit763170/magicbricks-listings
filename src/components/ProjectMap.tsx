'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Project } from '@/store/useStore';

// Fix for default marker icons in Next.js
const defaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const highlightedIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [35, 51],
  iconAnchor: [17, 51],
  popupAnchor: [1, -34],
  shadowSize: [51, 51]
});

interface ProjectMapProps {
  projects: Project[];
  center: [number, number];
  zoom: number;
}

// Component to handle map updates
function MapUpdater({ projects, selectedProject }: { projects: Project[]; selectedProject: Project | null }) {
  const map = useMap();

  useEffect(() => {
    if (projects.length > 0) {
      const bounds = L.latLngBounds(
        projects.map(project => [project.coordinates.lat, project.coordinates.lon])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [projects, map]);

  useEffect(() => {
    if (selectedProject) {
      map.flyTo(
        [selectedProject.coordinates.lat, selectedProject.coordinates.lon],
        15,
        { duration: 1 }
      );
    }
  }, [selectedProject, map]);

  return null;
}

const ProjectMap: React.FC<ProjectMapProps> = ({ projects, center, zoom }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMarkerClick = (project: Project) => {
    setSelectedProject(project);
  };

  if (!mounted) {
    return (
      <div className="w-full h-[500px] bg-gray-100 animate-pulse rounded-lg" />
    );
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        touchZoom={true}
        dragging={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapUpdater projects={projects} selectedProject={selectedProject} />
        {projects.map((project, index) => (
          <Marker
            key={index}
            position={[project.coordinates.lat, project.coordinates.lon]}
            icon={selectedProject === project ? highlightedIcon : defaultIcon}
            eventHandlers={{
              click: () => handleMarkerClick(project),
            }}
          >
            <Popup className="min-w-[250px]">
              <div className="p-2">
                <h3 className="font-bold text-lg mb-1">{project.name}</h3>
                <p className="text-gray-600 mb-2">{project.location}</p>
                <p className="text-green-600 font-semibold">{project.priceRange}</p>
                <p className="text-gray-500 text-sm">by {project.builderName}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ProjectMap; 