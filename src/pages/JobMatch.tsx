import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Search, 
  MapPin, 
  Building2, 
  Clock,
  ChevronRight,
  Loader2,
  FileText,
  CheckCircle2,
  XCircle,
  Filter
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAppStore, getDemoResumes } from '@/store/useAppStore';
import type { Resume } from '@/data/resumes';
import { useNavigate } from 'react-router-dom';

// 匹配度环形进度条组件
function MatchScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  
  const getColor = (s: number) => {
    if (s >= 80) return '#10B981';
    if (s >= 60) return '#3B82F6';
    if (s >= 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-slate-900">{score}%</span>
      </div>
    </div>
  );
}

// 岗位卡片组件
function JobCard({ job, score, onViewDetails }: { 
  job: NonNullable<ReturnType<typeof useAppStore.getState>['matchResults'][0]['job']>; 
  score: number;
  onViewDetails: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onViewDetails}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 mb-1">{job.title}</h3>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              {job.company}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
          </div>
        </div>
        <MatchScoreRing score={score} />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-blue-600">
            {job.salary.min / 1000}K-{job.salary.max / 1000}K
          </span>
          <span className="text-sm text-slate-400">/月</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          <span>{job.experience.min}-{job.experience.max}年经验</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.requiredSkills.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md"
          >
            {skill}
          </span>
        ))}
        {job.requiredSkills.length > 4 && (
          <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-md">
            +{job.requiredSkills.length - 4}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-end text-blue-600 text-sm font-medium">
        <span>查看详情</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
}

export default function JobMatch() {
  const navigate = useNavigate();
  const { 
    matchResults, 
    isMatching, 
    performMatch, 
    setCurrentMatchResult,
    setSelectedJob
  } = useAppStore();
  
  const demoResumes = getDemoResumes();
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleStartMatch = () => {
    if (selectedResume) {
      performMatch(selectedResume);
    }
  };

  const handleViewDetails = (result: typeof matchResults[0]) => {
    setCurrentMatchResult(result);
    setSelectedJob(result.job);
    navigate('/analysis');
  };

  const filteredResults = matchResults.filter(result => 
    result.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">智能岗位匹配</h1>
            <p className="text-slate-600">上传简历，AI为您匹配最合适的岗位</p>
          </div>

          {/* 简历选择区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              选择简历
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {demoResumes.map((resume) => (
                <motion.div
                  key={resume.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedResume(resume)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedResume?.id === resume.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-900">{resume.personalInfo.name}</span>
                    {selectedResume?.id === resume.id && (
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="text-sm text-slate-500 space-y-1">
                    <div>{resume.education[0]?.school} · {resume.education[0]?.major}</div>
                    <div className="flex flex-wrap gap-1">
                      {resume.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartMatch}
                disabled={!selectedResume || isMatching}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isMatching ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>匹配中...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>开始匹配</span>
                  </>
                )}
              </motion.button>
              
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Upload className="w-4 h-4" />
                <span>或上传您的简历文件（PDF/Word）</span>
              </div>
            </div>
          </motion.div>

          {/* 匹配结果 */}
          <AnimatePresence mode="wait">
            {matchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* 搜索和筛选 */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="搜索岗位或公司..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-3 border rounded-lg flex items-center gap-2 transition-colors ${
                      showFilters ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <Filter className="w-5 h-5" />
                    <span>筛选</span>
                  </button>
                </div>

                {/* 结果统计 */}
                <div className="mb-4 text-sm text-slate-500">
                  共找到 <span className="font-semibold text-slate-900">{filteredResults.length}</span> 个匹配岗位
                </div>

                {/* 岗位列表 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredResults.map((result, index) => (
                    <JobCard
                      key={result.job.id}
                      job={result.job}
                      score={result.overallScore}
                      onViewDetails={() => handleViewDetails(result)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 空状态 */}
          {matchResults.length === 0 && !isMatching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">选择简历开始匹配</h3>
              <p className="text-slate-500">AI将为您找到最匹配的岗位机会</p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
