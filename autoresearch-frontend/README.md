# AutoResearch for Frontend Development
# AutoResearch cho Phát triển Frontend

## 概述 / Tổng quan

这是一个受 [karpathy/autoresearch](https://github.com/karpathy/autoresearch) 启发的前端组件自动改进系统。与原始项目不同，我们不是训练 ML 模型，而是通过系统化的实验来改进 React 组件。

Đây là một hệ thống cải thiện component frontend tự động được lấy cảm hứng từ [karpathy/autoresearch](https://github.com/karpathy/autoresearch). Khác với dự án gốc, chúng ta không training mô hình ML mà cải thiện các component React thông qua thử nghiệm có hệ thống.

## 核心理念 / Ý tưởng Cốt lõi

### AutoResearch 原理 / Nguyên lý AutoResearch

1. **自主实验 / Thử nghiệm Tự động**
   - AI 代理自动进行小的、可测试的更改
   - AI agent tự động thực hiện các thay đổi nhỏ, có thể kiểm tra

2. **快速迭代 / Lặp nhanh**
   - 每个实验都很小且专注
   - Mỗi thử nghiệm đều nhỏ và tập trung

3. **基于指标的决策 / Quyết định Dựa trên Chỉ số**
   - 保留改进的更改，回滚失败的更改
   - Giữ lại thay đổi cải thiện, rollback thay đổi thất bại

4. **持续改进 / Cải thiện Liên tục**
   - 系统可以在后台运行，不断优化代码
   - Hệ thống có thể chạy nền, liên tục tối ưu code

## 如何使用 / Cách Sử dụng

### 方法 1: 手动模式 / Phương pháp 1: Chế độ Thủ công

1. **阅读 program.md**
   ```bash
   # 查看当前的改进目标和实验队列
   cat autoresearch-frontend/program.md
   ```

2. **选择一个实验**
   - 从实验队列中选择一个改进项
   - Chọn một mục cải thiện từ hàng đợi thử nghiệm

3. **实施更改**
   - 对目标组件进行小的、专注的更改
   - Thực hiện thay đổi nhỏ, tập trung vào component mục tiêu

4. **验证**
   ```bash
   cd Shipping-Delivery_Module
   npm run build  # 检查编译
   npm run dev    # 测试运行
   ```

5. **记录结果**
   - 在 experiment-log.md 中记录实验结果
   - Ghi lại kết quả thử nghiệm trong experiment-log.md

6. **决定保留或回滚**
   ```bash
   # 如果成功
   git add .
   git commit -m "experiment: [description]"
   
   # 如果失败
   git checkout -- [file]
   ```

### 方法 2: AI 辅助模式 / Phương pháp 2: Chế độ Hỗ trợ AI

1. **使用 AI 助手（如 Claude、GPT-4）**
   ```
   提示词：
   "请阅读 autoresearch-frontend/program.md 文件，
   然后帮我执行第一个实验。请遵循实验协议，
   一次只做一个小的更改。"
   ```

2. **AI 将会：**
   - 分析当前组件
   - Phân tích component hiện tại
   - 选择一个改进
   - Chọn một cải thiện
   - 实施更改
   - Thực hiện thay đổi
   - 验证结果
   - Xác thực kết quả
   - 记录实验
   - Ghi lại thử nghiệm

3. **你的角色：**
   - 审查 AI 的更改
   - Xem xét thay đổi của AI
   - 测试功能
   - Kiểm tra chức năng
   - 决定保留或回滚
   - Quyết định giữ hoặc rollback

### 方法 3: 完全自动模式（高级）/ Phương pháp 3: Chế độ Tự động Hoàn toàn (Nâng cao)

如果你有 API 访问权限，可以创建一个脚本来自动化整个过程：
Nếu bạn có quyền truy cập API, có thể tạo script để tự động hóa toàn bộ quy trình:

```javascript
// auto-improve.js
// 这是一个概念示例，需要 OpenAI/Anthropic API
// Đây là ví dụ khái niệm, cần OpenAI/Anthropic API

const runExperiment = async () => {
  // 1. 读取 program.md
  // 2. 让 AI 选择并实施一个改进
  // 3. 运行构建验证
  // 4. 记录结果
  // 5. 如果成功，提交；如果失败，回滚
  // 6. 重复
};
```

## 实验类型 / Các Loại Thử nghiệm

### 1. 代码质量实验 / Thử nghiệm Chất lượng Code

**示例 / Ví dụ:**
- 提取重复代码到自定义 hooks
- Trích xuất code lặp lại thành custom hooks
- 改进 TypeScript 类型定义
- Cải thiện định nghĩa kiểu TypeScript
- 简化复杂的条件逻辑
- Đơn giản hóa logic điều kiện phức tạp

**指标 / Chỉ số:**
- 代码行数减少
- Giảm số dòng code
- 圈复杂度降低
- Giảm độ phức tạp vòng lặp
- TypeScript 错误数量
- Số lỗi TypeScript

### 2. 性能实验 / Thử nghiệm Hiệu suất

**示例 / Ví dụ:**
- 添加 React.memo
- Thêm React.memo
- 使用 useMemo/useCallback
- Sử dụng useMemo/useCallback
- 实现虚拟滚动
- Triển khai virtual scrolling

**指标 / Chỉ số:**
- 渲染次数
- Số lần render
- 组件加载时间
- Thời gian load component
- 内存使用
- Sử dụng bộ nhớ

### 3. 可访问性实验 / Thử nghiệm Khả năng Truy cập

**示例 / Ví dụ:**
- 添加 ARIA 标签
- Thêm nhãn ARIA
- 改进键盘导航
- Cải thiện điều hướng bàn phím
- 增强颜色对比度
- Tăng cường độ tương phản màu

**指标 / Chỉ số:**
- ARIA 属性覆盖率
- Tỷ lệ bao phủ thuộc tính ARIA
- 键盘可访问性
- Khả năng truy cập bàn phím
- 颜色对比度分数
- Điểm độ tương phản màu

### 4. 用户体验实验 / Thử nghiệm Trải nghiệm Người dùng

**示例 / Ví dụ:**
- 添加加载状态
- Thêm trạng thái loading
- 实现错误边界
- Triển khai error boundaries
- 添加平滑过渡
- Thêm chuyển tiếp mượt mà

**指标 / Chỉ số:**
- 用户交互响应时间
- Thời gian phản hồi tương tác người dùng
- 错误处理覆盖率
- Tỷ lệ bao phủ xử lý lỗi
- 动画流畅度
- Độ mượt animation

## 最佳实践 / Thực hành Tốt nhất

### ✅ 做 / Nên làm

1. **一次一个更改**
   - 每个实验只关注一个改进
   - Mỗi thử nghiệm chỉ tập trung vào một cải thiện

2. **测量影响**
   - 始终记录前后指标
   - Luôn ghi lại chỉ số trước và sau

3. **保持小步前进**
   - 小的更改更容易验证和回滚
   - Thay đổi nhỏ dễ xác thực và rollback hơn

4. **记录一切**
   - 详细的日志有助于学习和改进
   - Log chi tiết giúp học hỏi và cải thiện

5. **快速失败**
   - 如果实验失败，立即回滚
   - Nếu thử nghiệm thất bại, rollback ngay lập tức

### ❌ 不要做 / Không nên làm

1. **不要一次更改多个东西**
   - 这使得很难确定什么有效
   - Điều này khiến khó xác định cái gì hiệu quả

2. **不要跳过验证**
   - 始终运行构建和测试
   - Luôn chạy build và test

3. **不要忽略回归**
   - 确保没有破坏现有功能
   - Đảm bảo không phá vỡ chức năng hiện có

4. **不要忘记记录**
   - 未记录的实验是浪费的学习机会
   - Thử nghiệm không ghi lại là cơ hội học hỏi bị lãng phí

## 文件结构 / Cấu trúc File

```
autoresearch-frontend/
├── README.md              # 本文件 / File này
├── program.md             # AI 代理指令 / Hướng dẫn AI agent
├── experiment-log.md      # 实验日志 / Log thử nghiệm
└── metrics/               # 指标跟踪（可选）/ Theo dõi chỉ số (tùy chọn)
    ├── before/
    └── after/
```

## 示例工作流程 / Quy trình Làm việc Mẫu

```bash
# 1. 查看当前目标
cat autoresearch-frontend/program.md

# 2. 开始实验
# 对组件进行更改...

# 3. 验证
cd Shipping-Delivery_Module
npm run build

# 4. 如果成功
git add .
git commit -m "experiment: extract ProjectCard component"
echo "## Experiment #1 - Success" >> ../autoresearch-frontend/experiment-log.md

# 5. 如果失败
git checkout -- src/components/HomePage.tsx
echo "## Experiment #1 - Reverted" >> ../autoresearch-frontend/experiment-log.md

# 6. 继续下一个实验
```

## 与原始 AutoResearch 的区别 / Khác biệt với AutoResearch Gốc

| 特性 / Tính năng | 原始 AutoResearch / Gốc | 我们的版本 / Phiên bản của chúng ta |
|---|---|---|
| 目标 / Mục tiêu | ML 模型训练 / Training mô hình ML | React 组件改进 / Cải thiện component React |
| 语言 / Ngôn ngữ | Python | TypeScript/JavaScript |
| 运行时间 / Thời gian chạy | 5 分钟固定 / 5 phút cố định | 灵活 / Linh hoạt |
| 指标 / Chỉ số | val_bpb | 代码质量、性能、可访问性 / Chất lượng code, hiệu suất, khả năng truy cập |
| 硬件 / Phần cứng | GPU 必需 / Cần GPU | 标准开发环境 / Môi trường phát triển tiêu chuẩn |

## 下一步 / Bước Tiếp theo

1. **开始第一个实验**
   - 阅读 program.md
   - Đọc program.md
   - 选择一个改进
   - Chọn một cải thiện
   - 实施并记录
   - Triển khai và ghi lại

2. **建立指标基线**
   - 为每个组件记录当前指标
   - Ghi lại chỉ số hiện tại cho mỗi component

3. **迭代改进**
   - 每天运行 1-3 个实验
   - Chạy 1-3 thử nghiệm mỗi ngày
   - 跟踪进度
   - Theo dõi tiến độ

4. **分享学习**
   - 记录什么有效，什么无效
   - Ghi lại cái gì hiệu quả, cái gì không
   - 更新 program.md 以反映学习
   - Cập nhật program.md để phản ánh học hỏi

## 贡献 / Đóng góp

欢迎提出新的实验想法！请在 program.md 的实验队列中添加你的建议。
Hoan nghênh ý tưởng thử nghiệm mới! Vui lòng thêm đề xuất của bạn vào hàng đợi thử nghiệm trong program.md.

## 许可 / Giấy phép

MIT - 与主项目相同 / Giống với dự án chính
