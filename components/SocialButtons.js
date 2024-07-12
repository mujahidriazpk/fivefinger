import React from 'react';

const SocialIcons = () => {
  return (
    <div className="flex space-x-4">
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-white transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="#fff"
        >
          <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.792 4.658-4.792 1.324 0 2.463.099 2.795.143v3.24l-1.918.001c-1.503 0-1.794.715-1.794 1.763v2.31h3.588l-.467 3.622h-3.121V24h6.116c.73 0 1.324-.593 1.324-1.324V1.324C24 .593 23.407 0 22.676 0z" />
        </svg>
      </a>
      <a
        href="https://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-white transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="#fff"
        >
          <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.865 9.865 0 01-3.127 1.195 4.918 4.918 0 00-8.384 4.482A13.94 13.94 0 011.671 3.149 4.917 4.917 0 003.195 9.72a4.903 4.903 0 01-2.229-.616v.062a4.917 4.917 0 003.946 4.827 4.903 4.903 0 01-2.224.085 4.923 4.923 0 004.598 3.419A9.868 9.868 0 010 21.543a13.935 13.935 0 007.548 2.213c9.056 0 14.01-7.508 14.01-14.01 0-.213-.005-.426-.014-.637A10.025 10.025 0 0024 4.557z" />
        </svg>
      </a>
    </div>
  );
};

export default SocialIcons;