"use client";

import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { useTranslations } from "next-intl";

function Page() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Add API call here
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "info@spotly.com",
      link: "mailto:info@spotly.com",
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+20 123 456 7890",
      link: "tel:+201234567890",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      value: "Cairo, Egypt",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-app">
      {/* Hero Section */}
      <section className="pt-20 pb-12 container">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary">
            Get in Touch
          </h1>
          <p className="text-lg text-text-primary/80 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Send us a message and we&apos;ll
            respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-20 container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="glass-effect p-6 md:p-8 rounded-xl relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-text-primary"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm border-2 border-[#2B293D]/20 rounded-lg outline-none transition-all duration-200 focus:border-[#2B293D] focus:ring-2 focus:ring-[#2B293D]/20 bg-[#2B293D]/5 placeholder:text-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-text-primary"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm border-2 border-[#2B293D]/20 rounded-lg outline-none transition-all duration-200 focus:border-[#2B293D] focus:ring-2 focus:ring-[#2B293D]/20 bg-[#2B293D]/5 placeholder:text-gray-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-text-primary"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border-2 border-[#2B293D]/20 rounded-lg outline-none transition-all duration-200 focus:border-[#2B293D] focus:ring-2 focus:ring-[#2B293D]/20 bg-[#2B293D]/5 placeholder:text-gray-400"
                      placeholder="+20 123 456 7890"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-text-primary"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm border-2 border-[#2B293D]/20 rounded-lg outline-none transition-all duration-200 focus:border-[#2B293D] focus:ring-2 focus:ring-[#2B293D]/20 bg-[#2B293D]/5 placeholder:text-gray-400"
                      placeholder="What's this about?"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-text-primary"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 text-sm border-2 border-[#2B293D]/20 rounded-lg outline-none transition-all duration-200 focus:border-[#2B293D] focus:ring-2 focus:ring-[#2B293D]/20 bg-[#2B293D]/5 placeholder:text-gray-400 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gradient-primary w-full py-3.5 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-primary/30 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <FaPaperPlane className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="glass-effect p-6 md:p-8 rounded-xl relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
                  Contact Information
                </h2>
                <p className="text-text-primary/70 mb-8">
                  Feel free to reach out to us through any of these channels.
                  We&apos;re here to help!
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <a
                        key={index}
                        href={info.link}
                        className="flex items-start gap-4 p-4 rounded-lg bg-[#2B293D]/5 hover:bg-[#2B293D]/10 transition-all duration-200 group"
                      >
                        <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-text-primary mb-1">
                            {info.title}
                          </h3>
                          <p className="text-text-primary/70">{info.value}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="glass-effect p-6 md:p-8 rounded-xl relative overflow-hidden">
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 text-text-primary/70">
                  <p className="flex justify-between">
                    <span className="font-medium">Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Sunday:</span>
                    <span>Closed</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;