// 岗位数据类型定义
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: {
    min: number;
    max: number;
  };
  requiredSkills: string[];
  preferredSkills: string[];
  experience: {
    min: number;
    max: number;
  };
  education: string;
  industry: string;
  description: string;
  responsibilities: string[];
  benefits: string[];
  postedAt: string;
}

// 模拟岗位数据
export const jobs: Job[] = [
  {
    id: "job-001",
    title: "前端开发工程师",
    company: "字节跳动",
    location: "北京",
    salary: { min: 20000, max: 35000 },
    requiredSkills: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    preferredSkills: ["Vue", "Node.js", "Webpack", "Git"],
    experience: { min: 1, max: 3 },
    education: "本科",
    industry: "互联网",
    description: "负责公司核心产品的前端开发工作，参与产品需求分析和技术方案设计。",
    responsibilities: [
      "负责Web前端架构设计和核心代码开发",
      "参与产品需求评审，提供技术可行性分析",
      "优化前端性能，提升用户体验",
      "编写高质量、可维护的代码"
    ],
    benefits: ["六险一金", "免费三餐", "弹性工作", "股票期权"],
    postedAt: "2024-01-15"
  },
  {
    id: "job-002",
    title: "Java后端开发工程师",
    company: "阿里巴巴",
    location: "杭州",
    salary: { min: 25000, max: 40000 },
    requiredSkills: ["Java", "Spring Boot", "MySQL", "Redis", "Linux"],
    preferredSkills: ["Kafka", "Docker", "Kubernetes", "微服务"],
    experience: { min: 2, max: 5 },
    education: "本科",
    industry: "互联网",
    description: "负责电商核心系统的后端开发，支撑双11等大促活动。",
    responsibilities: [
      "设计和开发高并发、高可用系统",
      "参与系统架构设计和技术选型",
      "优化系统性能，解决技术难题",
      "指导初级工程师，进行代码审查"
    ],
    benefits: ["股票期权", "带薪年假", "健身房", "节日福利"],
    postedAt: "2024-01-14"
  },
  {
    id: "job-003",
    title: "产品经理",
    company: "腾讯",
    location: "深圳",
    salary: { min: 20000, max: 30000 },
    requiredSkills: ["产品规划", "需求分析", "原型设计", "数据分析", "用户研究"],
    preferredSkills: ["Axure", "Figma", "SQL", "Python"],
    experience: { min: 1, max: 3 },
    education: "本科",
    industry: "互联网",
    description: "负责社交产品的功能规划和迭代，提升用户活跃度。",
    responsibilities: [
      "负责产品功能规划和需求文档编写",
      "协调设计、开发、测试团队推进项目",
      "分析用户数据，优化产品体验",
      "跟踪竞品动态，制定产品策略"
    ],
    benefits: ["股票期权", "免费班车", "年度体检", "生日福利"],
    postedAt: "2024-01-13"
  },
  {
    id: "job-004",
    title: "数据分析师",
    company: "美团",
    location: "北京",
    salary: { min: 18000, max: 28000 },
    requiredSkills: ["Python", "SQL", "Excel", "数据可视化", "统计分析"],
    preferredSkills: ["R", "Tableau", "机器学习", "大数据"],
    experience: { min: 1, max: 3 },
    education: "本科",
    industry: "互联网",
    description: "负责业务数据分析，为决策提供数据支持。",
    responsibilities: [
      "建立数据分析模型，输出分析报告",
      "设计数据指标体系，监控业务健康度",
      "挖掘数据价值，发现业务增长点",
      "搭建数据可视化看板"
    ],
    benefits: ["弹性工作", "免费午餐", "交通补贴", "节日福利"],
    postedAt: "2024-01-12"
  },
  {
    id: "job-005",
    title: "UI设计师",
    company: "网易",
    location: "杭州",
    salary: { min: 15000, max: 25000 },
    requiredSkills: ["Figma", "Sketch", "Photoshop", "UI设计", "交互设计"],
    preferredSkills: ["After Effects", "3D设计", "动效设计"],
    experience: { min: 1, max: 3 },
    education: "本科",
    industry: "互联网",
    description: "负责游戏产品的UI界面设计，打造极致视觉体验。",
    responsibilities: [
      "负责产品UI界面设计和视觉规范制定",
      "参与产品设计评审，输出设计方案",
      "配合开发团队，跟进设计落地",
      "持续优化产品视觉体验"
    ],
    benefits: ["游戏福利", "免费三餐", "健身房", "带薪年假"],
    postedAt: "2024-01-11"
  },
  {
    id: "job-006",
    title: "算法工程师",
    company: "百度",
    location: "北京",
    salary: { min: 30000, max: 50000 },
    requiredSkills: ["Python", "机器学习", "深度学习", "TensorFlow", "PyTorch"],
    preferredSkills: ["NLP", "计算机视觉", "推荐系统", "大数据"],
    experience: { min: 2, max: 5 },
    education: "硕士",
    industry: "互联网",
    description: "负责搜索推荐算法研发，提升用户搜索体验。",
    responsibilities: [
      "设计和优化推荐算法模型",
      "分析海量数据，挖掘用户兴趣",
      "跟进前沿技术，推动技术创新",
      "撰写技术论文和专利"
    ],
    benefits: ["股票期权", "弹性工作", "学习补贴", "年度旅游"],
    postedAt: "2024-01-10"
  },
  {
    id: "job-007",
    title: "测试工程师",
    company: "京东",
    location: "北京",
    salary: { min: 15000, max: 25000 },
    requiredSkills: ["测试理论", "自动化测试", "Python", "接口测试", "性能测试"],
    preferredSkills: ["Selenium", "JMeter", "Docker", "CI/CD"],
    experience: { min: 1, max: 3 },
    education: "本科",
    industry: "互联网",
    description: "负责电商核心系统的质量保障工作。",
    responsibilities: [
      "制定测试计划，执行功能测试",
      "开发自动化测试脚本",
      "分析测试结果，输出测试报告",
      "推动产品质量持续改进"
    ],
    benefits: ["六险一金", "员工折扣", "节日福利", "带薪年假"],
    postedAt: "2024-01-09"
  },
  {
    id: "job-008",
    title: "运维工程师",
    company: "华为",
    location: "深圳",
    salary: { min: 18000, max: 30000 },
    requiredSkills: ["Linux", "Shell", "Docker", "Kubernetes", "监控"],
    preferredSkills: ["Python", "Ansible", "云服务", "网络安全"],
    experience: { min: 2, max: 5 },
    education: "本科",
    industry: "通信",
    description: "负责云平台基础设施运维，保障系统稳定运行。",
    responsibilities: [
      "负责服务器集群运维管理",
      "设计和优化运维自动化方案",
      "处理系统故障，保障业务连续性",
      "制定安全策略，防范安全风险"
    ],
    benefits: ["股票期权", "员工宿舍", "餐补", "年度体检"],
    postedAt: "2024-01-08"
  },
  {
    id: "job-009",
    title: "市场营销专员",
    company: "小米",
    location: "北京",
    salary: { min: 12000, max: 20000 },
    requiredSkills: ["市场分析", "营销策划", "文案撰写", "活动执行", "数据分析"],
    preferredSkills: ["新媒体运营", "SEO/SEM", "视频制作", "PS"],
    experience: { min: 1, max: 3 },
    education: "本科",
    industry: "消费电子",
    description: "负责品牌营销活动策划和执行，提升品牌影响力。",
    responsibilities: [
      "策划和执行品牌营销活动",
      "管理社交媒体账号，产出优质内容",
      "分析营销数据，优化投放策略",
      "维护媒体关系，拓展合作渠道"
    ],
    benefits: ["员工折扣", "弹性工作", "节日福利", "团建活动"],
    postedAt: "2024-01-07"
  },
  {
    id: "job-010",
    title: "人力资源专员",
    company: "滴滴出行",
    location: "北京",
    salary: { min: 10000, max: 18000 },
    requiredSkills: ["招聘", "员工关系", "HRBP", "绩效管理", "培训"],
    preferredSkills: ["HR系统", "数据分析", "劳动法", "组织发展"],
    experience: { min: 1, max: 3 },
    education: "本科",
    industry: "互联网",
    description: "负责招聘和员工关系管理，支持业务团队发展。",
    responsibilities: [
      "负责招聘渠道管理和候选人筛选",
      "组织员工培训和团建活动",
      "处理员工关系问题，维护良好氛围",
      "协助制定和执行HR政策"
    ],
    benefits: ["打车优惠", "弹性工作", "节日福利", "带薪年假"],
    postedAt: "2024-01-06"
  },
  {
    id: "job-011",
    title: "全栈开发工程师",
    company: "小红书",
    location: "上海",
    salary: { min: 25000, max: 40000 },
    requiredSkills: ["React", "Node.js", "TypeScript", "MongoDB", "MySQL"],
    preferredSkills: ["Next.js", "GraphQL", "Docker", "云服务"],
    experience: { min: 2, max: 5 },
    education: "本科",
    industry: "互联网",
    description: "负责社区核心功能的开发，打造优质用户体验。",
    responsibilities: [
      "负责前后端功能开发和技术选型",
      "优化系统架构，提升性能和稳定性",
      "参与产品需求评审，提供技术方案",
      "指导初级工程师，推动技术分享"
    ],
    benefits: ["免费三餐", "弹性工作", "股票期权", "节日福利"],
    postedAt: "2024-01-05"
  },
  {
    id: "job-012",
    title: "财务分析师",
    company: "蚂蚁集团",
    location: "杭州",
    salary: { min: 18000, max: 28000 },
    requiredSkills: ["财务分析", "Excel", "财务建模", "会计准则", "数据分析"],
    preferredSkills: ["Python", "SQL", "Power BI", "金融证书"],
    experience: { min: 2, max: 5 },
    education: "本科",
    industry: "金融科技",
    description: "负责业务财务分析，支持战略决策。",
    responsibilities: [
      "建立财务分析模型，输出分析报告",
      "参与预算编制和执行监控",
      "分析业务数据，提供决策支持",
      "优化财务流程，提升工作效率"
    ],
    benefits: ["股票期权", "六险一金", "年度体检", "带薪年假"],
    postedAt: "2024-01-04"
  },
  {
    id: "job-013",
    title: "iOS开发工程师",
    company: "快手",
    location: "北京",
    salary: { min: 22000, max: 35000 },
    requiredSkills: ["Swift", "Objective-C", "iOS SDK", "Xcode", "CocoaPods"],
    preferredSkills: ["Flutter", "React Native", "音视频开发", "性能优化"],
    experience: { min: 2, max: 5 },
    education: "本科",
    industry: "互联网",
    description: "负责短视频App的iOS端开发工作。",
    responsibilities: [
      "负责iOS客户端核心功能开发",
      "优化App性能，提升用户体验",
      "参与技术方案设计和代码审查",
      "跟进iOS新技术，推动技术升级"
    ],
    benefits: ["免费三餐", "弹性工作", "股票期权", "节日福利"],
    postedAt: "2024-01-03"
  },
  {
    id: "job-014",
    title: "Android开发工程师",
    company: "OPPO",
    location: "深圳",
    salary: { min: 20000, max: 32000 },
    requiredSkills: ["Kotlin", "Java", "Android SDK", "Android Studio", "Gradle"],
    preferredSkills: ["Flutter", "JNI", "性能优化", "架构设计"],
    experience: { min: 2, max: 5 },
    education: "本科",
    industry: "消费电子",
    description: "负责手机系统应用开发，打造极致用户体验。",
    responsibilities: [
      "负责Android应用开发和维护",
      "优化应用性能和稳定性",
      "参与技术方案评审和代码审查",
      "研究新技术，推动技术演进"
    ],
    benefits: ["员工折扣", "餐补", "节日福利", "带薪年假"],
    postedAt: "2024-01-02"
  },
  {
    id: "job-015",
    title: "网络安全工程师",
    company: "奇安信",
    location: "北京",
    salary: { min: 20000, max: 35000 },
    requiredSkills: ["网络安全", "渗透测试", "安全审计", "Linux", "Python"],
    preferredSkills: ["逆向分析", "应急响应", "安全开发", "CISSP"],
    experience: { min: 2, max: 5 },
    education: "本科",
    industry: "网络安全",
    description: "负责企业安全体系建设，保障业务安全。",
    responsibilities: [
      "进行安全评估和渗透测试",
      "设计和实施安全防护方案",
      "处理安全事件，进行应急响应",
      "制定安全规范，推动安全意识培训"
    ],
    benefits: ["弹性工作", "股票期权", "学习补贴", "节日福利"],
    postedAt: "2024-01-01"
  }
];
