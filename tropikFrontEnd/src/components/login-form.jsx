"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    // Aquí puedes agregar tu lógica de autenticación
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-[#0d3d2d] rounded-lg p-8 shadow-2xl">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#0a2d1f] border-2 border-[#2ecc71] flex items-center justify-center">
            <img src="/tropik-logo.png" alt="Tropik Logo" className="w-10 h-10" />
          </div>
        </div>
        {/* Título */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-white mb-2">Bienvenido de nuevo</h1>
          <p className="text-sm text-gray-300">Ingrese los datos para iniciar sesión</p>
        </div>
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo de Correo Electrónico */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white text-sm">
              Correo Electrónico:
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-[#0a2d1f] border-[#2ecc71] text-white placeholder:text-gray-500 focus:border-[#2ecc71] focus:ring-[#2ecc71]"
                required
              />
            </div>
          </div>
          {/* Campo de Contraseña */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white text-sm">
              Contraseña:
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-[#0a2d1f] border-[#2ecc71] text-white placeholder:text-gray-500 focus:border-[#2ecc71] focus:ring-[#2ecc71]"
                required
              />
            </div>
          </div>
          {/* Botón de Iniciar Sesión */}
          <Button
            type="submit"
            className="w-full bg-[#5cb85c] hover:bg-[#4cae4c] text-white font-medium py-2.5 rounded-md transition-colors"
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
