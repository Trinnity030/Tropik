"use client";
import { Button } from "@/components/ui/button";

export function ProjectCard({ project }) {
  return (
    <div className="bg-[#0f2818] border-2 border-[#22c55e] rounded-lg p-6 flex flex-col items-center gap-4">
      {/* Icon */}
      <div className="w-32 h-32 flex items-center justify-center">
        <img src="/tropik-logo.png" alt="Tropik Logo" className="w-10 h-10" /> 
      </div>
      {/* Project Info */}
      <div className="text-center space-y-2 w-full">
        <h3 className="text-white text-xl font-bold">{project.name}</h3>
        <p className="text-gray-300 text-sm">{project.origin}</p>
        <p className="text-gray-300 text-sm">{project.location}</p>
        <p className="text-gray-300 text-sm">{project.type}</p>
        <p className="text-gray-300 text-sm">{project.date}</p>
      </div>
      {/* Buy Button */}
      <Button className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium rounded-md py-2 mt-2">
        Comprar
      </Button>
    </div>
  );
}
