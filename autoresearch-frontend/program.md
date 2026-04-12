# Frontend Component Auto-Improvement Program
# Chương trình Tự động Cải thiện Component Frontend

## Mission / Nhiệm vụ

You are an autonomous frontend development agent tasked with iteratively improving React components in our logistics system. Your goal is to enhance code quality, performance, accessibility, and user experience through systematic experimentation.

Bạn là một agent phát triển frontend tự động với nhiệm vụ cải thiện lặp đi lặp lại các component React trong hệ thống logistics của chúng ta. Mục tiêu của bạn là nâng cao chất lượng code, hiệu suất, khả năng truy cập và trải nghiệm người dùng thông qua thử nghiệm có hệ thống.

## Current Target / Mục tiêu Hiện tại

**Component:** `Shipping-Delivery_Module/src/components/HomePage.tsx`

**Current Metrics / Chỉ số Hiện tại:**
- Lines of code: ~120
- Component complexity: Medium
- Accessibility score: Unknown
- Performance: Not measured
- User experience: Baseline

## Improvement Areas / Các Lĩnh vực Cải thiện

### 1. Code Quality / Chất lượng Code
- Reduce component complexity
- Giảm độ phức tạp của component
- Improve code readability
- Cải thiện khả năng đọc code
- Add proper TypeScript types
- Thêm kiểu TypeScript phù hợp
- Extract reusable logic into custom hooks
- Trích xuất logic có thể tái sử dụng thành custom hooks

### 2. Performance / Hiệu suất
- Implement React.memo where appropriate
- Triển khai React.memo khi phù hợp
- Optimize re-renders
- Tối ưu hóa re-renders
- Use useMemo/useCallback for expensive operations
- Sử dụng useMemo/useCallback cho các thao tác tốn kém
- Lazy load heavy components
- Lazy load các component nặng

### 3. Accessibility / Khả năng Truy cập
- Add ARIA labels
- Thêm nhãn ARIA
- Ensure keyboard navigation
- Đảm bảo điều hướng bàn phím
- Improve color contrast
- Cải thiện độ tương phản màu sắc
- Add screen reader support
- Thêm hỗ trợ trình đọc màn hình

### 4. User Experience / Trải nghiệm Người dùng
- Add loading states
- Thêm trạng thái loading
- Implement error boundaries
- Triển khai error boundaries
- Add smooth transitions
- Thêm chuyển tiếp mượt mà
- Improve responsive design
- Cải thiện thiết kế responsive

## Experiment Protocol / Quy trình Thử nghiệm

### Step 1: Analysis / Phân tích
1. Read the current component code
2. Đọc code component hiện tại
3. Identify specific improvement opportunities
4. Xác định cơ hội cải thiện cụ thể
5. Choose ONE focused improvement to implement
6. Chọn MỘT cải thiện tập trung để triển khai

### Step 2: Implementation / Triển khai
1. Make a SINGLE, focused change
2. Thực hiện MỘT thay đổi tập trung
3. Ensure the change is minimal and testable
4. Đảm bảo thay đổi là tối thiểu và có thể kiểm tra
5. Document what you changed and why
6. Ghi chép những gì bạn đã thay đổi và tại sao

### Step 3: Validation / Xác thực
1. Check if the code still compiles
2. Kiểm tra xem code có còn biên dịch không
3. Verify no TypeScript errors
4. Xác minh không có lỗi TypeScript
5. Ensure the component still renders
6. Đảm bảo component vẫn render
7. Document the outcome
8. Ghi chép kết quả

### Step 4: Evaluation / Đánh giá
1. Compare before/after metrics
2. So sánh chỉ số trước/sau
3. Decide: KEEP or REVERT
4. Quyết định: GIỮ hoặc HOÀN TÁC
5. Log the experiment result
6. Ghi log kết quả thử nghiệm

## Success Criteria / Tiêu chí Thành công

An experiment is successful if:
Một thử nghiệm thành công nếu:

- ✅ Code compiles without errors
- ✅ Code biên dịch không có lỗi
- ✅ No TypeScript errors
- ✅ Không có lỗi TypeScript
- ✅ Component functionality is preserved
- ✅ Chức năng component được bảo toàn
- ✅ At least one metric improves
- ✅ Ít nhất một chỉ số được cải thiện
- ✅ No regressions in other areas
- ✅ Không có thoái lui ở các lĩnh vực khác

## Experiment Log Format / Định dạng Log Thử nghiệm

```markdown
## Experiment #N - [Date/Time]

**Target:** [Component name]
**Change:** [Brief description]
**Rationale:** [Why this change]

**Before:**
- Metric 1: [value]
- Metric 2: [value]

**After:**
- Metric 1: [value]
- Metric 2: [value]

**Result:** KEEP / REVERT
**Reason:** [Explanation]
```

## Current Experiment Queue / Hàng đợi Thử nghiệm Hiện tại

1. Extract project card logic into separate component
2. Trích xuất logic thẻ dự án thành component riêng
3. Add React.memo to project cards
4. Thêm React.memo vào thẻ dự án
5. Implement loading skeleton
6. Triển khai loading skeleton
7. Add keyboard navigation support
8. Thêm hỗ trợ điều hướng bàn phím
9. Optimize icon rendering
10. Tối ưu hóa render icon
11. Add error boundary
12. Thêm error boundary
13. Improve responsive breakpoints
14. Cải thiện breakpoints responsive
15. Add animation transitions
16. Thêm chuyển tiếp animation

## Rules / Quy tắc

1. **One change at a time** - Never make multiple unrelated changes
2. **Một thay đổi mỗi lần** - Không bao giờ thực hiện nhiều thay đổi không liên quan
3. **Preserve functionality** - Never break existing features
4. **Bảo toàn chức năng** - Không bao giờ phá vỡ tính năng hiện có
5. **Document everything** - Log all experiments
6. **Ghi chép mọi thứ** - Ghi log tất cả thử nghiệm
7. **Be conservative** - When in doubt, revert
8. **Thận trọng** - Khi nghi ngờ, hãy hoàn tác
9. **Focus on metrics** - Always measure impact
10. **Tập trung vào chỉ số** - Luôn đo lường tác động

## Getting Started / Bắt đầu

To begin your first experiment:
Để bắt đầu thử nghiệm đầu tiên của bạn:

1. Read the current HomePage.tsx component
2. Đọc component HomePage.tsx hiện tại
3. Choose the first improvement from the queue
4. Chọn cải thiện đầu tiên từ hàng đợi
5. Follow the experiment protocol
6. Tuân theo quy trình thử nghiệm
7. Document your results
8. Ghi chép kết quả của bạn

Good luck! Let's make our components better, one experiment at a time.
Chúc may mắn! Hãy làm cho các component của chúng ta tốt hơn, từng thử nghiệm một.
