import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Target, 
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Download,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  Briefcase,
  MapPin
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAppStore, getDemoResumes } from '@/store/useAppStore';
import type { Resume } from '@/data/resumes';
import type { Job } from '@/data/jobs';
import type { MatchResult, Suggestion } from '@/utils/matcher';

// 匹配度环形进度条组件
function ScoreRing({ score, size = 120, label }: { score: number; size?: number; label: string }) {
  const radius = (size - 12) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  
  const getColor = (s: number) => {
    if (s >= 80) return { stroke: '#10B981', bg: 'bg-emerald-50', text: 'text-emerald-600' };
    if (s >= 60) return { stroke: '#3B82F6', bg: 'bg-blue-50', text: 'text-blue-600' };
    if (s >= 40) return { stroke: '#F59E0B', bg: 'bg-orange-50', text: 'text-orange-600' };
    return { stroke: '#EF4444', bg: 'bg-red-50', text: 'text-red-600' };
  };

  const colors = getColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.stroke}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${colors.text}`}>{score}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-slate-600">{label}</span>
    </div>
  );
}

// 建议卡片组件
function SuggestionCard({ suggestion, index }: { suggestion: Suggestion; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-600 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'skill': return <Target className="w-5 h-5" />;
      case 'experience': return <Briefcase className="w-5 h-5" />;
      case 'education': return <BookOpen className="w-5 h-5" />;
      case 'project': return <Award className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '高优先级';
      case 'medium': return '中优先级';
      case 'low': return '建议';
      default: return '建议';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden"
    >
      <div
        className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-lg ${getPriorityColor(suggestion.priority)}`}>
            {getTypeIcon(suggestion.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getPriorityColor(suggestion.priority)}`}>
                {getPriorityLabel(suggestion.priority)}
              </span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">{suggestion.content}</p>
          </div>
          <div className="text-slate-400">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResumeAnalysis() {
  const { 
    currentResume, 
    selectedJob,
    currentMatchResult,
    setCurrentResume,
    setSelectedJob,
    analyzeResume,
    jobs
  } = useAppStore();
  
  const demoResumes = getDemoResumes();
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  // 当简历或岗位变化时，重新计算匹配结果
  useEffect(() => {
    if (currentResume && selectedJob) {
      const result = analyzeResume(currentResume, selectedJob);
      setMatchResult(result);
    } else if (currentMatchResult) {
      setMatchResult(currentMatchResult);
    }
  }, [currentResume, selectedJob, currentMatchResult, analyzeResume]);

  // 雷达图数据
  const radarData = matchResult ? [
    { subject: '技能匹配', value: matchResult.dimensionScores.skills, fullMark: 100 },
    { subject: '经验匹配', value: matchResult.dimensionScores.experience, fullMark: 100 },
    { subject: '学历匹配', value: matchResult.dimensionScores.education, fullMark: 100 },
    { subject: '地点匹配', value: matchResult.dimensionScores.location, fullMark: 100 }
  ] : [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">简历诊断分析</h1>
            <p className="text-slate-600">深度分析简历与岗位的匹配度，获取专业优化建议</p>
          </div>

          {/* 选择区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* 简历选择 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                选择简历
              </h2>
              <div className="space-y-3">
                {demoResumes.map((resume) => (
                  <div
                    key={resume.id}
                    onClick={() => setCurrentResume(resume)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      currentResume?.id === resume.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-slate-900">{resume.personalInfo.name}</span>
                        <div className="text-sm text-slate-500 mt-1">
                          {resume.education[0]?.school} · {resume.education[0]?.major}
                        </div>
                      </div>
                      {currentResume?.id === resume.id && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 岗位选择 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                选择目标岗位
              </h2>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {jobs.slice(0, 8).map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedJob?.id === job.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-slate-900">{job.title}</span>
                        <div className="text-sm text-slate-500 mt-1 flex items-center gap-3">
                          <span>{job.company}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      {selectedJob?.id === job.id && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 分析结果 */}
          {matchResult && currentResume && selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* 匹配度概览 */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  匹配度分析
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 总体匹配度 */}
                  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl">
                    <ScoreRing 
                      score={matchResult.overallScore} 
                      size={140} 
                      label="总体匹配度" 
                    />
                    <div className="mt-4 text-center">
                      <p className="text-sm text-slate-500">
                        {matchResult.overallScore >= 80 
                          ? '您的简历与该岗位高度匹配！'
                          : matchResult.overallScore >= 60
                          ? '您的简历与该岗位较为匹配，有优化空间。'
                          : '建议根据优化建议完善简历。'}
                      </p>
                    </div>
                  </div>

                  {/* 雷达图 */}
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#E2E8F0" />
                        <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ fill: '#64748B', fontSize: 12 }}
                        />
                        <PolarRadiusAxis 
                          angle={90} 
                          domain={[0, 100]} 
                          tick={{ fill: '#94A3B8', fontSize: 10 }}
                        />
                        <Radar
                          name="匹配度"
                          dataKey="value"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.3}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 各维度分数 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {Object.entries(matchResult.dimensionScores).map(([key, value]) => {
                    const labels: Record<string, string> = {
                      skills: '技能匹配',
                      experience: '经验匹配',
                      education: '学历匹配',
                      location: '地点匹配'
                    };
                    return (
                      <div key={key} className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-slate-900 mb-1">{value}%</div>
                        <div className="text-sm text-slate-500">{labels[key]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 技能匹配详情 */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  技能匹配详情
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 已匹配技能 */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      已具备技能 ({matchResult.matchedSkills.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.matchedSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm rounded-lg border border-emerald-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 缺失技能 */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      待提升技能 ({matchResult.missingSkills.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.missingSkills.length > 0 ? (
                        matchResult.missingSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">无缺失技能</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 优化建议 */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    优化建议
                  </h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>导出报告</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {matchResult.suggestions.map((suggestion, index) => (
                    <SuggestionCard key={index} suggestion={suggestion} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* 空状态 */}
          {(!currentResume || !selectedJob) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">请选择简历和目标岗位</h3>
              <p className="text-slate-500">选择后将自动进行匹配度分析</p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
