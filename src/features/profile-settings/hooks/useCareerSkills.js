import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export const useCareerSkills = (initialUser) => {
  const navigate = useNavigate();
  const { resetOnboarding } = useAuth();
  const [newSkill, setNewSkill] = useState('');
  const [isReprocessing, setIsReprocessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [careerInfo, setCareerInfo] = useState({
    currentRole: initialUser?.role || 'Full Stack Developer',
    targetRole: 'Senior Full Stack Developer',
    experienceLevel: initialUser?.level || 'Fresh Graduate',
    skills: ['React.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Git', 'REST API'],
    education: [
      {
        id: 1,
        institution: 'Universitas Gadjah Mada',
        degree: 'S1 Informatika',
        year: '2022 - 2026',
      },
    ],
  });

  const updateCareerInfo = useCallback((field, value) => {
    setCareerInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  const addSkill = useCallback((skill) => {
    if (skill && !careerInfo.skills.includes(skill)) {
      setCareerInfo(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  }, [careerInfo.skills]);

  const removeSkill = useCallback((skillToRemove) => {
    setCareerInfo(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove),
    }));
  }, []);

  const handleReprocess = useCallback(async () => {
    setIsReprocessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsReprocessing(false);
    setIsModalOpen(false);
    resetOnboarding();
    navigate('/onboarding');
  }, [navigate, resetOnboarding]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    careerInfo,
    updateCareerInfo,
    addSkill,
    removeSkill,
    newSkill,
    setNewSkill,
    isReprocessing,
    handleReprocess,
    isModalOpen,
    openModal,
    closeModal
  };
};
