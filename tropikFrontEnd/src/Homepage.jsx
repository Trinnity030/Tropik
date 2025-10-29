"use client";

import Link from "next/link";
import { TropikIcon } from "@/components/tropik-icon";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const projects = [
    {
    id: 1,
    name: "TROK",
    origin: "proyecto de origen",
    location: "ubicacion",
    type: "tipo de proyecto",
    date: "fecha",
    },
    {
    id: 2,
    name: "TROK",
    origin: "proyecto de origen",
    location: "ubicacion",
    type: "tipo de proyecto",
    date: "fecha",
    },
    {
    id: 3,
    name: "TROK",
    origin: "proyecto de origen",
    location: "ubicacion",
    type: "tipo de proyecto",
    date: "fecha",
    },
    {
    id: 4,
    name: "TROK",
    origin: "proyecto de origen",
    location: "ubicacion",
    type: "tipo de proyecto",
    date: "fecha",
    },
];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
    <header className="border-b border-[#2a2a2a] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
            <TropikIcon className="w-12 h-12" />
            <h1 className="text-white text-3xl font-bold italic">Tropik</h1>
        </div>
        <Link href="/login">
            <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-2 rounded-md font-medium">
            Iniciar Sesión
            </Button>
        </Link>
        </div>
    </header>
      {/* Hero Section */}
    <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-4xl md:text-5xl font-bold text-center italic mb-16">
            "Tokeniza el futuro, cultiva el cambio"
        </h2>
          {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
            ))}
        </div>
        </div>
    </section>
    </div>
);
}
