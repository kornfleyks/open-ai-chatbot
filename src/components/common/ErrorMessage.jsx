import React from 'react';

export default function ErrorMessage({ error, theme }) {
  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'}`}>
      {error}
    </div>
  );
}
