import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async (elementId, filename = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      alert("Could not find the resume preview to download.");
      return;
    }
    
    // Generate canvas from HTML
    const canvas = await html2canvas(element, {
      scale: 2, // higher scale for better resolution
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });
    
    // Convert canvas to image
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    // Create PDF (letter size)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });
    
    // Calculate dimensions to fit exactly on letter paper (8.5 x 11 inches)
    const pdfWidth = 8.5;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Add image and save
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
    
  } catch (error) {
    console.error("PDF generation failed:", error);
    alert(`There was an issue generating the PDF: ${error.message}`);
  }
};
