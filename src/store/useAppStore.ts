import { create } from 'zustand';
import type { Job } from '../data/jobs';
import type { Resume } from '../data/resumes';
import type { MatchResult } from '../utils/matcher';
import { jobs as mockJobs } from '../data/jobs';
import { resumes as mockResumes } from '../data/resumes';
import { matchAllJobs, calculateMatchScore } from '../utils/matcher';

interface AppState {
  // 用户状态
  currentResume: Resume | null;
  setCurrentResume: (resume: Resume | null) => void;

  // 岗位状态
  jobs: Job[];
  filteredJobs: Job[];
  setFilteredJobs: (jobs: Job[]) => void;
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;

  // 匹配结果
  matchResults: (MatchResult & { job: Job })[];
  setMatchResults: (results: (MatchResult & { job: Job })[]) => void;
  currentMatchResult: MatchResult | null;
  setCurrentMatchResult: (result: MatchResult | null) => void;

  // 加载状态
  isMatching: boolean;
  setIsMatching: (loading: boolean) => void;

  // 筛选条件
  filters: {
    industry: string;
    location: string;
    salaryMin: number;
    salaryMax: number;
  };
  setFilters: (filters: Partial<AppState['filters']>) => void;

  // 操作方法
  performMatch: (resume: Resume) => void;
  analyzeResume: (resume: Resume, job: Job) => MatchResult;
  resetFilters: () => void;
}

const defaultFilters = {
  industry: '',
  location: '',
  salaryMin: 0,
  salaryMax: 100000
};

export const useAppStore = create<AppState>((set, get) => ({
  // 初始状态
  currentResume: null,
  jobs: mockJobs,
  filteredJobs: mockJobs,
  selectedJob: null,
  matchResults: [],
  currentMatchResult: null,
  isMatching: false,
  filters: defaultFilters,

  // 设置方法
  setCurrentResume: (resume) => set({ currentResume: resume }),
  setFilteredJobs: (jobs) => set({ filteredJobs: jobs }),
  setSelectedJob: (job) => set({ selectedJob: job }),
  setMatchResults: (results) => set({ matchResults: results }),
  setCurrentMatchResult: (result) => set({ currentMatchResult: result }),
  setIsMatching: (loading) => set({ isMatching: loading }),
  
  setFilters: (newFilters) => {
    const { filters, jobs } = get();
    const updatedFilters = { ...filters, ...newFilters };
    
    // 应用筛选
    let filtered = jobs;
    if (updatedFilters.industry) {
      filtered = filtered.filter(job => job.industry === updatedFilters.industry);
    }
    if (updatedFilters.location) {
      filtered = filtered.filter(job => job.location === updatedFilters.location);
    }
    filtered = filtered.filter(
      job => job.salary.min >= updatedFilters.salaryMin && 
             job.salary.max <= updatedFilters.salaryMax
    );

    set({ filters: updatedFilters, filteredJobs: filtered });
  },

  // 执行匹配
  performMatch: (resume) => {
    set({ isMatching: true, currentResume: resume });
    
    // 模拟异步处理
    setTimeout(() => {
      const results = matchAllJobs(resume, get().jobs);
      set({ matchResults: results, isMatching: false });
    }, 1500);
  },

  // 分析简历
  analyzeResume: (resume, job) => {
    return calculateMatchScore(resume, job);
  },

  // 重置筛选
  resetFilters: () => {
    set({ filters: defaultFilters, filteredJobs: get().jobs });
  }
}));

// 获取所有简历（用于演示选择）
export const getDemoResumes = () => mockResumes;
