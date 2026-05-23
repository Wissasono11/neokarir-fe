export const useSkillGapRecommendations = (targetJob) => {
  if (!targetJob) {
    return {
      recommendedActions: [],
      missingSkillCards: [],
      learningPath: []
    };
  }

  // 1. Calculate recommended actions
  const recommendedActions = [];
  if (targetJob.missingSkills.length > 0) {
    recommendedActions.push({
      type: "critical",
      title: "Gap Kritis",
      color: "red",
      description: `Fokus tingkatkan skill: ${targetJob.missingSkills.join(', ')} untuk memenuhi kriteria peran ${targetJob.job_title}.`
    });
  }
  if (targetJob.matchedSkills.length > 0) {
    recommendedActions.push({
      type: "strength",
      title: "Keunggulan",
      color: "green",
      description: `Skill Anda di bidang: ${targetJob.matchedSkills.join(', ')} sudah sesuai kriteria industri.`
    });
  }

  // 2. Calculate missing skills breakdown cards
  const missingSkillCards = targetJob.missingSkills.map(skill => {
    const course = targetJob.courses.find(c => c.skill === skill);
    return {
      skill,
      gap: 35,
      priority: course?.prioritas || 'Medium',
      description: course?.deskripsi || 'Kemampuan relevan untuk perancangan dan implementasi backend/frontend.',
      alasan: `Dibutuhkan untuk menutupi skill gap peran ${targetJob.job_title}.`,
      relatedSkills: targetJob.required_skills.filter(s => s !== skill).slice(0, 2),
      waktuBelajar: course?.durasi ? `${course.durasi} Belajar` : "4 - 6 Minggu"
    };
  });

  // 3. Calculate learning path timeline courses
  const learningPath = targetJob.courses.map(course => ({
    id: course.id,
    skill: course.skill,
    judul: course.judul,
    platform: course.platform,
    link: course.link,
    durasi: course.durasi,
    prioritas: course.prioritas,
    deskripsi: course.deskripsi
  }));

  return {
    recommendedActions,
    missingSkillCards,
    learningPath
  };
};
