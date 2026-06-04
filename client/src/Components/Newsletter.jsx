import React from 'react'

function Newsletter() {
  return (
    <div className="text-center my-12 px-4">
      
      <h1 className="text-3xl text-gray-800 mb-3 font-semibold">
        Never Miss a Blog!
      </h1>

      <p className="text-gray-600 mb-6 ">
        Subscribe to get the latest blogs, new tech updates, and exclusive news.
      </p>

      <form className="flex items-center justify-between max-w-2xl w-full mx-auto md:h-13 h-12">
        
        <input 
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-600"
          type="email"
          placeholder="Enter your email"
          required
        />

        <button 
          type="submit" 
          className="md:px-12 px-8 h-full text-white bg-red-500 hover:bg-primary/90 transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>

      </form>

    </div>
  )
}

export default Newsletter
