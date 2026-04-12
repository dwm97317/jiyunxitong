export type Language = 'vi' | 'zh' | 'en';

export interface Translations {
  // Common
  back: string;
  home: string;
  search: string;
  filter: string;
  save: string;
  cancel: string;
  confirm: string;
  
  // HomePage
  appTitle: string;
  appSubtitle: string;
  packageManagement: string;
  packageManagementDesc: string;
  checkExpress: string;
  checkExpressDesc: string;
  warehouseManagement: string;
  warehouseManagementDesc: string;
  logisticsTracking: string;
  logisticsTrackingDesc: string;
  todayStats: string;
  pending: string;
  completed: string;
  inTransit: string;
  systemNotice: string;
  noticeContent: string;
  returnHome: string;
  
  // PackageList
  packageList: string;
  scanCode: string;
  all: string;
  notInWarehouse: string;
  inWarehouse: string;
  notPacked: string;
  notPaid: string;
  notShipped: string;
  shipped: string;
  trackingNumber: string;
  status: string;
  weight: string;
  price: string;
  viewDetails: string;
  
  // OrderDetail
  orderDetail: string;
  basicInfo: string;
  recipient: string;
  phone: string;
  address: string;
  orderNumber: string;
  orderTime: string;
  packageInfo: string;
  itemName: string;
  quantity: string;
  unitPrice: string;
  totalAmount: string;
  shippingFee: string;
  finalAmount: string;
  paymentStatus: string;
  paid: string;
  unpaid: string;
  
  // Scanner
  scanTitle: string;
  scanSubtitle: string;
  scanButton: string;
  manualInput: string;
  inputPlaceholder: string;
  
  // Status
  statusNotInWarehouse: string;
  statusInWarehouse: string;
  statusNotPacked: string;
  statusNotPaid: string;
  statusNotShipped: string;
  statusShipped: string;
}

export const translations: Record<Language, Translations> = {
  vi: {
    // Common
    back: 'Quay lại',
    home: 'Trang chủ',
    search: 'Tìm kiếm',
    filter: 'Lọc',
    save: 'Lưu',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    
    // HomePage
    appTitle: 'Cực Quang Chuyển Phát',
    appSubtitle: 'Aurora Express - Quản gia logistics thông minh của bạn',
    packageManagement: 'Quản lý gói hàng',
    packageManagementDesc: 'Danh sách gói hàng và quản lý đơn hàng',
    checkExpress: 'Tra cứu vận đơn',
    checkExpressDesc: 'Tra cứu và theo dõi vận đơn',
    warehouseManagement: 'Quản lý kho',
    warehouseManagementDesc: 'Quản lý nhập xuất kho',
    logisticsTracking: 'Theo dõi logistics',
    logisticsTrackingDesc: 'Thông tin logistics thời gian thực',
    todayStats: 'Dữ liệu hôm nay',
    pending: 'Chờ xử lý',
    completed: 'Hoàn thành',
    inTransit: 'Đang vận chuyển',
    systemNotice: 'Thông báo hệ thống',
    noticeContent: 'Chào mừng đến với hệ thống Cực Quang Chuyển Phát! Nhấp vào thẻ bên trên để vào các module chức năng.',
    returnHome: 'Quay về trang chủ',
    
    // PackageList
    packageList: 'Danh sách gói hàng',
    scanCode: 'Quét mã',
    all: 'Tất cả',
    notInWarehouse: 'Chưa nhập kho',
    inWarehouse: 'Đã nhập kho',
    notPacked: 'Chưa đóng gói',
    notPaid: 'Chưa thanh toán',
    notShipped: 'Chưa gửi hàng',
    shipped: 'Đã gửi hàng',
    trackingNumber: 'Mã vận đơn',
    status: 'Trạng thái',
    weight: 'Khối lượng',
    price: 'Giá',
    viewDetails: 'Xem chi tiết',
    
    // OrderDetail
    orderDetail: 'Chi tiết đơn hàng',
    basicInfo: 'Thông tin cơ bản',
    recipient: 'Người nhận',
    phone: 'Số điện thoại',
    address: 'Địa chỉ',
    orderNumber: 'Số đơn hàng',
    orderTime: 'Thời gian đặt hàng',
    packageInfo: 'Thông tin gói hàng',
    itemName: 'Tên hàng',
    quantity: 'Số lượng',
    unitPrice: 'Đơn giá',
    totalAmount: 'Tổng tiền hàng',
    shippingFee: 'Phí vận chuyển',
    finalAmount: 'Tổng thanh toán',
    paymentStatus: 'Trạng thái thanh toán',
    paid: 'Đã thanh toán',
    unpaid: 'Chưa thanh toán',
    
    // Scanner
    scanTitle: 'Quét mã vận đơn',
    scanSubtitle: 'Đưa mã vận đơn vào khung hình',
    scanButton: 'Bắt đầu quét',
    manualInput: 'Nhập thủ công',
    inputPlaceholder: 'Nhập mã vận đơn',
    
    // Status
    statusNotInWarehouse: 'Chưa nhập kho',
    statusInWarehouse: 'Đã nhập kho',
    statusNotPacked: 'Chưa đóng gói',
    statusNotPaid: 'Chưa thanh toán',
    statusNotShipped: 'Chưa gửi hàng',
    statusShipped: 'Đã gửi hàng',
  },
  
  zh: {
    // Common
    back: '返回',
    home: '首页',
    search: '搜索',
    filter: '筛选',
    save: '保存',
    cancel: '取消',
    confirm: '确认',
    
    // HomePage
    appTitle: '极光转运',
    appSubtitle: 'Aurora Express - 您的智能物流管家',
    packageManagement: '快递管理',
    packageManagementDesc: '包裹列表与订单管理',
    checkExpress: '查快递',
    checkExpressDesc: '快递查询与追踪',
    warehouseManagement: '仓库管理',
    warehouseManagementDesc: '入库出库管理',
    logisticsTracking: '物流追踪',
    logisticsTrackingDesc: '实时物流信息',
    todayStats: '今日数据',
    pending: '待处理',
    completed: '已完成',
    inTransit: '运输中',
    systemNotice: '系统公告',
    noticeContent: '欢迎使用极光转运系统！点击上方卡片进入各个功能模块。',
    returnHome: '返回首页',
    
    // PackageList
    packageList: '包裹列表',
    scanCode: '扫码',
    all: '全部',
    notInWarehouse: '未入库',
    inWarehouse: '已入库',
    notPacked: '未打包',
    notPaid: '未付款',
    notShipped: '未发货',
    shipped: '已发货',
    trackingNumber: '运单号',
    status: '状态',
    weight: '重量',
    price: '价格',
    viewDetails: '查看详情',
    
    // OrderDetail
    orderDetail: '订单详情',
    basicInfo: '基本信息',
    recipient: '收件人',
    phone: '电话',
    address: '地址',
    orderNumber: '订单号',
    orderTime: '下单时间',
    packageInfo: '包裹信息',
    itemName: '商品名称',
    quantity: '数量',
    unitPrice: '单价',
    totalAmount: '商品总额',
    shippingFee: '运费',
    finalAmount: '实付金额',
    paymentStatus: '支付状态',
    paid: '已支付',
    unpaid: '未支付',
    
    // Scanner
    scanTitle: '扫描运单号',
    scanSubtitle: '将运单号放入框内',
    scanButton: '开始扫描',
    manualInput: '手动输入',
    inputPlaceholder: '请输入运单号',
    
    // Status
    statusNotInWarehouse: '未入库',
    statusInWarehouse: '已入库',
    statusNotPacked: '未打包',
    statusNotPaid: '未付款',
    statusNotShipped: '未发货',
    statusShipped: '已发货',
  },
  
  en: {
    // Common
    back: 'Back',
    home: 'Home',
    search: 'Search',
    filter: 'Filter',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    
    // HomePage
    appTitle: 'Aurora Express',
    appSubtitle: 'Your Smart Logistics Manager',
    packageManagement: 'Package Management',
    packageManagementDesc: 'Package list and order management',
    checkExpress: 'Track Express',
    checkExpressDesc: 'Express tracking and inquiry',
    warehouseManagement: 'Warehouse Management',
    warehouseManagementDesc: 'Inbound and outbound management',
    logisticsTracking: 'Logistics Tracking',
    logisticsTrackingDesc: 'Real-time logistics information',
    todayStats: "Today's Stats",
    pending: 'Pending',
    completed: 'Completed',
    inTransit: 'In Transit',
    systemNotice: 'System Notice',
    noticeContent: 'Welcome to Aurora Express! Click the cards above to access different modules.',
    returnHome: 'Return Home',
    
    // PackageList
    packageList: 'Package List',
    scanCode: 'Scan',
    all: 'All',
    notInWarehouse: 'Not in Warehouse',
    inWarehouse: 'In Warehouse',
    notPacked: 'Not Packed',
    notPaid: 'Not Paid',
    notShipped: 'Not Shipped',
    shipped: 'Shipped',
    trackingNumber: 'Tracking Number',
    status: 'Status',
    weight: 'Weight',
    price: 'Price',
    viewDetails: 'View Details',
    
    // OrderDetail
    orderDetail: 'Order Details',
    basicInfo: 'Basic Information',
    recipient: 'Recipient',
    phone: 'Phone',
    address: 'Address',
    orderNumber: 'Order Number',
    orderTime: 'Order Time',
    packageInfo: 'Package Information',
    itemName: 'Item Name',
    quantity: 'Quantity',
    unitPrice: 'Unit Price',
    totalAmount: 'Total Amount',
    shippingFee: 'Shipping Fee',
    finalAmount: 'Final Amount',
    paymentStatus: 'Payment Status',
    paid: 'Paid',
    unpaid: 'Unpaid',
    
    // Scanner
    scanTitle: 'Scan Tracking Number',
    scanSubtitle: 'Place tracking number in the frame',
    scanButton: 'Start Scanning',
    manualInput: 'Manual Input',
    inputPlaceholder: 'Enter tracking number',
    
    // Status
    statusNotInWarehouse: 'Not in Warehouse',
    statusInWarehouse: 'In Warehouse',
    statusNotPacked: 'Not Packed',
    statusNotPaid: 'Not Paid',
    statusNotShipped: 'Not Shipped',
    statusShipped: 'Shipped',
  }
};
