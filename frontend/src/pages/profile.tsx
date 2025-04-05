import React from 'react';

function Profile() {
  return (
    <div className="p-10 bg-black text-white min-h-screen flex flex-col items-start space-y-6 font-sans">
      <h1 className="text-6xl font-extrabold tracking-wide">Hey, John Doe</h1>
      <h2 className="text-4xl font-semibold text-gray-300 leading-snug">
        What do you want <br/> to <span className='text-6xl text-yellow-500 font-bold'>learn</span> today?
      </h2>
      <p className="text-lg text-gray-400 max-w-lg leading-relaxed border-l-4 border-yellow-500 pl-4">
        Invest in yourself and take the first step towards your goals. Continuous learning
        is the key to unlocking new opportunities and personal growth.
      </p>
      <div className="mt-6 border-t border-gray-700 w-full max-w-lg"></div>
      <p className="text-lg text-gray-400">📧 john.doe@example.com</p>
      <p className="text-lg text-gray-400">📞 +1 234 567 890</p>
    </div>
  );
}

export default Profile;
