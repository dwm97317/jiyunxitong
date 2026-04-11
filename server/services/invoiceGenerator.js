/**
 * PDF Invoice Generator
 * 
 * Generates professional PDF invoices using pdfkit
 */

import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate PDF invoice
 * @param {Object} invoiceData - Invoice data
 * @param {string} outputPath - Output file path
 * @returns {Promise<string>} Path to generated PDF
 */
export async function generateInvoicePDF(invoiceData, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        size: 'A4', 
        margin: 50,
        info: {
          Title: `Invoice ${invoiceData.invoice_number}`,
          Author: 'Jiyun Shipping System',
          Subject: 'Shipping Invoice'
        }
      });

      const stream = createWriteStream(outputPath);
      doc.pipe(stream);

      // Company Header
      doc.fontSize(24)
         .font('Helvetica-Bold')
         .text('JIYUN SHIPPING', 50, 50);
      
      doc.fontSize(10)
         .font('Helvetica')
         .text('Hệ thống vận chuyển quốc tế', 50, 75)
         .text('Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM', 50, 90)
         .text('Hotline: 1900-xxxx', 50, 105);

      // Invoice Title
      doc.fontSize(20)
         .font('Helvetica-Bold')
         .text('HÓA ĐƠN / INVOICE', { align: 'right' })
         .moveDown(0.5);

      // Invoice Details
      doc.fontSize(12)
         .font('Helvetica')
         .text(`Số hóa đơn: ${invoiceData.invoice_number}`, { align: 'right' })
         .text(`Ngày lập: ${new Date(invoiceData.invoice_date).toLocaleDateString('vi-VN')}`, { align: 'right' })
         .text(`Hạn thanh toán: ${new Date(invoiceData.due_date).toLocaleDateString('vi-VN')}`, { align: 'right' })
         .text(`Trạng thái: ${invoiceData.status.toUpperCase()}`, { align: 'right' });

      doc.moveDown(2);

      // Customer Info
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .text('Thông tin khách hàng', { underline: true })
         .moveDown(0.5);

      doc.fontSize(11)
         .font('Helvetica')
         .text(`Tên: ${invoiceData.customer_name || 'N/A'}`)
         .text(`SĐT: ${invoiceData.customer_phone || 'N/A'}`)
         .text(`Địa chỉ: ${invoiceData.customer_address || 'N/A'}`)
         .moveDown(1);

      // Order Info
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .text('Thông tin đơn hàng', { underline: true })
         .moveDown(0.5);

      doc.fontSize(11)
         .font('Helvetica')
         .text(`Mã đơn hàng: ${invoiceData.order_id}`)
         .text(`Mã vận đơn: ${invoiceData.tracking_number || 'N/A'}`)
         .text(`Phương thức: ${invoiceData.transport_type || 'N/A'}`)
         .moveDown(1);

      // Items Table Header
      const tableTop = doc.y;
      doc.fontSize(10)
         .font('Helvetica-Bold');

      doc.text('Mô tả', 50, tableTop)
         .text('Số tiền', 350, tableTop, { align: 'right' });

      // Table Line
      doc.moveTo(50, tableTop + 15)
         .lineTo(550, tableTop + 15)
         .stroke();

      // Table Rows
      let currentY = tableTop + 25;
      doc.font('Helvetica').fontSize(10);

      const items = [
        { desc: 'Phí vận chuyển', amount: invoiceData.shipping_fee || 0 },
        { desc: 'Phí bảo hiểm (5%)', amount: invoiceData.insurance_fee || 0 },
        { desc: 'Thuế VAT (0%)', amount: invoiceData.tax_amount || 0 },
      ];

      if (invoiceData.discount_amount > 0) {
        items.push({ desc: 'Giảm giá', amount: -invoiceData.discount_amount });
      }

      items.forEach(item => {
        doc.text(item.desc, 50, currentY)
           .text(`${item.amount.toLocaleString('vi-VN')} VND`, 350, currentY, { align: 'right' });
        currentY += 20;
      });

      // Total Line
      doc.moveTo(50, currentY + 5)
         .lineTo(550, currentY + 5)
         .stroke();

      currentY += 15;
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text('TỔNG CỘNG', 50, currentY)
         .text(`${invoiceData.total_amount.toLocaleString('vi-VN')} VND`, 350, currentY, { align: 'right' });

      // Paid Amount
      currentY += 25;
      doc.fontSize(11)
         .font('Helvetica')
         .text(`Đã thanh toán: ${invoiceData.paid_amount.toLocaleString('vi-VN')} VND`)
         .text(`Còn lại: ${invoiceData.balance_due.toLocaleString('vi-VN')} VND`, { underline: true });

      // Notes
      if (invoiceData.notes) {
        currentY += 30;
        doc.fontSize(10)
           .font('Helvetica')
           .text('Ghi chú:', { underline: true })
           .text(invoiceData.notes, { indent: 10 });
      }

      // Footer
      const footerY = 750;
      doc.moveTo(50, footerY)
         .lineTo(550, footerY)
         .stroke();

      doc.fontSize(9)
         .font('Helvetica')
         .text('Cảm ơn quý khách đã sử dụng dịch vụ của Jiyun Shipping!', 50, footerY + 10, { align: 'center' })
         .text('Mọi thắc mắc vui lòng liên hệ hotline: 1900-xxxx', 50, footerY + 25, { align: 'center' });

      // Finalize PDF
      doc.end();

      stream.on('finish', () => {
        console.log(`✅ Invoice PDF generated: ${outputPath}`);
        resolve(outputPath);
      });

      stream.on('error', (error) => {
        reject(error);
      });

    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Generate invoice file path
 * @param {string} invoiceNumber
 * @returns {string} File path
 */
export function getInvoicePath(invoiceNumber) {
  const invoicesDir = join(__dirname, '..', '..', 'data', 'invoices');
  return join(invoicesDir, `${invoiceNumber}.pdf`);
}

export default generateInvoicePDF;
