import { useState, useEffect } from 'react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { Download, Edit3, Eye } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('edit');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // 210mm is roughly 794px. Subtracting 32px for p-4 padding.
        setScale((window.innerWidth - 32) / 794);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [resumeData, setResumeData] = useState({
    name: 'Sarah Jenkins',
    title: 'Virtual Assistant & Customer Care Specialist',
    email: 'sarah.jenkins@example.com',
    phone: '(555) 987-6543',
    summary: 'Dedicated and highly organized administrative professional with a passion for delivering exceptional customer experiences. Adept at managing complex schedules, handling high-volume communications, and resolving client inquiries with empathy and efficiency. Fluent in modern digital workspaces and committed to streamlining operations for growing teams.',
    experience: [
      { 
        id: 1, 
        title: 'Freelance Virtual Assistant', 
        company: 'Independent Clients', 
        startDate: '2023-01', 
        endDate: '', 
        isCurrent: true,
        description: '- Managed email inbox triage and calendar scheduling for small business owners, reducing response times by 40%.\n- Handled customer inquiries, billing questions, and appointment bookings via email and social media platforms.\n- Organized digital files, maintained spreadsheets, and performed data entry with 99% accuracy.\n- Coordinated travel arrangements and prepared weekly itinerary reports.' 
      },
      { 
        id: 2, 
        title: 'Community Support Coordinator (Volunteer)', 
        company: 'Local Community Organization', 
        startDate: '2021-06', 
        endDate: '2022-12', 
        isCurrent: false,
        description: '- Acted as the first point of contact for community members, answering questions and providing resources.\n- De-escalated tense situations and resolved complaints with active listening and empathy.\n- Organized weekly community events, managing logistics, vendor communication, and attendee RSVPs.' 
      }
    ],
    education: [
      { 
        id: 1, 
        degree: 'B.A. Communications', 
        school: 'State University', 
        startDate: '2017-08', 
        endDate: '2021-05' 
      }
    ]
  });

  const handleUpdate = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayUpdate = (field, id, key, value) => {
    setResumeData(prev => ({
      ...prev,
      [field]: prev[field].map(item => item.id === id ? { ...item, [key]: value } : item)
    }));
  };

  const handleAddItem = (field, defaultItem) => {
    setResumeData(prev => ({
      ...prev,
      [field]: [...prev[field], { id: Date.now(), ...defaultItem }]
    }));
  };

  const handleRemoveItem = (field, id) => {
    setResumeData(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item.id !== id)
    }));
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col md:flex-row overflow-hidden fixed inset-0 print:static print:h-auto print:overflow-visible print:block print:bg-white">
      
      {/* Mobile Tab Navigation */}
      <div className="md:hidden flex bg-white border-b border-gray-200 shrink-0 shadow-sm z-20 relative print:hidden">
        <button 
          onClick={() => setActiveTab('edit')} 
          className={`flex-1 py-3.5 text-center font-medium flex justify-center items-center gap-2 transition-colors ${activeTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          <Edit3 size={18} /> Edit Details
        </button>
        <button 
          onClick={() => setActiveTab('preview')} 
          className={`flex-1 py-3.5 text-center font-medium flex justify-center items-center gap-2 transition-colors ${activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          <Eye size={18} /> Preview PDF
        </button>
      </div>

      {/* Edit Form Section */}
      <div className={`w-full md:w-1/2 lg:w-1/3 bg-white p-4 md:p-6 shadow-xl z-10 overflow-y-auto h-full print:hidden ${activeTab === 'edit' ? 'block' : 'hidden md:block'}`}>
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 hidden md:block">Resume Builder</h1>
          <ResumeForm 
            data={resumeData} 
            onUpdate={handleUpdate} 
            onArrayUpdate={handleArrayUpdate}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      </div>
      
      {/* Preview Section */}
      <div className={`w-full md:w-1/2 lg:w-2/3 flex-col bg-gray-100 overflow-hidden h-full relative print:w-full print:block print:h-auto print:overflow-visible print:bg-white ${activeTab === 'preview' ? 'flex' : 'hidden md:flex'}`}>
        
        {/* Top bar for download button */}
        <div className="w-full p-4 flex justify-end bg-gray-100/80 backdrop-blur-sm shrink-0 border-b border-gray-200 z-10 sticky top-0 print:hidden">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all active:scale-95 font-medium w-full sm:w-auto justify-center cursor-pointer"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>
        
        {/* Scrollable container for the A4 page */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 flex justify-center print:p-0 print:overflow-visible print:block print:w-full">
          <div 
            className="origin-top print:!scale-100 print:!h-auto"
            style={{ 
              transform: `scale(${scale})`, 
              height: window.innerWidth < 768 ? `${scale * 1122}px` : 'auto',
              marginBottom: '2rem'
            }}
          >
            <div className="bg-white shadow-2xl rounded-sm shrink-0 overflow-hidden print:shadow-none print:m-0 print:w-full" style={{ width: '210mm', minHeight: '297mm' }}>
              <div id="resume-preview" className="w-full h-full">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
