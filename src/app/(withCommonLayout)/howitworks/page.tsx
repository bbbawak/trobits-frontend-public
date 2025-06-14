"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Flame, Target, Heart } from "lucide-react";
import Footer from "@/app/shared/Footer/Footer";

function HowItWorks() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Target className="w-8 h-8 text-blue-400" />,
              title: "Transparency",
              description: "Full visibility into our burning efforts"
            },
            {
              icon: <Heart className="w-8 h-8 text-red-400" />,
              title: "Community",
              description: "Building together for a better future"
            },
            {
              icon: <Flame className="w-8 h-8 text-orange-400" />,
              title: "Impact",
              description: "Real results through token burns"
            }
          ].map((feature, index) => (
            <Card key={index} className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <CardTitle className="text-lg font-semibold text-white">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
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

export default HowItWorks;