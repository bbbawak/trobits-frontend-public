"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/app/shared/Footer/Footer"
import { Users, Newspaper, Gamepad2, MessageCircle, Target, Heart, Award, Flame, Zap } from "lucide-react";

export default function AboutUs() {
  const offerings = [
    {
      icon: <Newspaper className="w-6 h-6 text-blue-400" />,
      title: "Up-to-Date Crypto News",
      description: "Stay informed with the latest in cryptocurrency, from breaking news to in-depth analyses of currencies, projects, and trends."
    },
    {
      icon: <Award className="w-6 h-6 text-green-400" />,
      title: "Engaging Articles",
      description: "Dive into a range of articles that break down complex crypto topics in a clear, reader-friendly manner."
    },
    {
      icon: <Gamepad2 className="w-6 h-6 text-purple-400" />,
      title: "Playful Games",
      description: "Test your crypto knowledge with our interactive games—a fun way to learn and stay sharp."
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-orange-400" />,
      title: "Vibrant Social Community",
      description: "Connect with fellow crypto enthusiasts, discuss the latest, share ideas, or just enjoy some friendly banter."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              Our Features
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            How It Works
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Discover how our platform transforms engagement into value through innovative burn mechanisms
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent w-64" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offerings.map((offering, index) => (
            <Card key={index} className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {offering.icon}
                  <CardTitle className="text-lg font-semibold text-white">
                    {offering.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {offering.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}