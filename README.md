# Quiz Notebook

一个本地浏览器刷题工具，适合维护自己的选择题题库。

当前版本支持：

- 随机刷题
- 顺序刷题
- 单选题和多选题
- 提交后显示正确答案和解析
- 自动记录错题
- 错题集重新练习
- 手动移出错题
- localStorage 本地保存学习记录
- 一键启动脚本

## 环境要求

Windows 用户可以直接双击 `start-dev.bat` 启动。

如果电脑没有安装 Node.js，脚本会自动下载便携版 Node.js 到项目内的 `.local-node/`，再安装依赖。

如果你想手动用命令行启动，电脑里需要能使用：

```bash
node -v
npm -v
```

## 启动方式

### Windows 一键启动

双击项目根目录的：

```txt
start-dev.bat
```

脚本会自动执行：

1. 进入项目目录。
2. 优先使用系统里的 `npm`。
3. 如果没有 `npm`，自动下载便携版 Node.js。
4. 如果没有 `node_modules`，自动执行 `npm install`。
5. 启动开发服务。
6. 自动打开 `http://localhost:5173`。

### 命令行启动

在项目根目录执行：

```bash
npm install
npm run dev
```

然后打开：

```txt
http://localhost:5173
```

## 构建

```bash
npm run build
```

构建产物会生成到：

```txt
dist/
```

## 项目结构

```txt
src/
├── App.tsx
├── main.tsx
├── components/
│   ├── AnswerResult.tsx
│   ├── Layout.tsx
│   ├── OptionList.tsx
│   ├── QuestionCard.tsx
│   └── StatCard.tsx
├── data/
│   └── sampleQuestions.ts
├── hooks/
│   └── useStudyState.ts
├── pages/
│   ├── HomePage.tsx
│   ├── QuizPage.tsx
│   └── WrongBookPage.tsx
├── services/
│   ├── quizService.ts
│   ├── statsService.ts
│   └── storageService.ts
├── styles/
│   └── global.css
├── types/
│   └── question.ts
└── utils/
    └── answerUtils.ts
```

## 如何扩充题库

题库文件在：

```txt
src/data/sampleQuestions.ts
```

每道题是一个 TypeScript 对象，追加到 `sampleQuestions` 数组里即可。

示例：

```ts
{
  id: "dl-011",
  type: "multiple",
  category: "Transformer",
  tags: ["Self-Attention", "QKV"],
  difficulty: "medium",
  question: "关于 Self-Attention，以下说法哪些是正确的？",
  options: {
    A: "Query、Key、Value 通常由输入线性变换得到",
    B: "Attention 权重来自 Query 和 Key 的相似度",
    C: "Value 用于聚合最终输出",
    D: "Self-Attention 只能处理固定长度序列"
  },
  answer: ["A", "B", "C"],
  explanation: "Self-Attention 通常通过输入生成 Q/K/V，使用 QK 相似度得到注意力权重，再对 V 做加权聚合。D 错在 Self-Attention 本身不限定只能处理固定长度序列，实际长度约束通常来自实现和位置编码。"
}
```

## 题目字段说明

```ts
interface Question {
  id: string;
  type: "single" | "multiple";
  category: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: Partial<Record<"A" | "B" | "C" | "D" | "E" | "F", string>>;
  answer: Array<"A" | "B" | "C" | "D" | "E" | "F">;
  explanation: string;
}
```

关键规则：

- `id` 不能重复。
- `type: "single"` 是单选题。
- `type: "multiple"` 是多选题。
- 单选题的 `answer` 也必须是数组，例如 `["B"]`。
- 多选题的 `answer` 至少包含两个选项，例如 `["A", "C"]`。
- `answer` 里的选项必须存在于 `options`。
- `difficulty` 只能是 `easy`、`medium`、`hard`。
- 选项 key 只支持 `A` 到 `F`。

## 用 GPT 生成新题库

项目内提供了专门的规则文档：

```txt
题库生成规则.md
```

把里面的提示词复制给 GPT，并修改：

- 题库主题
- 题目数量
- 起始 ID
- 单选 / 多选比例
- 难度分布

生成后把题目对象粘贴到 `src/data/sampleQuestions.ts` 的数组中。

## 本地数据说明

答题记录和错题集保存在浏览器 localStorage。

清空方式：

- 在首页点击 `重置学习记录`。
- 或在浏览器开发者工具中清理站点数据。

localStorage key：

```txt
local-quiz-study-state
```

## 注意事项

- 本项目没有后端。
- 本项目没有账号系统。
- 换浏览器或清理浏览器数据后，学习记录不会自动同步。
- `node_modules/`、`dist/`、需求文档等不会提交到 Git。
