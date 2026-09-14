import React from 'react';

const ResumePreview = ({ data }) => {
  // Simple helper to render line breaks in text areas
  const renderTextWithBreaks = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="p-8 md:p-12 text-gray-900 bg-white w-full h-full">
      {/* Header */}
      <header className="border-b-2 border-gray-800 pb-6 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-2 text-gray-900">{data.name || 'Your Name'}</h1>
        <h2 className="text-xl md:text-2xl text-gray-600 mb-4 font-light">{data.title || 'Professional Title'}</h2>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase tracking-widest text-gray-800 mb-3">Professional Summary</h3>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            {data.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && (
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase tracking-widest text-gray-800 mb-3">Experience</h3>
          <div className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
            {data.experience}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && (
        <section>
          <h3 className="text-lg font-bold uppercase tracking-widest text-gray-800 mb-3">Education</h3>
          <div className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
            {data.education}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
