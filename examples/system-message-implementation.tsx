// Ví dụ triển khai System Message trong React/TypeScript

interface AIContext {
  currentTime: string;
  currentFile: string;
  openFiles: string[];
  recentChanges: string[];
  mode: 'normal' | 'planning' | 'debugging';
}

// ✅ System Prompt - TĨNH, KHÔNG BAO GIỜ THAY ĐỔI
const STATIC_SYSTEM_PROMPT = `
Bạn là trợ lý lập trình chuyên nghiệp.

Dự án: Hệ thống quản lý chuyển phát nhanh (极光转运)
Tech Stack: React 19, TypeScript, Tailwind CSS, Vite

Cấu trúc dự án:
- src/components/HomePage.tsx - Trang chủ
- src/components/PackageList.tsx - Danh sách gói hàng
- src/components/OrderDetail.tsx - Chi tiết đơn hàng
- src/components/Scanner.tsx - Quét mã vận đơn

Quy tắc code:
- Sử dụng functional components
- TypeScript strict mode
- Props phải có interface rõ ràng
- Tailwind CSS cho styling
- Tên file: PascalCase

Lưu ý: Thông tin về thời gian, file hiện tại, và trạng thái 
sẽ được cung cấp trong thẻ <system-reminder> của mỗi tin nhắn.
`.trim();

// ✅ Hàm tạo System Message - ĐỘNG, thay đổi mỗi lần
function buildSystemMessage(context: AIContext): string {
  return `
<system-reminder>
Thời gian: ${context.currentTime}
File đang mở: ${context.currentFile}
Các file đang mở: ${context.openFiles.join(', ')}
Thay đổi gần đây: ${context.recentChanges.join(', ') || 'Không có'}
Chế độ: ${context.mode}
</system-reminder>
  `.trim();
}

// ✅ Hàm gọi API với cache-friendly structure
async function sendMessageToAI(
  userQuery: string,
  context: AIContext,
  conversationHistory: Message[]
) {
  const messages = [
    // 1. System prompt - TĨNH (được cache)
    { role: 'system', content: STATIC_SYSTEM_PROMPT },
    
    // 2. Lịch sử hội thoại - TĨNH (được cache)
    ...conversationHistory,
    
    // 3. Tin nhắn mới với context động
    {
      role: 'user',
      content: `${buildSystemMessage(context)}\n\n${userQuery}`
    }
  ];

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      messages,
      max_tokens: 4096
    })
  });

  return response.json();
}

// ❌ VÍ DỤ SAI - Rebuild system prompt mỗi lần
function buildDynamicSystemPrompt_WRONG(context: AIContext): string {
  return `
Bạn là trợ lý lập trình.
Dự án: 极光转运
Thời gian: ${context.currentTime}        // ← THAY ĐỔI → PHÁ CACHE
File: ${context.currentFile}             // ← THAY ĐỔI → PHÁ CACHE
Chế độ: ${context.mode}                  // ← THAY ĐỔI → PHÁ CACHE
  `;
}

// ✅ Component React sử dụng pattern đúng
export function AIAssistant() {
  const [context, setContext] = React.useState<AIContext>({
    currentTime: new Date().toLocaleString(),
    currentFile: 'HomePage.tsx',
    openFiles: ['HomePage.tsx'],
    recentChanges: [],
    mode: 'normal'
  });

  // Cập nhật context khi có thay đổi
  React.useEffect(() => {
    const interval = setInterval(() => {
      setContext(prev => ({
        ...prev,
        currentTime: new Date().toLocaleString()
      }));
    }, 60000); // Cập nhật mỗi phút

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (query: string) => {
    // System prompt giữ nguyên, chỉ context thay đổi
    const response = await sendMessageToAI(query, context, []);
    console.log(response);
  };

  return (
    <div>
      <div className="context-info">
        <p>File: {context.currentFile}</p>
        <p>Mode: {context.mode}</p>
      </div>
      {/* UI components */}
    </div>
  );
}
