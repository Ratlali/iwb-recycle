import React from 'react';
import recycle from '../assets/recycle.png';
import Navbar from './Layout/Navbar';

const AboutUs = () => {
  return (
    <div className="min-h-screen font-sans bg-white text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 lg:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About <span className="text-blue-500">IWB</span></h1>
          <p className="text-lg md:text-xl text-gray-600">
            From humble beginnings to becoming pioneers in African e-waste recycling.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p>
              IWB was founded in 2024 in Lesotho with a vision to transform e-waste into economic opportunity. Starting from a small setup, we’ve grown into one of Southern Africa’s leaders in sustainable tech recycling.
            </p>
            <p>
              Along the journey, partnerships and innovations helped us scale and deliver environmental impact across the region.
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 text-gray-600 italic">
              “Transforming waste into opportunity while protecting Africa’s future.”
            </blockquote>
          </div>

          <div className="h-72 md:h-96 rounded-lg overflow-hidden shadow-md">
            <img
              src={recycle}
              alt="E-waste recycling"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p>
              IWB recycles computer components like RAM, hard drives, and motherboards with a strong focus on eco-responsibility and creating local jobs.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>RAM recycling</li>
              <li>Data-secure hard drive destruction</li>
              <li>Component recovery</li>
              <li>Eco-friendly material extraction</li>
            </ul>
          </div>

          <div className="h-72 md:h-96 rounded-lg overflow-hidden shadow-md order-first md:order-last">
            <img
              src={recycle}
              alt="Recycling process"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Growth Section */}
      <section className="py-16 px-6 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Growth & Expansion</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
              title: 'Market Penetration',
              desc: 'Recognized across Southern Africa for overcoming barriers and leading e-waste innovation.',
            }, {
              title: 'Investor Interest',
              desc: 'Our impact-driven model attracted investors and regional partners.',
            }, {
              title: 'Technology Platform',
              desc: 'Our cloud platform on Azure optimizes operations across locations.',
            }].map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
