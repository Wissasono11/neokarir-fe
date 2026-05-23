import { useState, useEffect } from 'react';
import { 
  heroData as initialHeroData, 
  radarData as initialRadarData, 
  skillBreakdown as initialSkillBreakdown, 
  recommendedActions as initialRecommendedActions, 
  missingSkillCards as initialMissingSkillCards, 
  learningPath as initialLearningPath 
} from '../data/skillGapMockData';

export const useSkillGap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const toggleCourse = (courseId) => {
    setCompletedCourses((prev) => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId) 
        : [...prev, courseId]
    );
  };

  // Derive dynamic state based on completed courses
  const isDockerCompleted = completedCourses.includes(1);
  const isGolangCompleted = completedCourses.includes(2);

  // Dynamic Overall Readiness
  let dynamicReadiness = initialHeroData.overallReadiness;
  if (isDockerCompleted && isGolangCompleted) {
    dynamicReadiness = 100;
  } else if (isDockerCompleted) {
    dynamicReadiness = 90;
  } else if (isGolangCompleted) {
    dynamicReadiness = 91;
  }

  const dynamicHeroData = {
    ...initialHeroData,
    overallReadiness: dynamicReadiness,
    matchedSkillsCount: initialHeroData.matchedSkillsCount + completedCourses.length,
    missingSkillsCount: Math.max(0, initialHeroData.missingSkillsCount - completedCourses.length),
    readinessLevel: dynamicReadiness === 100 ? "Siap Kerja" : dynamicReadiness >= 90 ? "Sangat Siap" : "Hampir Siap"
  };

  // Dynamic Radar Data
  const dynamicRadarData = initialRadarData.map(item => {
    if (item.subject === 'Docker' && isDockerCompleted) {
      return { ...item, A: 80 };
    }
    if (item.subject === 'Golang' && isGolangCompleted) {
      return { ...item, A: 85 };
    }
    return item;
  });

  // Dynamic Skill Breakdown
  const dynamicSkillBreakdown = initialSkillBreakdown.map(item => {
    if (item.skill === 'Docker' && isDockerCompleted) {
      return { ...item, current: 80, gap: 0 };
    }
    if (item.skill === 'Golang' && isGolangCompleted) {
      return { ...item, current: 85, gap: 0 };
    }
    return item;
  });

  // Dynamic Missing Skills
  const dynamicMissingSkillCards = initialMissingSkillCards.map(item => {
    const isCompleted = (item.skill === 'Docker' && isDockerCompleted) || 
                        (item.skill === 'Golang' && isGolangCompleted);
    return {
      ...item,
      isCompleted
    };
  });

  // Dynamic Recommended Actions
  let dynamicRecommendedActions = [...initialRecommendedActions];
  if (isDockerCompleted && isGolangCompleted) {
    dynamicRecommendedActions = [
      {
        type: "strength",
        title: "Sempurna",
        color: "green",
        description: "Selamat! Semua skill gap kritis telah Anda penuhi. Anda siap melamar posisi Full Stack Developer."
      }
    ];
  } else if (isDockerCompleted) {
    dynamicRecommendedActions = [
      {
        type: "critical",
        title: "Gap Kritis Tersisa",
        color: "red",
        description: "Fokus tingkatkan skill Golang untuk memenuhi standar industri Full Stack Developer."
      },
      {
        type: "strength",
        title: "Docker Terpenuhi",
        color: "green",
        description: "Kerja bagus! Skill Docker Anda kini telah memenuhi standar industri."
      }
    ];
  } else if (isGolangCompleted) {
    dynamicRecommendedActions = [
      {
        type: "critical",
        title: "Gap Kritis Tersisa",
        color: "red",
        description: "Fokus tingkatkan skill Docker untuk memenuhi standar industri Full Stack Developer."
      },
      {
        type: "strength",
        title: "Golang Terpenuhi",
        color: "green",
        description: "Kerja bagus! Skill Golang Anda kini telah memenuhi standar industri."
      }
    ];
  }

  return {
    isLoading,
    heroData: dynamicHeroData,
    radarData: dynamicRadarData,
    skillBreakdown: dynamicSkillBreakdown,
    recommendedActions: dynamicRecommendedActions,
    missingSkillCards: dynamicMissingSkillCards,
    learningPath: initialLearningPath,
    completedCourses,
    toggleCourse
  };
};

