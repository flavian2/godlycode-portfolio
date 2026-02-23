import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import ProjectCard from "../components/ProjectCard";
import ScrollReveal from "../components/ScrollReveal";
import flavianImage from "../assets/img/flavain.jpg";
import { getFeaturedProjects } from "../data/projects";

const Home = () => {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* About Preview Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                {/* Profile Photo Placeholder with Gradient Border */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-celestial-gold to-electric-blue rounded-2xl blur-xl opacity-50" />
                  <div className="relative glass p-2 rounded-2xl">
                    <div className="w-full aspect-square bg-gradient-to-br from-dark-secondary to-dark-tertiary rounded-xl flex items-center justify-center">
                      {/* TODO: Replace with actual professional photo */}
                      <div className="text-center">
                        <div className="text-8xl mb-4">
                          <img
                            src={flavianImage}
                            alt="Flavain Godlycode"
                            className="rounded-full w-32 h-32 mx-auto object-cover"
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Flavian "Godlycode" O. - Full-Stack Developer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  About <span className="gradient-text">Godlycode</span>
                </h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    I'm{" "}
                    <span className="text-celestial-gold font-semibold">
                      Godlycode
                    </span>{" "}
                    — a self-taught full-stack developer from Nigeria who turns
                    complex ideas into powerful, production-ready applications.
                  </p>
                  <p>
                    From banking platforms processing real transactions to
                    AI-powered trading systems, I don't build websites — I build
                    complete digital ecosystems. Every line of code I write is
                    crafted with precision, passion, and purpose.
                  </p>
                  <p>
                    What sets me apart isn't just technical skill — it's the
                    ability to understand complex business logic and translate
                    it into software that actually works in the real world.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { number: "4+", label: "Production Systems" },
                    { number: "3+", label: "Years Experience" },
                    { number: "100%", label: "Full-Stack Mastery" }
                  ].map((stat, index) =>
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="glass p-4 rounded-lg text-center"
                    >
                      <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                        {stat.number}
                      </div>
                      <div className="text-xs text-gray-500">
                        {stat.label}
                      </div>
                    </motion.div>
                  )}
                </div>

                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-8 py-3 border-2 border-celestial-gold text-celestial-gold font-semibold rounded-full hover:bg-celestial-gold hover:text-dark-bg transition-all duration-300 interactive"
                  >
                    Learn More About Me
                  </motion.button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Production-grade applications that power real businesses
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredProjects.map((project, index) =>
              <ProjectCard key={project.id} project={project} index={index} />
            )}
          </div>

          <ScrollReveal>
            <div className="text-center">
              <Link to="/projects">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-celestial-gold text-dark-bg font-bold rounded-full hover:shadow-lg transition-all duration-300 interactive"
                >
                  View All Projects
                </motion.button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tech Stack Section */}
      <TechStack />

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass p-12 rounded-2xl relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-celestial-gold/10 to-electric-blue/10 blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Ready to Build Something{" "}
                  <span className="gradient-text">Extraordinary</span>?
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                  Let's turn your vision into a production-ready application.
                  Whether you're a startup or an established business, I bring
                  the same level of dedication and craftsmanship to every
                  project.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link to="/contact">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-celestial-gold text-dark-bg font-bold rounded-full hover:shadow-lg transition-all duration-300 interactive"
                    >
                      Start a Project
                    </motion.button>
                  </Link>

                  <Link to="/projects">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 glass border-2 border-celestial-gold text-white font-bold rounded-full hover:bg-celestial-gold hover:text-dark-bg transition-all duration-300 interactive"
                    >
                      View My Work
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
