import React, { useState } from "react";
import { Mail, Phone, ClipboardList } from "lucide-react";
import heropng from '../assets/Hero Image.png'
import Header from "./Header";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // hook this to your API
  };

  return (
    <div><Header/>

      {/* Hero Image */}
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <img
          src={heropng}
           // replace with your image
          alt="Serenia living room"
          className="w-screen h-full object-cover"
        />
      </div>

      {/* Contact Content */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left Column */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-black mb-6 leading-tight">
                {/* Visible on Desktop (md and up), hidden on Mobile */}
<p className="hidden md:block">  Let’s connect <br /> with us </p>

{/* Visible on Mobile, hidden on Desktop (md and up) */}
<p className="block md:hidden text-center ">  Let’s connect with us </p>
                </h2>
                <p className="text-base text-gray-600 max-w-md leading-relaxed text-center block md:hidden">
                  Discover Serenia up close. Whether you want to ask a question or
                  schedule a private tour our team is ready to assist you.
                </p>
                <p className="text-base text-gray-600 max-w-md leading-relaxed hidden md:block">
                  Discover Serenia up close. Whether you want to ask a question or
                  schedule a private tour our team is ready to assist you.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 mt-12 border border-gray-200">
                {/* Email */}
                <div className="flex items-center gap-4 p-5 border-b sm:border-b-0 sm:border-r border-gray-200">
                  <Mail className="w-5 h-5 text-gray-700 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Email address</p>
                    <a
                      href="mailto:sereniasupport@serenia.com"
                      className="text-sm font-medium text-[#4a4f36] hover:underline"
                    >
                      sereniasupport@serenia.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-5">
                  <Phone className="w-5 h-5 text-gray-700 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Phone number</p>
                    <a
                      href="tel:+13453345005"
                      className="text-sm font-medium text-[#4a4f36]"
                    >
                      (+1) 345 - 3345 - 005
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white shadow-sm border-gray-100">
              {/* Form Header */}
              <div className="flex items-center gap-2 p-5 border-b border-gray-100">
                <ClipboardList className="w-5 h-5 text-gray-600" />
                <h3 className="text-base font-medium text-gray-800">Quick contact</h3>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#4a4f36] focus:border-[#4a4f36]"
                    required
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#4a4f36] focus:border-[#4a4f36]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Phone number</label>
                    <div className="flex">
                      <div className="flex items-center gap-1 border-r-0 border-gray-300 px-3 bg-gray-50">
                        <span>🇺🇸</span>
                        <span className="text-sm">+1</span>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/></svg>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#4a4f36] focus:border-[#4a4f36]"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#4a4f36] focus:border-[#4a4f36] resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#4a4f36] text-white py-3 text-sm font-medium hover:bg-[#3a3f2a] transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}