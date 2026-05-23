import { useState } from 'react';
import { Award, BrainCircuit, Sparkles, AlertCircle, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout & UI
import DashboardLayout from '../layouts/DashboardLayout';
import Breadcrumb from '../components/ui/Breadcrumb';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Custom Hooks & Data
import { useCareerRecommendations } from '../features/carrer-recommendation/hooks/useCareerRecommendations';

// Subcomponents
import RecommendationFilter from '../features/carrer-recommendation/components/RecommendationFilter';
import CareerCard from '../features/carrer-recommendation/components/CareerCard';
import JobMatchScoreChart from '../features/carrer-recommendation/components/JobMatchScoreChart';
import RoadmapDrawer from '../features/carrer-recommendation/components/RoadmapDrawer';

const CareerRecommendationPage = () => {
  const {
    isLoading,
    recommendations,
    activeJob,
    setActiveJobId,
    completedCourses,
    toggleCourse,
    searchQuery,
    setSearchQuery,
    selectedDomain,
    setSelectedDomain,
    selectedMatchFilter,
    setSelectedMatchFilter,
    domains,
    overallReadiness,
    user
  } = useCareerRecommendations();

  // Mobile drawer state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const breadcrumbItems = [
    { label: 'Career Recommendation', path: '/dashboard/recommendations', icon: Award }
  ];

  const handleCardClick = (jobId) => {
    setActiveJobId(jobId);
    // Open drawer on mobile view
    if (window.innerWidth < 1024) {
      setIsMobileDrawerOpen(true);
    }
  };

  return (
    <DashboardLayout>
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" label="Menganalisis profil dan merumuskan rekomendasi karir..." />
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Header and Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-title md:text-heading font-extrabold text-slate-800 mb-1 tracking-tight">
                Rekomendasi Karir AI
              </h1>
              <p className="text-caption font-semibold text-slate-500">
                Pekerjaan paling sesuai berdasarkan kecocokan CV, skill gap, dan profil Anda.
              </p>
            </div>

            {/* Overall stats badge - simplified and styled cleanly */}
            <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2.5 rounded-2xl shadow-sm shrink-0">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-caption font-bold uppercase tracking-wider text-slate-400">Rata-rata Kesiapan</div>
                <div className="text-body-sm font-extrabold text-slate-800 leading-tight">
                  <span className="text-indigo-600">{overallReadiness}%</span> Match Rate
                </div>
              </div>
            </div>
          </div>

          {/* AI Advisor insight banner - simplified, soft light design */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100/60 text-slate-700 relative overflow-hidden"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-indigo-100/50 text-indigo-600 rounded-xl shrink-0">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-body-sm font-bold text-indigo-900 mb-1">
                  NeoAI Career Advisor Insight
                </h4>
                <p className="text-caption text-slate-600 font-medium leading-relaxed">
                  Berdasarkan profil onboarding Anda ({user?.education || 'S1/D4'}, {user?.experience || 'Fresh Graduate'}) dengan fokus bidang <strong>{user?.domain || 'Software Development'}</strong>, 
                  pekerjaan teratas kami rekomendasikan di bawah ini. Selesaikan course pada *Roadmap* untuk langsung melengkapi skill gap Anda dan meningkatkan persentase kecocokan kerja!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Filters Bar */}
          <RecommendationFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
            selectedMatchFilter={selectedMatchFilter}
            setSelectedMatchFilter={setSelectedMatchFilter}
            domains={domains}
          />

          {/* Main Content Layout Grid */}
          {recommendations.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-body-sm font-bold text-slate-800">Tidak Ada Rekomendasi</h3>
              <p className="text-caption text-slate-500 max-w-sm mx-auto">
                Kami tidak menemukan karir yang sesuai dengan filter pencarian Anda. Silakan ubah filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Side: Career recommendations cards list (No nested scrollbar, natural scroll) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex justify-between items-center px-1 mb-1">
                  <span className="text-caption font-bold text-slate-400 uppercase tracking-wider">
                    Menampilkan {recommendations.length} Rekomendasi Karir
                  </span>
                </div>
                {recommendations.map(job => (
                  <CareerCard
                    key={job.job_id}
                    job={job}
                    isActive={activeJob && activeJob.job_id === job.job_id}
                    onClick={() => handleCardClick(job.job_id)}
                  />
                ))}
              </div>

              {/* Right Side: Sticky Detail & Roadmap (Desktop only - scrolls with page, no inner scrollbar) */}
              <div className="hidden lg:block lg:col-span-5 space-y-6 sticky top-[88px] pb-6">
                {activeJob ? (
                  <>
                    <JobMatchScoreChart job={activeJob} />
                    <RoadmapDrawer
                      job={activeJob}
                      completedCourses={completedCourses}
                      toggleCourse={toggleCourse}
                    />
                  </>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-100 border-dashed p-10 text-center text-slate-400">
                    <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-caption font-bold">Pilih salah satu rekomendasi karir di samping untuk melihat analisis roadmap detail.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Mobile Overlay/Drawer for Details and Roadmap */}
          <AnimatePresence>
            {isMobileDrawerOpen && activeJob && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="fixed inset-0 bg-slate-900 z-50 lg:hidden"
                />

                {/* Drawer Content */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                  className="fixed inset-x-0 bottom-0 top-[10%] bg-slate-50 rounded-t-[24px] z-50 overflow-y-auto shadow-2xl p-4 lg:hidden flex flex-col gap-4 border-t border-slate-200"
                >
                  {/* Pull Indicator */}
                  <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto shrink-0 mb-1" />

                  {/* Header info in mobile drawer */}
                  <div className="px-2 pt-1 flex justify-between items-start gap-4">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded text-caption font-bold bg-bg-secondary text-primary mb-1">
                        {activeJob.job_domain}
                      </span>
                      <h2 className="text-body font-bold text-slate-800 mt-1">{activeJob.job_title}</h2>
                      <p className="text-caption font-semibold text-slate-400">{activeJob.company}</p>
                    </div>
                    <button
                      onClick={() => setIsMobileDrawerOpen(false)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-caption font-bold text-slate-600 hover:bg-slate-50"
                    >
                      Tutup
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-4 pb-10 scrollbar-hide">
                    <JobMatchScoreChart job={activeJob} />
                    <RoadmapDrawer
                      job={activeJob}
                      completedCourses={completedCourses}
                      toggleCourse={toggleCourse}
                      onClose={() => setIsMobileDrawerOpen(false)}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

        </div>
      )}
    </DashboardLayout>
  );
};

export default CareerRecommendationPage;
