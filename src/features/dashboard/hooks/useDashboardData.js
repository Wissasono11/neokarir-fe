import { useAuth } from '../../../contexts/AuthContext';
import { useAIProfiling } from '../../ai-profiling/hooks/useAIProfiling';
import { useCareerRecommendations } from '../../carrer-recommendation/hooks/useCareerRecommendations';
import { BookOpen, TrendingUp, CheckCircle2 } from 'lucide-react';

export const useDashboardData = () => {
  const { user } = useAuth();
  const { results } = useAIProfiling(); 
  const { recommendations, overallReadiness, completedCourses } = useCareerRecommendations();

  const topRecommendations = recommendations.slice(0, 3).map(rec => ({
    id: rec.job_id,
    title: rec.job_title,
    company: rec.company,
    matchScore: rec.matchScore,
    icon: rec.logo,
    requiredSkills: rec.required_skills
  }));

  const userTargetRole = user?.role || 'Frontend Engineer';
  const matchedJob = recommendations.find(
    rec => rec.job_title.toLowerCase() === userTargetRole.toLowerCase()
  ) || recommendations.find(
    rec => rec.job_title.toLowerCase().includes(userTargetRole.toLowerCase())
  ) || recommendations[0];
  
  const compatibilityScore = matchedJob ? matchedJob.matchScore : 75;

  const dynamicTips = matchedJob?.courses.slice(0, 3).map((course, index) => {
    const isCompleted = completedCourses.includes(course.id);
    const iconsMap = [BookOpen, TrendingUp, CheckCircle2];
    return {
      id: course.id,
      icon: iconsMap[index % 3],
      text: `Ikuti kelas "${course.judul}" di ${course.platform} untuk menguasai ${course.skill}.`,
      action: isCompleted ? 'Pelajari Lagi' : 'Mulai Belajar',
      category: 'skill',
      completed: isCompleted,
    };
  }) || [];

  return {
    user,
    results,
    overallReadiness,
    topRecommendations,
    compatibilityScore,
    dynamicTips
  };
};
