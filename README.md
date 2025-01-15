# YMCA - AI 模型对比工具

YMCA 是一个基于 React 和 Ollama 的 AI 模型对比工具，允许用户同时与两个不同的 AI 模型进行对话，直观地比较它们的响应差异。

## 功能特点

- 双模型并行对话：同时与两个不同的 AI 模型进行对话
- 实时响应：即时查看两个模型的回复差异
- 美观的用户界面：现代化的深色主题设计
- 可自定义 API 地址：支持连接到自定义的 Ollama 服务器
- 灵活的模型选择：可随时切换对话模型

## 安装要求

- Node.js 16.0 或更高版本
- Ollama 服务（需要预先安装）
- 将ollama模型拉取至本地

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

## 使用说明

1. 确保 Ollama 服务正在运行（默认地址：http://localhost:11434）

2. 安装所需的模型：
```bash
ollama pull llamatrump-v1
ollama pull llama3.1
```

3. 启动应用后，可以：
   - 在左右两侧分别选择不同的模型
   - 在底部输入框中输入问题
   - 同时查看两个模型的回复
   - 使用清除按钮重置对话历史

## 技术栈

- React
- TypeScript
- Tailwind CSS
- Ollama API

## 注意事项

- 确保 Ollama 服务正常运行
- 确保所需模型已经安装
- 网络连接正常且稳定 