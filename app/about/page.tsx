'use client'

import { motion } from 'framer-motion'
import { User, Mail, Github, Twitter, BookOpen } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { label: '文章发布', value: '50+', icon: BookOpen },
    { label: '读者订阅', value: '1K+', icon: User },
    { label: '累计阅读', value: '10K+', icon: BookOpen },
  ]

  const skills = [
    { name: '个人理财', level: 90 },
    { name: '投资策略', level: 85 },
    { name: '风险管理', level: 80 },
    { name: '资产配置', level: 75 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            关于我
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl"
          >
            分享我的财富管理之旅，帮助更多人实现财务自由
          </motion.p>
        </div>
      </div>

      {/* 主要内容 */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 个人信息 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 个人介绍 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
            >
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={40} className="text-primary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">WealthEase</h2>
                  <p className="text-primary-600 font-medium mb-4">财富管理爱好者 & 博主</p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    你好！我是WealthEase，一名专注于财富管理和个人理财的爱好者。
                    通过多年的学习和实践，我积累了丰富的投资理财经验，并希望通过这个博客
                    与大家分享我的知识和见解。
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    我相信每个人都应该掌握基本的理财知识，建立健康的财务习惯，
                    最终实现财务自由。在这里，我会分享从基础理财到高级投资策略的各种内容，
                    帮助你在财富管理的道路上少走弯路。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 专业技能 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">专业技能</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="bg-primary-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 联系方式 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">联系我</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-gray-500" />
                  <span className="text-gray-700">contact@wealthease.top</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Github size={20} className="text-gray-500" />
                  <span className="text-gray-700">github.com/wealthease</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Twitter size={20} className="text-gray-500" />
                  <span className="text-gray-700">@WealthEaseBlog</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-8">
            {/* 统计数据 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">博客数据</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <stat.icon size={20} className="text-primary-500" />
                      <span className="text-gray-600">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 博客使命 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-4">博客使命</h3>
              <p className="text-primary-100 text-sm leading-relaxed">
                通过分享实用的财富管理知识，
                帮助每个人建立健康的财务观念，
                实现个人和家庭的财务自由。
              </p>
            </motion.div>

            {/* 最新文章 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">最新文章</h3>
              <div className="space-y-3">
                {[
                  '如何开始个人理财规划',
                  '投资组合多样化策略',
                  '被动收入的重要性',
                  '理解复利的力量'
                ].map((title, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-gray-600 hover:text-primary-500 transition-colors text-sm"
                  >
                    {title}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}