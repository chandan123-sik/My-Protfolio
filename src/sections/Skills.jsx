import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 80 },
      { name: "JavaScript", level: 90 },
      { name: "HTML & CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 90 },
      { name: "REST API", level: 90 },
      { name: "Socket.IO", level: 90 },
    ],
  },
  {
    title: "Database & Tools",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "Git & GitHub", level: 90 },
      { name: "Cloudinary", level: 90 },
      { name: "Postman", level: 80 },
    ],
  },
  {
    title: "CS Fundamentals",
    skills: [
      { name: "DSA (C++)", level: 60 },
      { name: "OOP", level: 90 },
      { name: "JWT & Auth", level: 80 },
      { name: "System Design", level: 40 },
    ],
  },
];

function SkillBar({ name, level, animate }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-primary font-semibold">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-surface overflow-hidden border border-border/40">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animate ? `${level}%` : "0%",
            background: "linear-gradient(90deg, #20b2a6, #a0f0ec)",
            boxShadow: animate ? "0 0 8px rgba(32,178,166,0.5)" : "none",
            transitionDelay: "0.1s",
          }}
        />
      </div>
    </div>
  );
}

export const Skills = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-16 md:py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            What I Know
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Skills &{" "}
            <span className="font-serif italic font-normal text-white">
              Technologies.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A breakdown of my technical skills across frontend, backend, databases, and core CS fundamentals.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, catIdx) => (
            <div
              key={cat.title}
              className="glass p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 animate-fade-in bg-card/60 backdrop-blur-sm"
              style={{ animationDelay: `${catIdx * 100}ms` }}
            >
              {/* Category title */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                  {cat.title}
                </h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {cat.skills.map((skill, i) => (
                  <div
                    key={skill.name}
                    style={{ transitionDelay: `${catIdx * 100 + i * 80}ms` }}
                  >
                    <SkillBar name={skill.name} level={skill.level} animate={animate} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
