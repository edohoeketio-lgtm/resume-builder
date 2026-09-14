import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const InputField = ({ label, name, value, onChange, type = 'text', placeholder, className="mb-4", disabled = false }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}`}
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, rows = 4, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
    />
  </div>
);

const MonthYearPicker = ({ label, value, onChange, disabled }) => {
  const [year, month] = value ? value.split('-') : ['', ''];
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 40}, (_, i) => currentYear - i);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleMonthChange = (e) => {
    onChange(`${year || currentYear}-${e.target.value}`);
  };

  const handleYearChange = (e) => {
    onChange(`${e.target.value}-${month || '01'}`);
  };

  const selectClasses = `w-1/2 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'bg-white'}`;

  return (
    <div className="flex-1 mb-0">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex gap-2">
        <select disabled={disabled} value={month} onChange={handleMonthChange} className={selectClasses}>
          <option value="" disabled hidden>Month</option>
          {months.map((m, i) => (
            <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
          ))}
        </select>
        <select disabled={disabled} value={year} onChange={handleYearChange} className={selectClasses}>
          <option value="" disabled hidden>Year</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const ResumeForm = ({ data, onUpdate, onArrayUpdate, onAddItem, onRemoveItem }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate(name, value);
  };

  return (
    <div className="space-y-6 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-3">Personal Details</h3>
        <InputField label="Full Name" name="name" value={data.name || ''} onChange={handleChange} placeholder="Jane Doe" />
        <InputField label="Professional Title" name="title" value={data.title || ''} onChange={handleChange} placeholder="Software Engineer" />
        <InputField label="Email Address" name="email" value={data.email || ''} onChange={handleChange} type="email" placeholder="jane@example.com" />
        <InputField label="Phone Number" name="phone" value={data.phone || ''} onChange={handleChange} placeholder="(555) 123-4567" />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-3">Summary</h3>
        <TextAreaField label="Professional Summary" name="summary" value={data.summary || ''} onChange={handleChange} rows={3} placeholder="Brief summary of your career..." />
      </section>

      <section>
        <div className="flex justify-between items-center border-b pb-1 mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
          <button 
            onClick={() => onAddItem('experience', { title: '', company: '', startDate: '', endDate: '', isCurrent: false, description: '' })}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm cursor-pointer"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        
        {data.experience.map((exp, index) => (
          <div key={exp.id} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
            <button 
              onClick={() => onRemoveItem('experience', exp.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
            <InputField label="Job Title" name="title" value={exp.title} onChange={(e) => onArrayUpdate('experience', exp.id, 'title', e.target.value)} />
            <InputField label="Company" name="company" value={exp.company} onChange={(e) => onArrayUpdate('experience', exp.id, 'company', e.target.value)} />
            
            <div className="flex flex-col sm:flex-row gap-4 mb-3">
              <MonthYearPicker label="Start Date" value={exp.startDate} onChange={(val) => onArrayUpdate('experience', exp.id, 'startDate', val)} />
              <MonthYearPicker disabled={exp.isCurrent} label={exp.isCurrent ? "End Date (Present)" : "End Date"} value={exp.isCurrent ? '' : exp.endDate} onChange={(val) => onArrayUpdate('experience', exp.id, 'endDate', val)} />
            </div>
            
            <div className="flex items-center mb-4">
              <input 
                type="checkbox" 
                id={`current-job-${exp.id}`} 
                checked={exp.isCurrent || false} 
                onChange={(e) => onArrayUpdate('experience', exp.id, 'isCurrent', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor={`current-job-${exp.id}`} className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">I currently work here</label>
            </div>

            <TextAreaField label="Description" name="description" value={exp.description} onChange={(e) => onArrayUpdate('experience', exp.id, 'description', e.target.value)} rows={3} placeholder="- Did things..." />
          </div>
        ))}
      </section>

      <section>
        <div className="flex justify-between items-center border-b pb-1 mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Education</h3>
          <button 
            onClick={() => onAddItem('education', { degree: '', school: '', startDate: '', endDate: '', isCurrent: false })}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm cursor-pointer"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        
        {data.education.map((edu, index) => (
          <div key={edu.id} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
            <button 
              onClick={() => onRemoveItem('education', edu.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
            <InputField label="Degree / Certificate" name="degree" value={edu.degree} onChange={(e) => onArrayUpdate('education', edu.id, 'degree', e.target.value)} />
            <InputField label="School / University" name="school" value={edu.school} onChange={(e) => onArrayUpdate('education', edu.id, 'school', e.target.value)} />
            
            <div className="flex flex-col sm:flex-row gap-4 mb-3">
              <MonthYearPicker label="Start Date" value={edu.startDate} onChange={(val) => onArrayUpdate('education', edu.id, 'startDate', val)} />
              <MonthYearPicker disabled={edu.isCurrent} label={edu.isCurrent ? "End Date (Present)" : "End Date"} value={edu.isCurrent ? '' : edu.endDate} onChange={(val) => onArrayUpdate('education', edu.id, 'endDate', val)} />
            </div>

            <div className="flex items-center mb-4">
              <input 
                type="checkbox" 
                id={`current-edu-${edu.id}`} 
                checked={edu.isCurrent || false} 
                onChange={(e) => onArrayUpdate('education', edu.id, 'isCurrent', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor={`current-edu-${edu.id}`} className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">I currently study here</label>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ResumeForm;
