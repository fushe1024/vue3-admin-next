import { defineConfig } from 'cz-git'

export default defineConfig({
  // 继承 Conventional Commits 规范
  // Extend default conventional commit rules
  extends: ['@commitlint/config-conventional'],

  // 若要自定义 commitlint 校验规则，可在此添加
  rules: {
    // @see https://commitlint.js.org/#/reference-rules
  },

  prompt: {
    // 提交别名（fd → docs: fix typos）
    // Quick alias for commit type
    alias: { fd: 'docs: fix typos' },

    // 提示文案
    messages: {
      type: "Select the type of change you're committing:\n选择提交类型:",
      scope: 'Denote the SCOPE of this change (optional):\n选择影响范围（可选）:',
      customScope: 'Input custom SCOPE:\n输入自定义范围:',
      subject: 'Write a brief description:\n填写简短描述:\n',
      body: 'Longer description (optional), use "|" to break line:\n详细描述（可选）:"|" 换行:\n',
      breaking: 'List BREAKING CHANGES (optional):\n列出破坏性变更（可选）:\n',
      footerPrefixSelect: 'Select ISSUES prefix:\n选择问题前缀:',
      customFooterPrefix: 'Input ISSUES prefix:\n输入自定义前缀:',
      footer: 'List related ISSUES, e.g. #12:\n列出关联问题:\n',
      generatingByAI: 'Generating commit message by AI...\nAI 正在生成描述...',
      generatedSelectByAI: 'Select an AI-generated subject:\n选择 AI 生成的标题:',
      confirmCommit: 'Confirm commit?\n确认提交?'
    },

    // 提交类型（已加入 emoji 但默认关闭）
    types: [
      { value: 'feat', name: 'feat:     新功能 / A new feature', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:      修复 Bug / A bug fix', emoji: ':bug:' },
      { value: 'docs', name: 'docs:     文档更新 / Docs only changes', emoji: ':memo:' },
      { value: 'style', name: 'style:    代码格式调整 / Code style changes', emoji: ':lipstick:' },
      { value: 'refactor', name: 'refactor: 代码重构 / Code refactor', emoji: ':recycle:' },
      { value: 'perf', name: 'perf:     性能优化 / Improve performance', emoji: ':zap:' },
      {
        value: 'test',
        name: 'test:     测试新增或修改 / Add or update tests',
        emoji: ':white_check_mark:'
      },
      { value: 'build', name: 'build:    构建系统或依赖变更 / Build updates', emoji: ':package:' },
      { value: 'ci', name: 'ci:       CI 配置更新 / CI config changes', emoji: ':ferris_wheel:' },
      { value: 'chore', name: 'chore:    其他杂项 / Other changes', emoji: ':hammer:' },
      { value: 'revert', name: 'revert:   回退提交 / Revert commit', emoji: ':rewind:' }
    ],

    // 是否启用 emoji（默认关闭）
    useEmoji: false,

    // 允许自定义 scope / issue prefix
    allowCustomScopes: true,
    allowEmptyScopes: true,
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,

    // 常用配置保留，但移除几乎不会用到的项
    breaklineNumber: 100,
    breaklineChar: '|',

    // Issue 关联前缀
    issuePrefixes: [{ value: 'closed', name: 'closed: Issue 已处理 / Issue processed' }]
  }
})
