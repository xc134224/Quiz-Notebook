import type { Question } from "../types/question";

export const sampleQuestions: Question[] = [
  {
    id: "dl-001",
    type: "single",
    category: "神经网络基础",
    tags: ["反向传播", "梯度"],
    difficulty: "easy",
    question: "在神经网络训练中，反向传播算法的主要作用是什么？",
    options: {
      A: "增加训练数据数量",
      B: "计算损失函数相对于参数的梯度",
      C: "随机初始化模型权重",
      D: "对输入图片进行归一化"
    },
    answer: ["B"],
    explanation: "反向传播的核心作用是利用链式法则，从输出层向前逐层计算损失函数对各层参数的梯度，从而为优化器更新参数提供依据。"
  },
  {
    id: "dl-002",
    type: "single",
    category: "激活函数",
    tags: ["ReLU", "非线性"],
    difficulty: "easy",
    question: "ReLU 激活函数相比 Sigmoid 的一个常见优势是什么？",
    options: {
      A: "输出一定在 0 到 1 之间",
      B: "一定不会出现梯度消失",
      C: "计算简单，并且在正区间梯度较稳定",
      D: "可以直接输出类别概率"
    },
    answer: ["C"],
    explanation: "ReLU 的形式是 max(0, x)，计算非常简单。在 x > 0 时梯度恒为 1，相比 Sigmoid 在饱和区容易出现梯度接近 0 的情况，ReLU 通常更利于深层网络训练。但 ReLU 也可能出现神经元死亡问题。"
  },
  {
    id: "dl-003",
    type: "single",
    category: "优化器",
    tags: ["SGD", "Adam"],
    difficulty: "medium",
    question: "Adam 优化器相比普通 SGD 的主要特点是什么？",
    options: {
      A: "完全不需要学习率",
      B: "对每个参数自适应调整学习率，并结合一阶矩和二阶矩估计",
      C: "只能用于卷积神经网络",
      D: "不会受到噪声梯度影响"
    },
    answer: ["B"],
    explanation: "Adam 结合了 Momentum 和 RMSProp 的思想，会维护梯度的一阶矩估计和二阶矩估计，从而对不同参数进行自适应步长调整。它通常收敛较快，但在某些任务上最终泛化性能未必优于调参良好的 SGD。"
  },
  {
    id: "dl-004",
    type: "multiple",
    category: "正则化",
    tags: ["Dropout", "Weight Decay", "过拟合"],
    difficulty: "medium",
    question: "以下哪些方法通常可以缓解深度学习模型过拟合？",
    options: {
      A: "增加 Dropout",
      B: "使用 Weight Decay",
      C: "增加数据增强",
      D: "在训练集上无限训练直到训练误差为 0"
    },
    answer: ["A", "B", "C"],
    explanation: "Dropout、Weight Decay 和数据增强都可以提升模型泛化能力，从而缓解过拟合。一直训练到训练误差为 0 可能会加剧过拟合，尤其是在数据量较小或模型容量较大时。"
  },
  {
    id: "dl-005",
    type: "single",
    category: "卷积神经网络",
    tags: ["卷积", "参数共享"],
    difficulty: "easy",
    question: "卷积神经网络相比全连接网络处理图像时的一个重要优势是什么？",
    options: {
      A: "完全不需要训练参数",
      B: "利用局部连接和参数共享，减少参数量并提取局部特征",
      C: "只能处理灰度图像",
      D: "输出一定是二维特征图"
    },
    answer: ["B"],
    explanation: "CNN 通过局部感受野提取局部空间特征，并通过卷积核参数共享显著减少参数量。这使得 CNN 更适合处理具有空间结构的图像数据。"
  },
  {
    id: "dl-006",
    type: "single",
    category: "Batch Normalization",
    tags: ["BN", "归一化"],
    difficulty: "medium",
    question: "Batch Normalization 在训练阶段通常使用什么统计量进行归一化？",
    options: {
      A: "整个测试集的均值和方差",
      B: "当前 mini-batch 的均值和方差",
      C: "固定为 0 的均值和固定为 1 的方差",
      D: "每个样本单独的最大值和最小值"
    },
    answer: ["B"],
    explanation: "Batch Normalization 在训练阶段通常使用当前 mini-batch 的均值和方差进行归一化，同时维护滑动平均统计量，用于推理阶段。"
  },
  {
    id: "dl-007",
    type: "single",
    category: "损失函数",
    tags: ["交叉熵", "分类"],
    difficulty: "easy",
    question: "多分类任务中，Softmax 通常和哪种损失函数配合使用？",
    options: {
      A: "均方误差 MSE",
      B: "交叉熵损失 Cross Entropy Loss",
      C: "IoU Loss",
      D: "Triplet Loss"
    },
    answer: ["B"],
    explanation: "多分类任务中，Softmax 用于将 logits 转换为类别概率分布，交叉熵损失用于度量预测分布与真实标签分布之间的差异。实际框架中常用的 CrossEntropyLoss 通常已经内部包含 LogSoftmax。"
  },
  {
    id: "dl-008",
    type: "multiple",
    category: "训练技巧",
    tags: ["学习率", "梯度裁剪", "初始化"],
    difficulty: "medium",
    question: "训练深度神经网络时，以下哪些做法通常有助于稳定训练？",
    options: {
      A: "合理设置学习率",
      B: "必要时使用梯度裁剪",
      C: "使用合适的参数初始化方法",
      D: "无论任务如何都把学习率设置为 100"
    },
    answer: ["A", "B", "C"],
    explanation: "合理学习率、梯度裁剪和合适的初始化都有助于稳定训练。过大的学习率可能导致 loss 震荡甚至发散。"
  },
  {
    id: "dl-009",
    type: "single",
    category: "Transformer",
    tags: ["Self-Attention", "注意力机制"],
    difficulty: "medium",
    question: "Transformer 中 Self-Attention 的主要作用是什么？",
    options: {
      A: "只提取局部边缘特征",
      B: "建模序列中不同位置之间的依赖关系",
      C: "替代所有损失函数",
      D: "只能用于图像分类任务"
    },
    answer: ["B"],
    explanation: "Self-Attention 通过 Query、Key、Value 计算不同 token 之间的相关性，从而建模序列内部不同位置之间的依赖关系。"
  },
  {
    id: "dl-010",
    type: "single",
    category: "模型评估",
    tags: ["Accuracy", "Precision", "Recall"],
    difficulty: "medium",
    question: "在正负样本极度不平衡的二分类任务中，仅使用 Accuracy 作为评价指标可能有什么问题？",
    options: {
      A: "Accuracy 无法计算",
      B: "模型即使几乎全部预测为多数类，也可能得到很高 Accuracy",
      C: "Accuracy 只适用于回归任务",
      D: "Accuracy 一定比 Recall 更可靠"
    },
    answer: ["B"],
    explanation: "在类别不平衡场景下，如果负样本占绝大多数，模型全部预测为负类也可能获得很高 Accuracy，但这并不代表模型能识别少数类。因此还需要关注 Precision、Recall、F1、AUC 等指标。"
  },
  {
    id: "dl-011",
    type: "single",
    category: "神经网络基础",
    tags: ["感知机", "非线性", "激活函数"],
    difficulty: "easy",
    question: "在多层神经网络中，激活函数最核心的作用是什么？",
    options: {
    A: "减少训练样本数量",
    B: "引入非线性表达能力",
    C: "保证模型一定不会过拟合",
    D: "替代损失函数进行优化"
    },
    answer: ["B"],
    explanation: "激活函数的核心作用是引入非线性，使多层网络能够拟合复杂函数。如果没有非线性激活，多层线性变换叠加后仍然等价于一个线性变换。A 与数据规模有关，C 不是激活函数能保证的结果，D 则混淆了模型结构和优化目标。"
    },
    {
    id: "dl-012",
    type: "single",
    category: "神经网络基础",
    tags: ["反向传播", "梯度", "链式法则"],
    difficulty: "easy",
    question: "反向传播算法主要依赖哪一个数学规则来计算各层参数梯度？",
    options: {
    A: "贝叶斯公式",
    B: "链式法则",
    C: "大数定律",
    D: "傅里叶变换"
    },
    answer: ["B"],
    explanation: "反向传播本质上是利用链式法则，将损失函数对后层变量的梯度逐层传回前层，从而得到每个参数的梯度。贝叶斯公式主要用于概率推断，大数定律用于统计收敛分析，傅里叶变换常用于信号频域分析，与普通神经网络梯度计算不是核心关系。"
    },
    {
    id: "dl-013",
    type: "single",
    category: "CNN",
    tags: ["卷积", "局部感受野", "参数共享"],
    difficulty: "easy",
    question: "CNN 相比普通全连接网络，在图像任务中最典型的结构优势是什么？",
    options: {
    A: "通过局部连接和参数共享减少参数量并提取局部模式",
    B: "完全不需要训练数据",
    C: "只能处理一维序列数据",
    D: "不需要反向传播即可自动收敛"
    },
    answer: ["A"],
    explanation: "CNN 利用局部感受野捕捉局部空间模式，并通过卷积核参数共享显著减少参数量，因此适合图像这类具有局部相关性的输入。B 和 D 明显不符合监督学习训练流程，C 则与 CNN 在图像、语音、时序等多种数据上的使用情况不符。"
    },
    {
    id: "dl-014",
    type: "single",
    category: "优化器",
    tags: ["SGD", "学习率", "参数更新"],
    difficulty: "easy",
    question: "在深度学习训练中，学习率过大最容易导致什么问题？",
    options: {
    A: "模型参数完全不更新",
    B: "损失函数可能震荡甚至发散",
    C: "训练集样本数量自动增加",
    D: "模型结构自动变浅"
    },
    answer: ["B"],
    explanation: "学习率决定每次参数更新的步长，过大时可能跨过最优区域，导致损失震荡甚至发散。A 更可能发生在学习率为 0 或梯度消失严重时，C 与优化器无关，D 则不是学习率变化会自动造成的结构变化。"
    },
    {
    id: "dl-015",
    type: "single",
    category: "模型评估",
    tags: ["过拟合", "训练集", "验证集"],
    difficulty: "easy",
    question: "如果模型在训练集上表现很好，但在验证集上表现明显较差，通常说明什么问题？",
    options: {
    A: "模型可能发生了过拟合",
    B: "模型一定欠拟合",
    C: "损失函数一定写错了",
    D: "验证集不再需要使用"
    },
    answer: ["A"],
    explanation: "训练集效果好而验证集效果差，是过拟合的典型表现，说明模型可能记住了训练数据中的细节或噪声，泛化能力不足。欠拟合通常表现为训练集和验证集都较差；损失函数可能有问题但不能直接断定；验证集恰恰用于发现泛化问题。"
    },
    {
    id: "dl-016",
    type: "single",
    category: "正则化",
    tags: ["Dropout", "训练阶段", "推理阶段"],
    difficulty: "medium",
    question: "关于 Dropout 在训练和推理阶段的说法，哪一项是正确的？",
    options: {
    A: "训练阶段随机屏蔽部分神经元，推理阶段通常使用完整网络",
    B: "训练阶段使用完整网络，推理阶段随机屏蔽神经元",
    C: "训练和推理阶段都必须随机屏蔽相同比例神经元",
    D: "Dropout 只能用于输入层，不能用于隐藏层"
    },
    answer: ["A"],
    explanation: "Dropout 在训练阶段随机屏蔽部分神经元，降低神经元之间的 co-adaptation，从而缓解过拟合；推理阶段通常使用完整网络，并通过实现中的缩放策略保持期望输出一致。B 和 C 颠倒了训练与推理逻辑，D 则错误限制了 Dropout 的使用范围。"
    },
    {
    id: "dl-017",
    type: "single",
    category: "归一化",
    tags: ["BatchNorm", "训练阶段", "推理阶段"],
    difficulty: "medium",
    question: "BatchNorm 在推理阶段通常使用什么统计量进行归一化？",
    options: {
    A: "当前 batch 的均值和方差",
    B: "训练过程中累计的滑动均值和滑动方差",
    C: "每个样本单独计算的最大值和最小值",
    D: "模型最后一层权重的均值和方差"
    },
    answer: ["B"],
    explanation: "BatchNorm 训练阶段使用当前 batch 的统计量，并维护滑动均值和滑动方差；推理阶段为了输出稳定，通常使用训练中累计的滑动统计量。A 是训练阶段行为，C 更接近某些样本级归一化思路，D 与 BatchNorm 的特征归一化机制无关。"
    },
    {
    id: "dl-018",
    type: "single",
    category: "优化器",
    tags: ["Adam", "SGD", "动量"],
    difficulty: "medium",
    question: "Adam 相比普通 SGD 的一个重要特点是什么？",
    options: {
    A: "对每个参数使用完全相同且固定不变的学习率",
    B: "结合一阶矩和二阶矩估计来自适应调整参数更新",
    C: "不需要计算梯度即可更新参数",
    D: "只能用于线性回归，不能用于深度网络"
    },
    answer: ["B"],
    explanation: "Adam 会维护梯度的一阶矩估计和二阶矩估计，从而对不同参数进行自适应步长调整，通常在训练早期收敛较快。A 更接近普通 SGD 的简化描述，C 错在 Adam 仍然依赖梯度，D 则与 Adam 在深度学习中的广泛应用不符。"
    },
    {
    id: "dl-019",
    type: "single",
    category: "损失函数",
    tags: ["交叉熵", "分类任务", "Softmax"],
    difficulty: "medium",
    question: "多分类任务中，Softmax 通常与交叉熵损失一起使用，主要原因是什么？",
    options: {
    A: "Softmax 将 logits 转换为类别概率分布，交叉熵衡量预测分布与真实标签的差异",
    B: "Softmax 可以直接替代神经网络中的所有卷积层",
    C: "交叉熵只能用于回归任务，不能用于分类任务",
    D: "二者结合后模型不再需要训练数据"
    },
    answer: ["A"],
    explanation: "Softmax 将未归一化的 logits 映射为各类别概率，交叉熵则度量预测概率分布与真实类别之间的差异，因此常用于多分类训练。B 混淆了输出层处理和特征提取层，C 与交叉熵的常见用途相反，D 则错误理解了监督学习训练过程。"
    },
    {
    id: "dl-020",
    type: "single",
    category: "CNN",
    tags: ["池化", "下采样", "平移不变性"],
    difficulty: "medium",
    question: "CNN 中池化层的常见作用不包括哪一项？",
    options: {
    A: "降低特征图空间尺寸",
    B: "扩大后续层的有效感受野",
    C: "增强一定程度的局部平移鲁棒性",
    D: "为每个类别直接生成最终概率"
    },
    answer: ["D"],
    explanation: "池化层通常用于下采样，降低空间分辨率和计算量，同时让后续特征拥有更大的有效感受野，并带来一定局部平移鲁棒性。直接生成类别概率通常是分类头或输出层的职责，不是池化层的基本功能。"
    },
    {
    id: "dl-021",
    type: "single",
    category: "Transformer",
    tags: ["Self-Attention", "QKV", "序列建模"],
    difficulty: "medium",
    question: "Transformer 中 Self-Attention 的核心计算目的是什么？",
    options: {
    A: "计算不同 token 之间的相关性并聚合上下文信息",
    B: "固定删除序列中一半的 token",
    C: "只保留序列最后一个 token 的特征",
    D: "将所有 token 的位置编码清零"
    },
    answer: ["A"],
    explanation: "Self-Attention 通过 Query 与 Key 计算 token 间相关性，再用注意力权重对 Value 进行加权聚合，从而获得上下文相关表示。B、C 都是破坏信息的固定操作，不是注意力机制；D 也不是 Self-Attention 的目的，位置编码反而常用于补充顺序信息。"
    },
    {
    id: "dl-022",
    type: "single",
    category: "Transformer",
    tags: ["位置编码", "序列顺序", "Attention"],
    difficulty: "medium",
    question: "Transformer 为什么通常需要位置编码？",
    options: {
    A: "因为纯 Self-Attention 本身不显式包含 token 的顺序信息",
    B: "因为位置编码可以让模型完全不需要训练",
    C: "因为位置编码会删除所有低频语义信息",
    D: "因为位置编码只用于减少显存占用"
    },
    answer: ["A"],
    explanation: "纯 Self-Attention 对输入 token 的排列缺少天然的顺序建模能力，因此需要位置编码或相对位置机制向模型注入位置信息。B 夸大了位置编码作用，C 没有依据，D 也不是位置编码的主要设计目标。"
    },
    {
    id: "dl-023",
    type: "single",
    category: "训练技巧",
    tags: ["梯度消失", "深层网络", "残差连接"],
    difficulty: "medium",
    question: "残差连接有助于训练深层网络，主要原因是什么？",
    options: {
    A: "它提供了更直接的梯度传播路径，缓解深层网络退化和梯度传播困难",
    B: "它会强制所有卷积核权重变为 0",
    C: "它让网络只能学习线性函数",
    D: "它完全取消了损失函数的作用"
    },
    answer: ["A"],
    explanation: "残差连接通过恒等映射或捷径分支，使信息和梯度可以更直接地跨层传播，从而缓解深层网络训练困难和退化问题。B 与残差结构无关，C 错在残差网络仍包含非线性层，D 则混淆了网络结构和训练目标。"
    },
    {
    id: "dl-024",
    type: "single",
    category: "模型评估",
    tags: ["Precision", "Recall", "分类指标"],
    difficulty: "medium",
    question: "在二分类任务中，Recall 更关注什么？",
    options: {
    A: "被模型预测为正样本的样本中有多少是真的正样本",
    B: "真实正样本中有多少被模型成功找出",
    C: "模型参数数量是否足够少",
    D: "训练损失是否严格等于 0"
    },
    answer: ["B"],
    explanation: "Recall 召回率关注真实正样本中被正确识别出来的比例，即 TP / (TP + FN)。A 描述的是 Precision 精确率，C 属于模型复杂度问题，D 与召回率没有直接等价关系，训练损失为 0 也不一定代表召回率完美。"
    },
    {
    id: "dl-025",
    type: "single",
    category: "训练技巧",
    tags: ["学习率调度", "Warmup", "稳定训练"],
    difficulty: "medium",
    question: "训练 Transformer 等模型时使用 learning rate warmup 的主要目的是什么？",
    options: {
    A: "在训练初期逐步增大学习率，降低早期训练不稳定风险",
    B: "让学习率从头到尾保持为 0",
    C: "只在推理阶段更新模型参数",
    D: "强制模型忽略所有长距离依赖"
    },
    answer: ["A"],
    explanation: "Warmup 通常在训练初期从较小学习率逐步升高，避免模型参数尚未稳定时使用过大步长导致训练震荡或发散，尤其常见于 Transformer 训练。B 会导致无法有效学习，C 混淆训练和推理，D 与学习率调度无关。"
    },
    {
    id: "dl-026",
    type: "single",
    category: "模型压缩与部署",
    tags: ["量化", "INT8", "部署"],
    difficulty: "hard",
    question: "关于 INT8 量化部署，哪一项说法最准确？",
    options: {
    A: "量化一定会提升精度，因为数值范围更小",
    B: "量化通常能降低模型存储和计算开销，但可能带来精度损失，需要校准或量化感知训练",
    C: "量化后模型不再需要输入预处理",
    D: "INT8 量化只能用于 NLP，不能用于视觉模型"
    },
    answer: ["B"],
    explanation: "INT8 量化通过低精度整数表示权重或激活，通常可以减少存储、带宽和计算开销，但量化误差可能导致精度下降，因此常需要校准数据或量化感知训练。A 过于绝对，C 与输入处理无关，D 也不符合视觉模型部署实践。"
    },
    {
    id: "dl-027",
    type: "single",
    category: "目标检测",
    tags: ["NMS", "候选框", "IoU"],
    difficulty: "hard",
    question: "目标检测中传统 NMS 的主要作用是什么？",
    options: {
    A: "根据置信度和 IoU 抑制高度重叠的冗余检测框",
    B: "在训练前自动生成类别标签",
    C: "把所有检测框都转换成语义分割 mask",
    D: "直接替代 backbone 提取图像特征"
    },
    answer: ["A"],
    explanation: "传统 NMS 会先按置信度排序，再根据 IoU 抑制与高分框重叠过大的候选框，用于减少重复检测。B 属于数据标注或预处理问题，C 是检测到分割的任务转换，并非 NMS 功能，D 则混淆了后处理与特征提取模块。"
    },
    {
    id: "dl-028",
    type: "multiple",
    category: "神经网络基础",
    tags: ["梯度消失", "梯度爆炸", "深层网络"],
    difficulty: "medium",
    question: "以下哪些现象或设计与缓解深层网络训练困难有关？",
    options: {
    A: "使用残差连接改善梯度传播",
    B: "合理初始化参数，避免激活或梯度尺度过度放大或缩小",
    C: "使用 BatchNorm 等归一化方法稳定中间特征分布",
    D: "将所有激活函数替换为恒等映射并删除所有非线性"
    },
    answer: ["A", "B", "C"],
    explanation: "残差连接能提供更直接的梯度通路，合理初始化有助于控制前向激活和反向梯度尺度，BatchNorm 等归一化方法可以提升训练稳定性。D 虽可能让梯度传播形式变简单，但删除所有非线性会严重削弱模型表达能力，不是常规有效方案。"
    },
    {
    id: "dl-029",
    type: "multiple",
    category: "正则化",
    tags: ["过拟合", "数据增强", "权重衰减"],
    difficulty: "medium",
    question: "以下哪些方法通常可以用于缓解过拟合？",
    options: {
    A: "增加合理的数据增强",
    B: "使用权重衰减限制参数过大",
    C: "在合适位置使用 Dropout",
    D: "无限增大模型容量且不增加数据",
    E: "使用验证集监控并进行早停"
    },
    answer: ["A", "B", "C", "E"],
    explanation: "数据增强能增加样本多样性，权重衰减约束参数规模，Dropout 降低神经元共适应，早停可在验证性能变差前停止训练，这些都常用于缓解过拟合。D 通常会加重过拟合风险，尤其在数据规模不变时更明显。"
    },
    {
    id: "dl-030",
    type: "multiple",
    category: "Transformer",
    tags: ["多头注意力", "Self-Attention", "表示学习"],
    difficulty: "hard",
    question: "关于 Multi-Head Attention，以下哪些说法是正确的？",
    options: {
    A: "多个注意力头可以在不同子空间中学习不同关系模式",
    B: "每个头通常会对 Q、K、V 做各自的线性投影",
    C: "多头注意力的输出通常会拼接后再经过线性变换",
    D: "多头注意力要求所有 token 的注意力权重必须完全相同",
    E: "多头机制一定会让推理速度比单头更快"
    },
    answer: ["A", "B", "C"],
    explanation: "Multi-Head Attention 通过多个头在不同表示子空间中计算注意力，每个头通常有独立的 Q、K、V 投影，最后将各头结果拼接并线性映射。D 错在不同 token 和不同头的注意力分布可以不同；E 也不必然成立，多头会增加计算结构，速度取决于实现和硬件。"
    },
    {
    id: "dl-031",
    type: "multiple",
    category: "模型评估",
    tags: ["混淆矩阵", "Precision", "Recall", "F1"],
    difficulty: "medium",
    question: "关于分类任务中的 Precision、Recall 和 F1，以下哪些说法是正确的？",
    options: {
    A: "Precision 关注预测为正的样本中有多少是真的正样本",
    B: "Recall 关注真实正样本中有多少被成功预测为正样本",
    C: "F1 是 Precision 和 Recall 的调和平均",
    D: "只要 Accuracy 高，Precision 和 Recall 一定都高",
    E: "类别极不均衡时，仅看 Accuracy 可能产生误导"
    },
    answer: ["A", "B", "C", "E"],
    explanation: "Precision、Recall 分别关注预测正样本的可靠性和真实正样本的覆盖率，F1 是二者的调和平均。类别不均衡时模型可能通过偏向多数类获得较高 Accuracy，因此 E 正确。D 过于绝对，Accuracy 高并不必然代表各类 Precision 和 Recall 都高。"
    },
    {
    id: "dl-032",
    type: "multiple",
    category: "优化器",
    tags: ["SGD", "Adam", "泛化", "学习率"],
    difficulty: "medium",
    question: "关于 SGD 和 Adam 的工程使用，以下哪些说法较为合理？",
    options: {
    A: "Adam 通常对学习率不如普通 SGD 那么敏感，但仍需要调参",
    B: "SGD 加动量在一些视觉任务中可能获得较好的泛化表现",
    C: "Adam 不需要梯度，因此显存占用一定比 SGD 更低",
    D: "优化器选择会影响收敛速度和最终泛化效果",
    E: "只要使用 Adam，模型就不可能过拟合"
    },
    answer: ["A", "B", "D"],
    explanation: "Adam 通过自适应矩估计降低了部分调参难度，但仍需选择学习率等超参数；SGD 加动量在不少视觉任务中泛化表现稳定；优化器会影响收敛速度和最终效果。C 错在 Adam 仍依赖梯度且还需额外维护矩估计，E 则把优化器误认为正则化保证。"
    },
    {
    id: "dl-033",
    type: "multiple",
    category: "模型压缩与部署",
    tags: ["蒸馏", "剪枝", "量化", "推理加速"],
    difficulty: "medium",
    question: "以下哪些属于常见的深度学习模型压缩或部署加速方法？",
    options: {
    A: "知识蒸馏",
    B: "结构化剪枝",
    C: "低精度量化",
    D: "增加无用分支并保留所有分支推理",
    E: "算子融合或使用推理引擎优化"
    },
    answer: ["A", "B", "C", "E"],
    explanation: "知识蒸馏通过教师模型指导学生模型，剪枝减少冗余结构，量化降低数值精度和计算开销，算子融合与推理引擎优化可以减少部署时的运行开销。D 通常会增加计算量，不属于合理的压缩或加速方法。"
    }
];
