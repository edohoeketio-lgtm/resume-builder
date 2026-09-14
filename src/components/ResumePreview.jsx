import React from 'react';

const ResumePreview = ({ data }) => {
  const formatDate = (dateStr, isCurrent) => {
    if (isCurrent) return 'Present';
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 2) return dateStr;
    const [year, month] = parts;
    const date = new Date(year, parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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
      {data.experience && data.experience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase tracking-widest text-gray-800 mb-4">Experience</h3>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-md font-bold text-gray-900">{exp.title}</h4>
                  <span className="text-sm font-medium text-gray-600 whitespace-nowrap ml-4">
                    {formatDate(exp.startDate, false)} {exp.startDate && (exp.endDate || exp.isCurrent) && '- '} {formatDate(exp.endDate, exp.isCurrent)}
                  </span>
                </div>
                <div className="text-md text-gray-700 font-medium mb-2">{exp.company}</div>
                {exp.description && (
                  <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section>
          <h3 className="text-lg font-bold uppercase tracking-widest text-gray-800 mb-4">Education</h3>
          <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-md font-bold text-gray-900">{edu.degree}</h4>
                  <span className="text-sm font-medium text-gray-600 whitespace-nowrap ml-4">
                    {formatDate(edu.startDate, false)} {edu.startDate && (edu.endDate || edu.isCurrent) && '- '} {formatDate(edu.endDate, edu.isCurrent)}
                  </span>
                </div>
                <div className="text-md text-gray-700 font-medium">{edu.school}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
