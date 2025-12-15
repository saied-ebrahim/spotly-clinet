"use client";

import { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";

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
    role: "Full Stack Developer",
    image: "https://pub-c00f3c4174b8458d8db60aeff42f8480.r2.dev/saied.jpg", // Placeholder - replace with actual image path
    // bio: "I am a full stack developer with a passion for building web applications. I am a quick learner and I am always looking to improve my skills.",
    linkedin: "https://www.linkedin.com/in/saied-ebrahim/",
    github: "https://github.com/saied-ebrahim",
    email: "saiedebrahim854@gmail.com",
  }, {
    name: "Omar abdelmoaty ",
    role: "Full Stack Developer",
    image: "https://pub-c00f3c4174b8458d8db60aeff42f8480.r2.dev/omar.jpg", // Placeholder - replace with actual image path
    // bio: "I am a full stack developer with a passion for building web applications. I am a quick learner and I am always looking to improve my skills.",
    linkedin: "https://www.linkedin.com/in/omarabdelmoaty816/",
    github: "https://github.com/Omar1030",
    email: "omarabdelmoaty816@gmail.com",
  },
  {
    name: "hussein elassy",
    role: "Full Stack Developer",
    image: "https://pub-c00f3c4174b8458d8db60aeff42f8480.r2.dev/hussien.jpg", // Placeholder - replace with actual image path
    // bio: "Brief description of team member's contribution",
    linkedin: "https://www.linkedin.com/in/hussein-elassy",
    github: "https://github.com/hussien450",
    email: "member3@spotly.com",
  },
  {
    name: "tareq sheta",
    role: "Full Stack Developer",
    image: "https://pub-c00f3c4174b8458d8db60aeff42f8480.r2.dev/tarq.jpg", // Placeholder - replace with actual image path
    // bio: "Brief description of team member's contribution",
    linkedin: "#GitHub: github.com/tareq-sheta",
    github: "linkedin.com/in/tareqahmadsheta/",
    email: "member4@spotly.com",
  },
  {
    name: "ahmed salah",
    role: "Full Stack Developer",
    image: "https://pub-c00f3c4174b8458d8db60aeff42f8480.r2.dev/ahmed.jpg", // Placeholder - replace with actual image path
    // bio: "Brief description of team member's contribution",
    linkedin: "linkedin.com/in/ahmed-salah-dev",
    github: "github.com/ahmedsalah200",
    email: "ahmedsalah200@gmail.com",
  },
];

function Page() {
  const t = useTranslations("about");
  
  return (
    <div className="min-h-screen bg-gradient-app">
      {/* Hero Section */}
      <section className="pt-20 pb-12 container">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary">
            {t("title")}
          </h1>
          <p className="text-lg text-text-primary/80 max-w-2xl mx-auto">
            {t("subtitle")}
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
              {t("ourStory")}
            </h2>
            <div className="space-y-4 text-text-primary/80 leading-relaxed">
              <p>
                {t("story1")}
              </p>
              <p>
                {t("story2")}
              </p>
              <p>
                {t("story3")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="pb-20 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4">
            {t("ourTeam")}
          </h2>
          <p className="text-lg text-text-primary/80 max-w-2xl mx-auto">
            {t("teamSubtitle")}
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
                      <h3 className="text-xl capitalize font-bold text-text-primary">
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
                            aria-label={t("teamMember.linkedin", { name: member.name })}
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
                            aria-label={t("teamMember.github", { name: member.name })}
                          >
                            <FaGithub className="w-4 h-4 text-primary group-hover/link:scale-110 transition-transform" />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-200 group/link"
                            aria-label={t("teamMember.email", { name: member.name })}
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
              key: "innovation",
              title: t("values.innovation.title"),
              description: t("values.innovation.description"),
            },
            {
              key: "excellence",
              title: t("values.excellence.title"),
              description: t("values.excellence.description"),
            },
            {
              key: "collaboration",
              title: t("values.collaboration.title"),
              description: t("values.collaboration.description"),
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