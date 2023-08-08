module.exports = {
	types: [
		{ value: 'feature', name: 'feature:  增加新功能' },
		{ value: 'bug', name: 'bug:      测试反馈bug列表中的bug号' },
		{ value: 'fix', name: 'fix:      修复bug' },
		{ value: 'ui', name: 'ui:       更新UI' },
		{ value: 'docs', name: 'docs:     文档变更' },
		{ value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
		{ value: 'perf', name: 'perf:     性能优化' },
		{
			value: 'refactor',
			name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
		},
		{ value: 'release', name: 'release:  发布' },
		{ value: 'deploy', name: 'deploy:   部署' },
		{ value: 'test', name: 'test:     增加测试' },
		{
			value: 'chore',
			name: 'chore:    构建过程或辅助工具的变动(更改配置文件)'
		},
		{ value: 'revert', name: 'revert:   回退' },
		{ value: 'build', name: 'build:    打包' }
	],

	scopes: [
		['components', '组件相关'],
		['hooks', 'hook 相关'],
		['utils', 'utils 相关'],
		['element-ui', '对 element-ui 的调整'],
		['styles', '样式相关'],
		['deps', '项目依赖'],
		['auth', '对 auth 修改'],
		['other', '其他修改'],
		// 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
		['custom', '以上都不是？我要自定义']
	].map(([value]) => {
		return {
			name: value
		}
	}),

	messages: {
		type: '请选择提交类型:',
		scope: '\n选择一个 scope(可选）:',
		customScope: '请输入自定义的 scope:',
		subject: '请简要描述提交 message (必填):',
		body: '请输入详细描述(可选):',
		footer: '请输入要关闭的issue(可选):',
		confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
	},
	allowCustomScopes: true,
	skipQuestions: ['body', 'footer'],
	subjectLimit: 72
}
