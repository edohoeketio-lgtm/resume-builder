import React from 'react';

const ResumeForm = ({ data, onUpdate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate(name, value);
  };

  const InputField = ({ label, name, type = 'text', placeholder }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={data[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
      />
    </div>
  );

  const TextAreaField = ({ label, name, rows = 4, placeholder }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        name={name}
        value={data[name]}
        onChange={handleChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
      />
    </div>
  );

  return (
    <form className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-3">Personal Details</h3>
      <InputField label="Full Name" name="name" placeholder="Jane Doe" />
      <InputField label="Professional Title" name="title" placeholder="Software Engineer" />
      <InputField label="Email Address" name="email" type="email" placeholder="jane@example.com" />
      <InputField label="Phone Number" name="phone" placeholder="(555) 123-4567" />
      
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-3 mt-6">Summary</h3>
      <TextAreaField label="Professional Summary" name="summary" rows={3} placeholder="Brief summary of your career..." />
      
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-3 mt-6">Experience</h3>
      <TextAreaField label="Work Experience" name="experience" rows={5} placeholder="Job Title at Company\nDate - Date\n- Achievement 1..." />
      
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-3 mt-6">Education</h3>
      <TextAreaField label="Education Details" name="education" rows={4} placeholder="Degree\nUniversity\nYear" />
    </form>
  );
};

export default ResumeForm;
