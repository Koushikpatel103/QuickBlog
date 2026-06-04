import React from 'react'
import assets, { footer_data } from '../assets/assets'

function Footer() {
  return (
    <div className="bg-gray-100 py-12 px-6 mt-10">

      {/* Top Section */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10 max-w-6xl mx-auto">

        {/* Left - Logo + About */}
        <div>
          <img 
            src={assets.logo} 
            alt="logo" 
            className='w-32 sm:w-44'
          />

          <p className='max-w-[410px] text-gray-600 mt-6 leading-relaxed'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Tempore omnis cupiditate libero nisi officia minus repellat 
            quibusdam. Tenetur, fugit odit.
          </p>
        </div>

        {/* Center + Right - Footer Links */}
        <div className="md:col-span-2 grid sm:grid-cols-3 gap-8">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {section.title}
              </h3>

              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-primary transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Copyright */}
      <p className="text-center text-gray-500 text-sm mt-12 pt-6 border-t">
        Copyright © 2025 QuickBlog-Koushik. All rights reserved.
      </p>
    </div>
  )
}

export default Footer;
