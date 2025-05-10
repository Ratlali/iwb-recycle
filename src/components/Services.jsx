import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Layout/Navbar';

import service1 from '../assets/2.jpg';
import service2 from '../assets/3.jpg';
import service3 from '../assets/4.jpg';

const preloadImages = () => {
  [service1, service2, service3].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const Services = () => {
  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 font-sans">
      <Navbar />

      <section className="text-center pt-24 pb-12 px-4">
        <motion.h1
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold text-blue-900 mb-4"
        >
          What We Offer
        </motion.h1>
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg text-blue-700 max-w-2xl mx-auto"
        >
          We provide efficient and sustainable electronic waste services tailored to your needs.
        </motion.p>
      </section>

      <section className="px-6 py-10 grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
        {[{
          title: 'RAM Recovery',
          desc: 'Safe and sustainable recycling of memory modules from various electronics.',
          image: service1
        }, {
          title: 'Drive Disposal',
          desc: 'Certified data destruction and secure handling of storage devices.',
          image: service2
        }, {
          title: 'Board Extraction',
          desc: 'Advanced recovery of components and metals from motherboards.',
          image: service3
        }].map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h3>
              <p className="text-blue-700 text-sm mb-4">{item.desc}</p>
              <button className="text-blue-600 hover:underline font-medium">Discover More →</button>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="bg-blue-50 py-12 px-6 text-center">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-bold text-blue-900 mb-4"
        >
          How It Works
        </motion.h2>
        <p className="text-blue-700 max-w-xl mx-auto mb-10">
          We follow a simple yet secure process to ensure efficient electronic waste recycling.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: 'Collect', desc: 'We pick up or receive your electronics safely.' },
            { step: 'Sort', desc: 'We classify devices and components accordingly.' },
            { step: 'Process', desc: 'Items are disassembled and materials separated.' },
            { step: 'Recover', desc: 'We extract reusable parts and refine raw materials.' }
          ].map((step, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow"
            >
              <div className="text-blue-600 text-xl font-bold mb-2">{step.step}</div>
              <p className="text-blue-800 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* <section className="px-6 py-16 bg-white text-center">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-bold text-blue-900 mb-4"
        >
          Join Our Green Mission
        </motion.h2>
        <p className="text-blue-700 mb-6 max-w-xl mx-auto">
          Thousands of individuals and organizations trust us with their e-waste — make the responsible choice today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Business Portal
          </button>
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Personal Portal
          </button>
        </div>
      </section> */}
    </div>
  );
};

export default Services;