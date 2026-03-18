import { LucideIcon } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onNavigate: (id: string) => void;
}

export default function ProjectCard({
  id,
  name,
  description,
  icon: Icon,
  color,
  onNavigate
}: ProjectCardProps) {
  return (
    <button
      onClick={() => onNavigate(id)}
      className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
      aria-label={`Navigate to ${name}`}
    >
      <div 
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}
        aria-hidden="true"
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-base font-semibold text-gray-800 mb-1">
        {name}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed">
        {description}
      </p>
    </button>
  );
}
