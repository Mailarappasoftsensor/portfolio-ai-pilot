
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface PortfolioPreviewProps {
  portfolio: {
    sections: {
      hero: { title: string; subtitle: string; description: string };
      about: { content: string };
      experience: Array<{ id: string; title: string; company: string; duration: string; description: string }>;
      projects: Array<{ id: string; title: string; description: string; technologies: string[]; url: string }>;
      skills: string[];
      contact: { email: string; phone: string; location: string; linkedin: string; github: string };
    };
    theme: string;
  };
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ portfolio }) => {
  const { sections } = portfolio;

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white/5 rounded-lg p-6 min-h-96 max-h-96 overflow-y-auto">
          {/* Hero Preview */}
          {sections.hero.title && (
            <div className="text-center mb-6 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-bold mb-2 text-white">{sections.hero.title}</h2>
              <p className="text-purple-400 text-lg mb-3">{sections.hero.subtitle}</p>
              <p className="text-sm text-gray-300 leading-relaxed">{sections.hero.description}</p>
            </div>
          )}
          
          {/* About Preview */}
          {sections.about.content && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-purple-300">About Me</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {sections.about.content}
              </p>
            </div>
          )}

          {/* Skills Preview */}
          {sections.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-purple-300">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {sections.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Experience Preview */}
          {sections.experience.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-purple-300">Experience</h3>
              <div className="space-y-4">
                {sections.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-purple-500 pl-3">
                    <h4 className="font-medium text-white">{exp.title}</h4>
                    <p className="text-sm text-purple-400">{exp.company}</p>
                    <p className="text-xs text-gray-400 mb-1">{exp.duration}</p>
                    <p className="text-sm text-gray-300">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Preview */}
          {sections.projects.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-purple-300">Projects</h3>
              <div className="space-y-4">
                {sections.projects.map((project, index) => (
                  <div key={index} className="bg-white/5 p-3 rounded border border-white/10">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-white">{project.title}</h4>
                      {project.url && (
                        <ExternalLink className="h-4 w-4 text-purple-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs border-purple-500/50 text-purple-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Preview */}
          {(sections.contact.email || sections.contact.phone || sections.contact.location) && (
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-lg font-semibold mb-3 text-purple-300">Contact</h3>
              <div className="space-y-2 text-sm">
                {sections.contact.email && (
                  <div className="flex items-center text-gray-300">
                    <Mail className="h-4 w-4 mr-2 text-purple-400" />
                    {sections.contact.email}
                  </div>
                )}
                {sections.contact.phone && (
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-4 w-4 mr-2 text-purple-400" />
                    {sections.contact.phone}
                  </div>
                )}
                {sections.contact.location && (
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                    {sections.contact.location}
                  </div>
                )}
                {sections.contact.linkedin && (
                  <div className="flex items-center text-gray-300">
                    <Linkedin className="h-4 w-4 mr-2 text-purple-400" />
                    LinkedIn
                  </div>
                )}
                {sections.contact.github && (
                  <div className="flex items-center text-gray-300">
                    <Github className="h-4 w-4 mr-2 text-purple-400" />
                    GitHub
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioPreview;
