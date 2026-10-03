import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  FileSearch, 
  TrendingUp, 
  ArrowRight, 
  Sparkles,
  Users,
  Building2,
  Target
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// 功能卡片数据
const features = [
  {
    icon: Briefcase,
    title: '智能岗位匹配',
    description: '基于AI算法，精准分析您的技能、经验和兴趣，为您推荐最匹配的岗位机会。',
    color: 'from-blue-500 to-blue-600',
    link: '/match'
  },
  {
    icon: FileSearch,
    title: '简历诊断分析',
    description: '深度解析您的简历内容，评估与目标岗位的匹配度，发现提升空间。',
    color: 'from-emerald-500 to-emerald-600',
    link: '/analysis'
  },
  {
    icon: TrendingUp,
    title: '优化建议生成',
    description: '针对简历薄弱环节，提供具体可行的优化建议，提升简历竞争力。',
    color: 'from-orange-500 to-orange-600',
    link: '/analysis'
  }
];

// 统计数据
const stats = [
  { icon: Building2, value: '15+', label: '合作企业' },
  { icon: Briefcase, value: '1000+', label: '热门岗位' },
  { icon: Users, value: '5000+', label: '服务用户' },
  { icon: Target, value: '95%', label: '匹配成功率' }
];

// 动画配置
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* 标签 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI驱动的智能求职助手</span>
              </motion.div>

              {/* 主标题 */}
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                让AI帮您找到
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  理想的工作
                </span>
              </h1>

              {/* 副标题 */}
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                智能匹配岗位、诊断简历问题、生成优化建议，
                <br className="hidden md:block" />
                全方位提升您的求职成功率
              </p>

              {/* CTA按钮 */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/match">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all flex items-center gap-2"
                  >
                    <span>开始匹配</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/analysis">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all"
                  >
                    简历诊断
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 统计数据 */}
        <section className="py-12 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* 功能展示 */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                核心功能
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                三大核心功能，助力您的求职之路
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                    <div className="relative p-8 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:shadow-xl transition-shadow">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <Link
                        to={feature.link}
                        className="inline-flex items-center gap-1 text-blue-600 font-medium hover:gap-2 transition-all"
                      >
                        <span>了解更多</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* 使用流程 */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                如何使用
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                简单三步，开启您的智能求职之旅
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { step: '01', title: '上传简历', desc: '上传您的简历文件，系统将自动解析关键信息' },
                { step: '02', title: '智能匹配', desc: 'AI算法分析您的背景，匹配最合适的岗位' },
                { step: '03', title: '获取建议', desc: '查看匹配结果和优化建议，提升求职成功率' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="text-8xl font-bold text-slate-100 absolute -top-4 left-0">
                    {item.step}
                  </div>
                  <div className="relative pt-12 pl-4">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                准备好开始了吗？
              </h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                立即体验AI求职助手，让您的求职之路更加顺畅
              </p>
              <Link to="/match">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  免费开始
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
