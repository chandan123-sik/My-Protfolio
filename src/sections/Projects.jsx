import { ArrowUpRight, Github } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { useState } from "react";
const projects = [
  {
    title: "NowStay (Hotel Booking)",
    description:
      "NowStay is a full-stack hotel management and booking platform built using the MERN stack, designed to provide a seamless room booking experience with real-time inventory and dynamic pricing management.",
    image: "/projects/project1.png",
    tags: ["React", "NodeJS", "ExpressJS", "MongoDB", "SMS India Hub", "Socket.IO", "Tailwind"],
    link: "https://now-stay-three.vercel.app/",
    github: "https://github.com/chandan123-sik/NowStay.git",
  },
  {
    title: "Real Time Chat Application",
    description:
      "A full-stack real-time chat application built using the MERN stack and Socket.IO, enabling instant one-to-one and group messaging with live online/offline user status updates.",
    image: "/projects/project2.png",
    tags: ["React", "NodeJS", "ExpressJS", "Tailwind", "MongoDB", "Socket.IO"],
    link: "https://chat-app-frontent-zeta.vercel.app/login",
    github: "https://github.com/chandan123-sik/Real-Time-Chat-Application.git",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce web application built using the MERN stack, designed to provide a seamless online shopping experience with secure authentication and payment integration.",
    image: "/projects/project3.png",
    tags: ["React", "NodeJS", "ExpressJS", "Tailwind", "Cloudinary"],
    link: "https://forever-frontent.vercel.app/",
    github: "https://github.com/chandan123-sik/Full-Stack-E-commerce-Project.git",
  },
];

export const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 2);
  return (
    <section id="projects" className="py-16 md:py-32 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Projects that
            <span className="font-serif italic font-normal text-white">
              {" "}
              make an impact.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A selection of my recent work, from complex web applications to
            innovative tools that solve real-world problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {visibleProjects.map((project, idx) => (
            <div
              key={project.title}
              className={`group glass rounded-2xl overflow-hidden ${
                showAll && idx === 2
                  ? "project-fly-in md:col-span-2 max-w-lg w-full mx-auto"
                  : "animate-fade-in"
              }`}
              style={{ animationDelay: showAll && idx === 2 ? "0ms" : `${(idx + 1) * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 
                bg-gradient-to-t from-card via-card/50
                 to-transparent opacity-60"
                />
                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </a>
                </div>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 animate-fade-in animation-delay-500 relative z-10">
          {!showAll ? (
            <AnimatedBorderButton onClick={() => setShowAll(true)}>
              View All Projects
              <ArrowUpRight className="w-5 h-5" />
            </AnimatedBorderButton>
          ) : (
            <AnimatedBorderButton onClick={() => setShowAll(false)}>
              Show Less
              <ArrowUpRight className="w-5 h-5 rotate-180" />
            </AnimatedBorderButton>
          )}
        </div>
      </div>
    </section>
  );
};
