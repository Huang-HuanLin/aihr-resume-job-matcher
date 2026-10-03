// 简历数据类型定义
export interface Resume {
  id: string;
  personalInfo: {
    name: string;
    phone: string;
    email: string;
    location: string;
  };
  education: {
    school: string;
    degree: string;
    major: string;
    graduationYear: number;
  }[];
  experience: {
    company: string;
    position: string;
    duration: string;
    responsibilities: string[];
  }[];
  skills: string[];
  projects: {
    name: string;
    role: string;
    description: string;
    technologies: string[];
  }[];
  certifications: string[];
}

// 模拟简历数据
export const resumes: Resume[] = [
  {
    id: "resume-001",
    personalInfo: {
      name: "张明",
      phone: "138****1234",
      email: "zhangming@example.com",
      location: "北京"
    },
    education: [
      {
        school: "北京大学",
        degree: "本科",
        major: "计算机科学与技术",
        graduationYear: 2022
      }
    ],
    experience: [
      {
        company: "某互联网公司",
        position: "前端开发实习生",
        duration: "2021.06 - 2021.09",
        responsibilities: [
          "负责公司官网的前端开发工作",
          "使用React框架开发后台管理系统",
          "参与前端性能优化，提升页面加载速度"
        ]
      }
    ],
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Git", "Webpack"],
    projects: [
      {
        name: "电商后台管理系统",
        role: "前端开发",
        description: "使用React + TypeScript开发的后台管理系统，包含用户管理、订单管理、商品管理等功能模块",
        technologies: ["React", "TypeScript", "Ant Design", "Redux"]
      },
      {
        name: "个人博客网站",
        role: "全栈开发",
        description: "使用Next.js开发的个人博客网站，支持Markdown编辑和SEO优化",
        technologies: ["Next.js", "Tailwind CSS", "MongoDB"]
      }
    ],
    certifications: ["英语六级", "计算机二级"]
  },
  {
    id: "resume-002",
    personalInfo: {
      name: "李华",
      phone: "139****5678",
      email: "lihua@example.com",
      location: "上海"
    },
    education: [
      {
        school: "清华大学",
        degree: "硕士",
        major: "软件工程",
        graduationYear: 2023
      }
    ],
    experience: [
      {
        company: "某科技公司",
        position: "Java开发实习生",
        duration: "2022.06 - 2022.12",
        responsibilities: [
          "参与公司核心业务系统的后端开发",
          "使用Spring Boot框架开发RESTful API",
          "负责数据库设计和SQL优化"
        ]
      }
    ],
    skills: ["Java", "Spring Boot", "MySQL", "Redis", "Linux", "Docker", "Git"],
    projects: [
      {
        name: "在线教育平台",
        role: "后端开发",
        description: "使用Spring Boot开发的在线教育平台，支持课程管理、用户学习、支付等功能",
        technologies: ["Spring Boot", "MyBatis", "MySQL", "Redis"]
      }
    ],
    certifications: ["英语六级", "Oracle认证Java程序员"]
  },
  {
    id: "resume-003",
    personalInfo: {
      name: "王芳",
      phone: "137****9012",
      email: "wangfang@example.com",
      location: "深圳"
    },
    education: [
      {
        school: "浙江大学",
        degree: "本科",
        major: "信息管理与信息系统",
        graduationYear: 2022
      }
    ],
    experience: [
      {
        company: "某电商公司",
        position: "产品运营实习生",
        duration: "2021.07 - 2022.03",
        responsibilities: [
          "负责产品活动的策划和执行",
          "分析用户数据，优化产品功能",
          "协调设计和开发团队推进项目"
        ]
      }
    ],
    skills: ["数据分析", "Excel", "SQL", "Python", "产品规划", "用户研究"],
    projects: [
      {
        name: "用户增长项目",
        role: "项目负责人",
        description: "通过数据分析发现用户增长瓶颈，制定增长策略，实现月活用户增长30%",
        technologies: ["Python", "SQL", "Excel"]
      }
    ],
    certifications: ["英语六级", "数据分析师证书"]
  },
  {
    id: "resume-004",
    personalInfo: {
      name: "赵强",
      phone: "136****3456",
      email: "zhaoqiang@example.com",
      location: "杭州"
    },
    education: [
      {
        school: "复旦大学",
        degree: "硕士",
        major: "计算机科学与技术",
        graduationYear: 2023
      }
    ],
    experience: [
      {
        company: "某AI实验室",
        position: "算法研究实习生",
        duration: "2022.03 - 2022.09",
        responsibilities: [
          "参与自然语言处理相关算法研究",
          "使用PyTorch训练深度学习模型",
          "撰写技术论文和专利"
        ]
      }
    ],
    skills: ["Python", "机器学习", "深度学习", "PyTorch", "TensorFlow", "NLP", "数据分析"],
    projects: [
      {
        name: "智能问答系统",
        role: "算法开发",
        description: "基于BERT模型开发的智能问答系统，在测试集上达到85%的准确率",
        technologies: ["Python", "PyTorch", "BERT", "Flask"]
      }
    ],
    certifications: ["英语六级", "深度学习工程师认证"]
  },
  {
    id: "resume-005",
    personalInfo: {
      name: "陈静",
      phone: "135****7890",
      email: "chenjing@example.com",
      location: "广州"
    },
    education: [
      {
        school: "中山大学",
        degree: "本科",
        major: "视觉传达设计",
        graduationYear: 2022
      }
    ],
    experience: [
      {
        company: "某设计公司",
        position: "UI设计实习生",
        duration: "2021.06 - 2022.01",
        responsibilities: [
          "负责移动端App的UI界面设计",
          "参与产品交互设计评审",
          "输出设计规范和组件库"
        ]
      }
    ],
    skills: ["Figma", "Sketch", "Photoshop", "Illustrator", "UI设计", "交互设计"],
    projects: [
      {
        name: "金融App设计",
        role: "主设计师",
        description: "负责某银行App的UI设计，包含首页、理财、转账等核心模块",
        technologies: ["Figma", "Sketch", "Principle"]
      }
    ],
    certifications: ["英语四级"]
  }
];
