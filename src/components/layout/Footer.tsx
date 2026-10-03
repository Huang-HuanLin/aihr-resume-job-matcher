import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 品牌信息 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">AI求职助手</h3>
            <p className="text-sm leading-relaxed">
              基于AI技术的智能求职辅助工具，帮助学生快速匹配合适岗位，
              提供简历优化建议，提升求职成功率。
            </p>
          </div>

          {/* 功能链接 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">核心功能</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/match" className="hover:text-blue-400 transition-colors">
                  智能岗位匹配
                </a>
              </li>
              <li>
                <a href="/analysis" className="hover:text-blue-400 transition-colors">
                  简历诊断分析
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  优化建议生成
                </a>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">联系我们</h3>
            <ul className="space-y-2 text-sm">
              <li>邮箱：contact@ai-job-matcher.com</li>
              <li>电话：400-123-4567</li>
              <li>地址：北京市海淀区中关村</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © 2024 AI求职助手. All rights reserved.
          </p>
          <p className="text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for job seekers
          </p>
        </div>
      </div>
    </footer>
  );
}
