import { useState } from 'react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { generatePDF } from './utils/pdfGenerator';
import { Download } from 'lucide-react';
import './App.css';

function App() {
  const [resumeData, setResumeData] = useState({
    name: 'Jane Doe',
    title: 'Software Engineer',
    email: 'jane@example.com',
    phone: '(555) 123-4567',
    summary: 'A passionate developer with experience in React and Node.js.',
    experience: 'Software Engineer at Tech Corp\n2020 - Present\n- Developed scalable web applications.\n- Collaborated with cross-functional teams.',
    education: 'B.S. Computer Science\nUniversity of Technology\n2016 - 2020'
  });

  const handleUpdate = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleDownload = () => {
    generatePDF('resume-preview', `Resume_${resumeData.name.replace(/ /g, '_')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile-first Layout: Form on top/left, Preview on bottom/right */}
      <div className="w-full md:w-1/3 bg-white p-6 shadow-md z-10 overflow-y-auto max-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Resume Builder</h1>
        <ResumeForm data={resumeData} onUpdate={handleUpdate} />
      </div>
      
      <div className="w-full md:w-2/3 p-4 md:p-8 flex flex-col items-center bg-gray-50 overflow-y-auto max-h-screen relative">
        <div className="w-full max-w-3xl flex justify-end mb-4">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>
        
        {/* The wrapper ID is used by html2pdf */}
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-sm overflow-hidden" style={{ minHeight: '842px' }}>
          <div id="resume-preview">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
