import type { Job } from '../data/jobs';
import type { Resume } from '../data/resumes';

// 匹配结果类型
export interface MatchResult {
  jobId: string;
  resumeId: string;
  overallScore: number;
  dimensionScores: {
    skills: number;
    experience: number;
    education: number;
    location: number;
  };
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: Suggestion[];
}

// 优化建议类型
export interface Suggestion {
  type: 'skill' | 'experience' | 'education' | 'project' | 'general';
  priority: 'high' | 'medium' | 'low';
  content: string;
}

// 学历等级映射
const educationLevels: Record<string, number> = {
  '专科': 1,
  '本科': 2,
  '硕士': 3,
  '博士': 4
};

// 计算技能匹配度
function calculateSkillMatch(
  resumeSkills: string[],
  requiredSkills: string[],
  preferredSkills: string[]
): { score: number; matched: string[]; missing: string[] } {
  const normalizedResumeSkills = resumeSkills.map(s => s.toLowerCase());
  
  // 匹配必备技能
  const matchedRequired: string[] = [];
  const missingRequired: string[] = [];
  
  requiredSkills.forEach(skill => {
    const normalizedSkill = skill.toLowerCase();
    const isMatched = normalizedResumeSkills.some(rs => 
      rs.includes(normalizedSkill) || normalizedSkill.includes(rs)
    );
    if (isMatched) {
      matchedRequired.push(skill);
    } else {
      missingRequired.push(skill);
    }
  });

  // 匹配加分技能
  const matchedPreferred = preferredSkills.filter(skill => {
    const normalizedSkill = skill.toLowerCase();
    return normalizedResumeSkills.some(rs => 
      rs.includes(normalizedSkill) || normalizedSkill.includes(rs)
    );
  });

  // 计算分数：必备技能占70%，加分技能占30%
  const requiredScore = requiredSkills.length > 0 
    ? (matchedRequired.length / requiredSkills.length) * 0.7 
    : 0.7;
  const preferredScore = preferredSkills.length > 0 
    ? (matchedPreferred.length / preferredSkills.length) * 0.3 
    : 0;
  
  const score = Math.min(requiredScore + preferredScore, 1);
  
  return {
    score,
    matched: [...matchedRequired, ...matchedPreferred],
    missing: missingRequired
  };
}

// 计算经验匹配度
function calculateExperienceMatch(
  resumeExperience: Resume['experience'],
  jobExperience: Job['experience']
): number {
  // 计算简历总工作年限
  const totalYears = resumeExperience.reduce((acc, exp) => {
    const duration = exp.duration;
    const yearMatch = duration.match(/(\d+)\s*年/);
    const monthMatch = duration.match(/(\d+)\s*个?月/);
    
    let years = 0;
    if (yearMatch) {
      years += parseInt(yearMatch[1]);
    }
    if (monthMatch) {
      years += parseInt(monthMatch[1]) / 12;
    }
    
    return acc + years;
  }, 0);

  const { min, max } = jobExperience;
  
  // 完全匹配
  if (totalYears >= min && totalYears <= max) {
    return 1;
  }
  // 超出要求
  if (totalYears > max) {
    return 0.9;
  }
  // 略低于要求
  if (totalYears >= min * 0.7) {
    return 0.7;
  }
  // 明显不足
  return Math.max(totalYears / min, 0.3);
}

// 计算学历匹配度
function calculateEducationMatch(
  resumeEducation: Resume['education'],
  jobEducation: string
): number {
  const resumeLevel = Math.max(
    ...resumeEducation.map(e => educationLevels[e.degree] || 0)
  );
  const jobLevel = educationLevels[jobEducation] || 0;
  
  if (resumeLevel >= jobLevel) {
    return 1;
  }
  if (resumeLevel === jobLevel - 1) {
    return 0.7;
  }
  return 0.4;
}

// 计算地点匹配度
function calculateLocationMatch(
  resumeLocation: string,
  jobLocation: string
): number {
  if (resumeLocation === jobLocation) {
    return 1;
  }
  // 同城不同区
  if (resumeLocation.includes(jobLocation) || jobLocation.includes(resumeLocation)) {
    return 0.9;
  }
  // 一线城市之间
  const tier1Cities = ['北京', '上海', '广州', '深圳'];
  if (tier1Cities.includes(resumeLocation) && tier1Cities.includes(jobLocation)) {
    return 0.7;
  }
  return 0.5;
}

// 生成优化建议
function generateSuggestions(
  resume: Resume,
  job: Job,
  skillMatch: { matched: string[]; missing: string[] },
  expScore: number,
  eduScore: number
): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // 技能建议
  if (skillMatch.missing.length > 0) {
    suggestions.push({
      type: 'skill',
      priority: 'high',
      content: `建议学习岗位要求的技能：${skillMatch.missing.join('、')}，这些是岗位的核心要求。`
    });
  }

  // 经验建议
  if (expScore < 0.8) {
    suggestions.push({
      type: 'experience',
      priority: 'medium',
      content: '建议补充相关项目经验，详细描述项目职责和成果，突出解决问题的能力。'
    });
  }

  // 学历建议
  if (eduScore < 1) {
    suggestions.push({
      type: 'education',
      priority: 'low',
      content: '学历要求略低于岗位要求，建议通过项目经验和技能证书来弥补。'
    });
  }

  // 项目建议
  if (resume.projects.length < 2) {
    suggestions.push({
      type: 'project',
      priority: 'medium',
      content: '建议补充更多项目经历，展示技术能力和解决问题的能力。'
    });
  }

  // 通用建议
  suggestions.push({
    type: 'general',
    priority: 'low',
    content: '建议使用量化数据展示项目成果，如"提升性能30%"、"节省成本20%"等。'
  });

  return suggestions;
}

// 主匹配函数
export function calculateMatchScore(resume: Resume, job: Job): MatchResult {
  // 权重配置
  const weights = {
    skills: 0.4,
    experience: 0.3,
    education: 0.2,
    location: 0.1
  };

  // 计算各维度匹配度
  const skillResult = calculateSkillMatch(
    resume.skills,
    job.requiredSkills,
    job.preferredSkills
  );
  const expScore = calculateExperienceMatch(resume.experience, job.experience);
  const eduScore = calculateEducationMatch(resume.education, job.education);
  const locScore = calculateLocationMatch(resume.personalInfo.location, job.location);

  // 计算总分
  const overallScore = Math.round(
    (skillResult.score * weights.skills +
    expScore * weights.experience +
    eduScore * weights.education +
    locScore * weights.location) * 100
  );

  // 生成建议
  const suggestions = generateSuggestions(
    resume,
    job,
    skillResult,
    expScore,
    eduScore
  );

  return {
    jobId: job.id,
    resumeId: resume.id,
    overallScore,
    dimensionScores: {
      skills: Math.round(skillResult.score * 100),
      experience: Math.round(expScore * 100),
      education: Math.round(eduScore * 100),
      location: Math.round(locScore * 100)
    },
    matchedSkills: skillResult.matched,
    missingSkills: skillResult.missing,
    suggestions
  };
}

// 批量匹配
export function matchAllJobs(
  resume: Resume,
  jobs: Job[]
): (MatchResult & { job: Job })[] {
  return jobs
    .map(job => ({
      ...calculateMatchScore(resume, job),
      job
    }))
    .sort((a, b) => b.overallScore - a.overallScore);
}
