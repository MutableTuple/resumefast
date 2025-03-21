"use client";

import React, { useRef, useState, useEffect } from "react";
import { MdOutlineEmail, MdOutlineLocationOn, MdPhone, MdLink, MdAdd, MdDelete, MdFileDownload, MdSave, MdContentCopy } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import SponsoredAdsSection from "./SponsoredAdsSection";
import { supabase } from "../_lib/supabase";
import { formatNumber } from "../_utils/formatNumber";
import { v4 as uuidv4 } from "uuid"; // You may need to install this package

// EditableField component with improved styling
const EditableField = ({ value, className, placeholder, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value || "");

  const handleBlur = () => {
    setIsEditing(false);
    if (onChange) onChange(text);
  };
  
  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setText(value || "");
  }, [value]);

  return isEditing ? (
    <input
      autoFocus
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={`border-b border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all p-1 w-full ${className}`}
    />
  ) : (
    <span
      onClick={() => setIsEditing(true)}
      className="cursor-pointer px-1 hover:bg-gray-200 rounded-md transition"
    >
      {text || <span className="text-gray-400 italic">{placeholder || "Click to edit"}</span>}
    </span>
  );
};

// EditableTextArea for longer text content
const EditableTextArea = ({ value, className, placeholder, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value || "");

  const handleBlur = () => {
    setIsEditing(false);
    if (onChange) onChange(text);
  };
  
  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setText(value || "");
  }, [value]);

  return isEditing ? (
    <textarea
      autoFocus
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={`border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all p-2 w-full min-h-20 ${className}`}
    />
  ) : (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer px-1 hover:bg-gray-200 rounded-md transition min-h-8"
    >
      {text || <span className="text-gray-400 italic">{placeholder || "Click to edit"}</span>}
    </div>
  );
};

export default function EditableResume({dwnld_val}) {
  const resumeRef = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [template, setTemplate] = useState("modern"); // modern, classic, minimal
  const [resumeId, setResumeId] = useState(null);
  const [saveStatus, setSaveStatus] = useState(""); // For showing save status messages

  // Personal Information state
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Smith",
    title: "Fullstack Developer",
    summary: "Experienced developer with a passion for creating efficient, scalable web applications. Skilled in modern JavaScript frameworks and backend technologies.",
    email: "johnsmith@email.com",
    phone: "(555) 123-4567",
    location: "NY, USA"
  });

  // States for each section
  const [experiences, setExperiences] = useState([
    { id: 1, company: "Tech Company", position: "Senior Developer", period: "2020-Present", description: "Led development of key features and managed team of junior developers." }
  ]);

  const [education, setEducation] = useState([
    { id: 1, school: "University of Technology", degree: "BS Computer Science", year: "2016-2020", description: "Graduated with honors. Relevant coursework in algorithms, data structures, and software engineering." }
  ]);

  const [skills, setSkills] = useState([
    { id: 1, name: "JavaScript" },
    { id: 2, name: "React" },
    { id: 3, name: "Node.js" },
    { id: 4, name: "CSS/Tailwind" }
  ]);

  const [projects, setProjects] = useState([
    { id: 1, name: "E-commerce Platform", description: "Built full-stack e-commerce site with React, Node.js, and MongoDB.", link: "github.com/username/project" }
  ]);

  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: "LinkedIn", url: "linkedin.com/in/username" },
    { id: 2, platform: "GitHub", url: "github.com/username" }
  ]);

  const [certifications, setCertifications] = useState([
    { id: 1, name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2023", link: "" }
  ]);

  // Functions to update personal info
  const updatePersonalInfo = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Functions to add new items
  const addExperience = () => {
    const newId = experiences.length ? Math.max(...experiences.map(e => e.id)) + 1 : 1;
    setExperiences([...experiences, { id: newId, company: "", position: "", period: "", description: "" }]);
  };

  const addEducation = () => {
    const newId = education.length ? Math.max(...education.map(e => e.id)) + 1 : 1;
    setEducation([...education, { id: newId, school: "", degree: "", year: "", description: "" }]);
  };

  const addSkill = () => {
    const newId = skills.length ? Math.max(...skills.map(s => s.id)) + 1 : 1;
    setSkills([...skills, { id: newId, name: "" }]);
  };

  const addProject = () => {
    const newId = projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setProjects([...projects, { id: newId, name: "", description: "", link: "" }]);
  };

  const addSocialLink = () => {
    const newId = socialLinks.length ? Math.max(...socialLinks.map(l => l.id)) + 1 : 1;
    setSocialLinks([...socialLinks, { id: newId, platform: "", url: "" }]);
  };

  const addCertification = () => {
    const newId = certifications.length ? Math.max(...certifications.map(c => c.id)) + 1 : 1;
    setCertifications([...certifications, { id: newId, name: "", issuer: "", date: "", link: "" }]);
  };

  // Functions to remove items
  const removeExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const removeEducation = (id) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const removeSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const removeProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const removeSocialLink = (id) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const removeCertification = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  // Function to update experience items
  const updateExperience = (id, field, value) => {
    setExperiences(prev => prev.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  // Function to update education items
  const updateEducation = (id, field, value) => {
    setEducation(prev => prev.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  // Function to update skill items
  const updateSkill = (id, value) => {
    setSkills(prev => prev.map(skill => 
      skill.id === id ? { ...skill, name: value } : skill
    ));
  };

  // Function to update project items
  const updateProject = (id, field, value) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  // Function to update social link items
  const updateSocialLink = (id, field, value) => {
    setSocialLinks(prev => prev.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  // Function to update certification items
  const updateCertification = (id, field, value) => {
    setCertifications(prev => prev.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  // Prepare complete resume data for storage
  const compileResumeData = () => {
    return {
      id: resumeId || uuidv4(),
      template,
      personalInfo,
      experiences,
      education,
      skills,
      projects,
      socialLinks,
      certifications,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  };

  // Save resume data to Supabase
  const saveResumeToSupabase = async () => {
    try {
      setSaveStatus("Saving...");
      const resumeData = compileResumeData();
      
      const { data, error } = await supabase
        .from('resumes')
        .upsert({ 
          id: resumeData.id, 
          data: resumeData 
        }, { 
          onConflict: 'id',
          returning: 'minimal'
        });
        
      if (error) {
        console.error("Error saving resume:", error);
        setSaveStatus("Failed to save");
        throw error;
      }
      
      // If this is a new resume, store the ID
      if (!resumeId) {
        setResumeId(resumeData.id);
      }
      
      setSaveStatus("Saved successfully!");
      console.log("Resume saved successfully!");
      
      // Hide the success message after 3 seconds
      setTimeout(() => {
        setSaveStatus("");
      }, 3000);
      
      return resumeData.id;
    } catch (error) {
      console.error("Error in save process:", error);
      setSaveStatus("Error saving resume");
      throw error;
    }
  };

  // Load resume data from Supabase
  const loadResumeFromSupabase = async (id) => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('data')
        .eq('id', id)
        .single();
        
      if (error) {
        console.error("Error loading resume:", error);
        throw error;
      }
      
      if (!data) {
        console.error("Resume not found");
        return;
      }
      
      const resumeData = data.data;
      
      // Populate all states from the loaded data
      setResumeId(resumeData.id);
      setTemplate(resumeData.template || "modern");
      setPersonalInfo(resumeData.personalInfo || {});
      setExperiences(resumeData.experiences || []);
      setEducation(resumeData.education || []);
      setSkills(resumeData.skills || []);
      setProjects(resumeData.projects || []);
      setSocialLinks(resumeData.socialLinks || []);
      setCertifications(resumeData.certifications || []);
      
      console.log("Resume loaded successfully!");
    } catch (error) {
      console.error("Error in load process:", error);
      throw error;
    }
  };

  // Generate shareable link
  const generateShareableLink = () => {
    if (!resumeId) return null;
    return `${window.location.origin}/resume/${resumeId}`;
  };

  // Copy shareable link to clipboard
  const copyShareableLink = async () => {
    const link = generateShareableLink();
    if (link) {
      try {
        await navigator.clipboard.writeText(link);
        setSaveStatus("Link copied to clipboard!");
        setTimeout(() => {
          setSaveStatus("");
        }, 3000);
      } catch (err) {
        console.error("Failed to copy link:", err);
        setSaveStatus("Failed to copy link");
      }
    }
  };

  // PDF generation
  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
      
    setIsPrinting(true);
    
    // Start the increment counter in Supabase
    const incrementDownloadCount = async () => {
      try {
        // First, get the current count
        const { data: currentData, error: fetchError } = await supabase
          .from('resume_downloaded')
          .select('value')
          .eq('id', 'fa95afaa-1f06-4e31-99b5-43e7bf2074e1')
          .single();
        
        if (fetchError) {
          console.error("Error fetching download count:", fetchError);
          return;
        }
        
        // Increment the count
        const { error: updateError } = await supabase
          .from('resume_downloaded')
          .update({ value: (currentData?.value || 0) + 1 })
          .eq('id', 'fa95afaa-1f06-4e31-99b5-43e7bf2074e1');
        
        if (updateError) {
          console.error("Error updating download count:", updateError);
        } else {
          console.log("Download count incremented successfully");
        }
      } catch (error) {
        console.error("Error with download tracking:", error);
      }
    };
  
    // Start the increment process (don't wait for it to complete)
    incrementDownloadCount();
    
    // Save the resume before downloading
    try {
      await saveResumeToSupabase();
    } catch (error) {
      console.error("Failed to save resume before download:", error);
      // Continue with download even if save fails
    }
    
    setTimeout(async () => {
      try {
        const pdf = new jsPDF("p", "mm", "a4");
        const pageHeight = 297; // A4 height in mm
        const padding = 10;
          
        const canvas = await html2canvas(resumeRef.current, {
          scale: 2,
          useCORS: true,
        });
          
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
        let yPosition = 0;
        while (yPosition < imgHeight) {
          if (yPosition > 0) pdf.addPage(); // Add a new page if not the first
            
          pdf.addImage(imgData, "PNG", 0, -yPosition, imgWidth, imgHeight);
          yPosition += pageHeight - padding; // Move to next page
        }
          
        pdf.save("resume.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsPrinting(false);
      }
    }, 100);
  };

  // Section component to make code more organized
  const Section = ({ title, children, onAdd, buttonText }) => (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className={`text-xl font-bold text-gray-800 ${template === 'modern' ? 'border-b-2 border-blue-500' : ''} inline-block`}>{title}</h3>
        {onAdd && !isPrinting && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors print:hidden"
          >
            <MdAdd /> {buttonText || "Add"}
          </button>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col items-center p-4 max-w-4xl mx-auto">
      <div className="w-full text-center mb-6">
        <h1 className="text-4xl font-bold relative">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-x bg-300">
            ResumeFast
          </span>
        </h1>
        <p className="italic text-stone-700 mt-1">
          Build your ATS friendly resume fast with
          <span className="font-semibold border-b mx-1 border-dashed border-black">resumefast!</span>
          no login or signup!
        </p>
      </div>

      {/* Save Status Message */}
      {saveStatus && (
        <div className="w-full mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-lg text-center">
          {saveStatus}
        </div>
      )}

      {/* Template Selection - Hidden during printing */}
      {!isPrinting && (
        <div className="w-full mb-6 flex justify-between items-center bg-white/50 backdrop-blur-md p-4 rounded-xl shadow-md">
          {/* Template Selection Buttons */}
          <div className="flex gap-3">
            {["modern", "classic", "minimal"].map((type) => (
              <button
                key={type}
                onClick={() => setTemplate(type)}
                className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 
                  ${
                    template === type
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-400/50 scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        
          {/* ATS-Friendly Text */}
          <div className="text-sm text-gray-600 font-medium">
            ✅ ATS-friendly resume
          </div>
        </div>
      )}
  
      {/* Resume Container */}
      <div 
        ref={resumeRef} 
        className={`w-full p-6 border border-stone-300 bg-white shadow-lg rounded-lg 
                    ${template === 'minimal' ? 'font-sans' : 
                      template === 'classic' ? 'font-serif' : 'font-sans'}`}
      >
        {/* Header Section */}
        <div className={`w-full flex flex-col gap-2 ${template !== 'minimal' ? 'border-b border-gray-200 pb-4' : ''}`}>
          <h1 className={`text-3xl font-bold ${template === 'classic' ? 'text-center' : ''} 
                          ${template === 'minimal' ? 'text-gray-800' : ''}`}>
            <EditableField 
              value={personalInfo.name} 
              className="font-bold" 
              placeholder="Your Name" 
              onChange={(value) => updatePersonalInfo('name', value)}
            />
          </h1>
          <h2 className={`text-lg font-semibold text-gray-700 ${template === 'classic' ? 'text-center' : ''}`}>
            <EditableField 
              value={personalInfo.title} 
              className="font-semibold" 
              placeholder="Job Title" 
              onChange={(value) => updatePersonalInfo('title', value)}
            />
          </h2>
          <p className={`text-sm text-gray-600 w-full leading-relaxed ${template === 'classic' ? 'text-center' : ''}`}>
            <EditableTextArea
              value={personalInfo.summary}
              className="text-sm w-full"
              placeholder="Professional Summary"
              onChange={(value) => updatePersonalInfo('summary', value)}
            />
          </p>

          {/* Contact Info */}
          <div className={`flex flex-wrap mt-4 gap-4 text-gray-600 ${template === 'classic' ? 'justify-center' : ''}`}>
            <span className="flex gap-2 items-center text-sm">
              <MdOutlineEmail className="text-lg text-blue-500" />
              <EditableField 
                value={personalInfo.email} 
                placeholder="Email" 
                onChange={(value) => updatePersonalInfo('email', value)}
              />
            </span>
            <span className="flex gap-2 items-center text-sm">
              <MdPhone className="text-lg text-blue-500" />
              <EditableField 
                value={personalInfo.phone} 
                placeholder="Phone" 
                onChange={(value) => updatePersonalInfo('phone', value)}
              />
            </span>
            <span className="flex gap-2 items-center text-sm">
              <MdOutlineLocationOn className="text-lg text-green-500" />
              <EditableField 
                value={personalInfo.location} 
                placeholder="Location" 
                onChange={(value) => updatePersonalInfo('location', value)}
              />
            </span>
          </div>

          {/* Social Links */}
          <div className={`flex flex-wrap mt-2 gap-4 ${template === 'classic' ? 'justify-center' : ''}`}>
            {socialLinks.map((link) => (
              <div key={link.id} className="flex items-center gap-2 text-sm group relative">
                {link.platform === "LinkedIn" && <FaLinkedin className="text-blue-600" />}
                {link.platform === "GitHub" && <FaGithub className="text-gray-800" />}
                {!["LinkedIn", "GitHub"].includes(link.platform) && <MdLink className="text-blue-500" />}
                <EditableField 
                  value={link.platform} 
                  placeholder="Platform"
                  className="w-20"
                  onChange={(value) => updateSocialLink(link.id, 'platform', value)}
                />
                <EditableField 
                  value={link.url} 
                  placeholder="URL"
                  onChange={(value) => updateSocialLink(link.id, 'url', value)}
                />
                {!isPrinting && (
                  <button 
                    onClick={() => removeSocialLink(link.id)}
                    className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            ))}
            {!isPrinting && (
              <button 
                onClick={addSocialLink}
                className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-800 transition-colors print:hidden"
              >
                <MdAdd /> Add Link
              </button>
            )}
          </div>
        </div>

        {/* Experience Section */}
        <Section title="Professional Experience" onAdd={addExperience} buttonText="Add Experience">
          {experiences.map((exp) => (
            <div key={exp.id} className={`mb-4 ${template === 'modern' ? 'pl-2 border-l-2 border-gray-200' : ''} group relative`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className={`text-lg font-semibold ${template === 'classic' ? 'text-gray-800' : ''}`}>
                    <EditableField 
                      value={exp.position} 
                      placeholder="Position" 
                      onChange={(value) => updateExperience(exp.id, 'position', value)}
                    />
                  </div>
                  <div className={`flex justify-between text-sm ${template === 'minimal' ? 'text-gray-700' : ''}`}>
                    <span className="font-medium text-gray-700">
                      <EditableField 
                        value={exp.company} 
                        placeholder="Company" 
                        onChange={(value) => updateExperience(exp.id, 'company', value)}
                      />
                    </span>
                    <span className="text-gray-500">
                      <EditableField 
                        value={exp.period} 
                        placeholder="Time Period" 
                        onChange={(value) => updateExperience(exp.id, 'period', value)}
                      />
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    <EditableTextArea 
                      value={exp.description} 
                      placeholder="Job description and achievements" 
                      onChange={(value) => updateExperience(exp.id, 'description', value)}
                    />
                  </div>
                </div>
                {!isPrinting && (
                  <button 
                    onClick={() => removeExperience(exp.id)} 
                    className="text-red-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            </div>
          ))}
        </Section>

        {/* Education Section */}
        <Section title="Education" onAdd={addEducation} buttonText="Add Education">
          {education.map((edu) => (
            <div key={edu.id} className={`mb-4 ${template === 'modern' ? 'pl-2 border-l-2 border-gray-200' : ''} group relative`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-lg font-semibold">
                    <EditableField 
                      value={edu.degree} 
                      placeholder="Degree/Certificate" 
                      onChange={(value) => updateEducation(edu.id, 'degree', value)}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">
                      <EditableField 
                        value={edu.school} 
                        placeholder="School/University" 
                        onChange={(value) => updateEducation(edu.id, 'school', value)}
                      />
                    </span>
                    <span className="text-gray-500">
                      <EditableField 
                        value={edu.year} 
                        placeholder="Years" 
                        onChange={(value) => updateEducation(edu.id, 'year', value)}
                      />
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    <EditableTextArea 
                      value={edu.description} 
                      placeholder="Relevant coursework and achievements" 
                      onChange={(value) => updateEducation(edu.id, 'description', value)}
                    />
                  </div>
                </div>
                {!isPrinting && (
                  <button 
                    onClick={() => removeEducation(edu.id)} 
                    className="text-red-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            </div>
          ))}
        </Section>

        {/* Certifications Section */}
        <Section title="Certifications" onAdd={addCertification} buttonText="Add Certification">
          {certifications.map((cert) => (
            <div key={cert.id} className={`mb-4 ${template === 'modern' ? 'pl-2 border-l-2 border-gray-200' : ''} group relative`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-lg font-semibold">
                    <EditableField 
                      value={cert.name} 
                      placeholder="Certification Name" 
                      onChange={(value) => updateCertification(cert.id, 'name', value)}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">
                      <EditableField 
                        value={cert.issuer} 
                        placeholder="Issuing Organization" 
                        onChange={(value) => updateCertification(cert.id, 'issuer', value)}
                      />
                    </span>
                    <span className="text-gray-500">
                      <EditableField 
                        value={cert.date} 
                        placeholder="Date" 
                        onChange={(value) => updateCertification(cert.id, 'date', value)}
                      />
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-blue-600">
                    <span className="flex items-center gap-1">
                      <MdLink />
                      <EditableField 
                        value={cert.link} 
                        placeholder="Certification Link" 
                        onChange={(value) => updateCertification(cert.id, 'link', value)}
                      />
                    </span>
                  </div>
                </div>
                {!isPrinting && (
                  <button 
                    onClick={() => removeCertification(cert.id)} 
                    className="text-red-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            </div>
          ))}
        </Section>

        {/* Skills Section */}
        <Section title="Skills" onAdd={addSkill} buttonText="Add Skill">
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill) => (
              <div key={skill.id} className={`${template === 'modern' ? 'bg-gray-100 rounded-full' : 
                                              template === 'minimal' ? 'border border-gray-300 rounded' :
                                              'bg-gray-50 rounded'} px-3 py-1 text-sm group relative`}>
                <EditableField value={skill.name} placeholder="Skill" />
                {!isPrinting && (
                  <button 
                    onClick={() => removeSkill(skill.id)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* Projects Section */}
        <Section title="Projects" onAdd={addProject} buttonText="Add Project">
          {projects.map((project) => (
            <div key={project.id} className={`mb-4 ${template === 'modern' ? 'pl-2 border-l-2 border-gray-200' : ''} group relative`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-lg font-semibold">
                    <EditableField value={project.name} placeholder="Project Name" />
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    <EditableTextArea value={project.description} placeholder="Project description and technologies used" />
                  </div>
                  <div className="mt-1 text-sm text-blue-600">
                    <span className="flex items-center gap-1">
                      <MdLink />
                      <EditableField value={project.link} placeholder="Project Link" />
                    </span>
                  </div>
                </div>
                {!isPrinting && (
                  <button 
                    onClick={() => removeProject(project.id)} 
                    className="text-red-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            </div>
          ))}
        </Section>
      </div>
   {/* ADS */}
   <p className="mt-4  text-xs text-stone-500">Sponsored</p>
   <SponsoredAdsSection />
      {/* Action Buttons - Hidden during printing */}
      {!isPrinting && (
        <div className="mt-6 flex gap-4 flex-col">
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-400/50 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
           
            <MdFileDownload className="text-xl" /> Download as PDF
          </button>
         <span className="text-xs  text-stone-600 text-center italic">{formatNumber(dwnld_val)} resume(s) downloaded till now</span>
        </div>
      )}
    </div>
  );
}