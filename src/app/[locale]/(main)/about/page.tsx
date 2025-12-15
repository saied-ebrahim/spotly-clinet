"use client";

import { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

const teamMembers: TeamMember[] = [

  {
    name: "Saied Ebrahim",
    role: "Team Leader",
    image: "/team/saied.jpg", // Placeholder - replace with actual image path
    bio: "I am a full stack developer with a passion for building web applications. I am a quick learner and I am always looking to improve my skills.",
    linkedin: "https://www.linkedin.com/in/saied-ebrahim/",
    github: "https://github.com/saied-ebrahim",
    email: "saiedebrahim854@gmail.com",
  }, {
    name: "Omar abdelmoaty ",
    role: "Full Stack Developer",
    image: "/team/member1.jpg", // Placeholder - replace with actual image path
    bio: "I am a full stack developer with a passion for building web applications. I am a quick learner and I am always looking to improve my skills.",
    linkedin: "https://www.linkedin.com/in/omarabdelmoaty816/",
    github: "https://github.com/Omar1030",
    email: "omarabdelmoaty816@gmail.com",
  },
  {
    name: "Team Member 3",
    role: "Role/Position",
    image: "/team/member3.jpg", // Placeholder - replace with actual image path
    bio: "Brief description of team member's contribution",
    linkedin: "https://www.linkedin.com/in/hussein-elassy",
    github: "https://github.com/hussien450",
    email: "member3@spotly.com",
  },
  {
    name: "Team Member 4",
    role: "Role/Position",
    image: "/team/member4.jpg", // Placeholder - replace with actual image path
    bio: "Brief description of team member's contribution",
    linkedin: "#GitHub: github.com/tareq-sheta",
    github: "linkedin.com/in/tareqahmadsheta/",
    email: "member4@spotly.com",
  },
  {
    name: "Team Member 5",
    role: "Role/Position",
    image: "/team/member5.jpg", // Placeholder - replace with actual image path
    bio: "Brief description of team member's contribution",
    linkedin: "linkedin.com/in/ahmed-salah-dev",
    github: "github.com/ahmedsalah200",
    // email: "ahmedsalah200@gmail.com",
  },
];

function Page() {
  return (
    <div className="min-h-screen bg-gradient-app">
      {/* Hero Section */}
      <section className="pt-20 pb-12 container">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary">
            About Us
          </h1>
          <p className="text-lg text-text-primary/80 max-w-2xl mx-auto">
            Meet the talented team behind Spotly. We&apos;re passionate about
            creating exceptional experiences and delivering innovative solutions.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="pb-12 container">
        <div className="glass-effect p-6 md:p-8 lg:p-12 rounded-xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-text-primary/80 leading-relaxed">
              <p>
                Spotly is a cutting-edge platform designed to revolutionize how
                you discover and explore properties. Our mission is to provide
                seamless, intuitive experiences that connect people with their
                perfect spaces.
              </p>
              <p>
                Built with passion and dedication, Spotly combines innovative
                technology with user-centric design to deliver exceptional
                results. We believe in creating solutions that not only meet
                your needs but exceed your expectations.
              </p>
              <p>
                Our team of five talented individuals has worked tirelessly to
                bring this vision to life, combining diverse skills and expertise
                to create something truly special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="pb-20 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4">
            Our Team
          </h2>
          <p className="text-lg text-text-primary/80 max-w-2xl mx-auto">
            The passionate individuals who made Spotly possible
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {teamMembers.map((member, index) => {
            const TeamMemberCard = () => {
              const [imageError, setImageError] = useState(false);
              const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=128&background=0F5C3B&color=fff&bold=true`;

              return (
                <div
                  className="glass-effect p-6 rounded-xl relative overflow-hidden group hover:scale-105 transition-all duration-300"
                >
                  {/* Decorative gradient */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/20 transition-colors duration-300"></div>

                  <div className="relative z-10">
                    {/* Team Member Image */}
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      {!imageError ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={() => setImageError(true)}
                          unoptimized
                        />
                      ) : (
                        <img
                          src={fallbackImage}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                    </div>

                    {/* Team Member Info */}
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-text-primary">
                        {member.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {member.role}
                      </p>
                      {member.bio && (
                        <p className="text-sm text-text-primary/70 mt-3 line-clamp-3">
                          {member.bio}
                        </p>
                      )}

                      {/* Social Links */}
                      <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-[#2B293D]/10">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-200 group/link"
                            aria-label={`${member.name}'s LinkedIn`}
                          >
                            <FaLinkedin className="w-4 h-4 text-primary group-hover/link:scale-110 transition-transform" />
                          </a>
                        )}
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-200 group/link"
                            aria-label={`${member.name}'s GitHub`}
                          >
                            <FaGithub className="w-4 h-4 text-primary group-hover/link:scale-110 transition-transform" />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-200 group/link"
                            aria-label={`Email ${member.name}`}
                          >
                            <FaEnvelope className="w-4 h-4 text-primary group-hover/link:scale-110 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            };

            return <TeamMemberCard key={index} />;
          })}
        </div>
      </section>

      {/* Values Section */}
      <section className="pb-20 container">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Innovation",
              description:
                "We constantly push boundaries and explore new possibilities to deliver cutting-edge solutions.",
            },
            {
              title: "Excellence",
              description:
                "We strive for perfection in every detail, ensuring the highest quality in everything we do.",
            },
            {
              title: "Collaboration",
              description:
                "We believe in the power of teamwork and working together to achieve extraordinary results.",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="glass-effect p-6 md:p-8 rounded-xl relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-text-primary/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Page;