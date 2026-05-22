import { Button } from "@/components/Button";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Download,
} from "lucide-react";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";
import { lazy, Suspense } from "react";

const HolographicSphere = lazy(() =>
  import("../components/HolographicSphere").then(m => ({ default: m.HolographicSphere }))
);

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Mongoose",
  "Redis",
  "Vercel",
  "Render",
  "Netlify",
  "Tailwind CSS",
  "Git",
  "GitHub Actions",
  "C++",
  "Axios",
  "REST API",
  "JWT",
  "Socket.IO",
  "OOPS",
  "Data Structure and Algorithm",
  "Cloudinary",
  "POSTMAN",
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="Hero image"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
      </div>

      {/* Green Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20B2A6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slow-drift ${
                15 + Math.random() * 20
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Software Developer Engineer
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                Bringing{" "}
                <span className="text-primary glow-text animate-highlight-pulse">
                  ideas
                </span>{" "}
                to life
                <br />
                through{" "}
                <span className="font-serif italic font-normal text-white">
                  code.
                </span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 animate-fade-in animation-delay-200">
                Hi, I'm Chandan Sikarwar — a Full Stack Developer focused on
                creating scalable and responsive web experiences with the MERN
                stack.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-in animation-delay-300">
              <a href="#contact">
                <Button size="lg">
                  Contact Me <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <a href="/Chandan_Sikarwar_Resume_pdf (1).pdf" download="Chandan_Sikarwar_Resume.pdf">
                <AnimatedBorderButton>
                  <Download className="w-5 h-5" />
                  Download CV
                </AnimatedBorderButton>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 animate-fade-in animation-delay-400">
              <span className="text-sm text-muted-foreground">Follow me: </span>
              {[
                { icon: Github, href: "https://github.com/chandan123-sik" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/chandan-sikarwar/" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  {<social.icon className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>
          {/* Right Column - 3D Holographic Sphere */}
          <div className="animate-fade-in animation-delay-300 flex items-center justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md" style={{ height: "280px" }}>
              {/* Glow backdrop */}
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl animate-pulse pointer-events-none" />
              <Suspense fallback={<div className="w-full h-full" />}>
                <HolographicSphere />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Technologies I work with
          </p>
          <div className="relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 w-32
             bg-gradient-to-r from-background to-transparent z-10"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-32
             bg-gradient-to-l from-background to-transparent z-10"
            />
            <div className="flex animate-marquee">
              {[...skills, ...skills].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 px-8 py-4">
                  <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 
      animate-fade-in animation-delay-800"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
