import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";
import { pool } from "../config/DbConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function addLine(doc, text = "") {
  doc.text(text, { width: 520 });
}

async function main() {
  const [students] = await pool.query(
    `SELECT id, name, phone
     FROM student
     ORDER BY id ASC`
  );

  const [admins] = await pool.query(
    `SELECT id, name, phone
     FROM admin
     ORDER BY id ASC`
  );

  const outputPath = path.resolve(__dirname, "../../credentials-report.pdf");
  const doc = new PDFDocument({ margin: 40, size: "A4" });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  doc.fontSize(18).text("Credentials Report", { align: "center" });
  doc.moveDown(0.5);
  doc.fontSize(10).text(`Generated at: ${new Date().toISOString()}`, { align: "center" });
  doc.moveDown(1.2);

  doc.fontSize(14).text("Admin Credentials");
  doc.moveDown(0.5);
  doc.fontSize(11);
  addLine(doc, "Common admin password: admin123");
  addLine(doc);
  admins.forEach((admin, index) => {
    addLine(
      doc,
      `${index + 1}. Name: ${admin.name} | Username (Phone): ${admin.phone} | Password: admin123`
    );
  });

  doc.moveDown(1.2);
  doc.fontSize(14).text("Student Credentials");
  doc.moveDown(0.5);
  doc.fontSize(11);
  addLine(doc, "Common student password: student123");
  addLine(doc);
  students.forEach((student, index) => {
    addLine(
      doc,
      `${index + 1}. Name: ${student.name} | Username (Phone): ${student.phone} | Password: student123`
    );
  });

  doc.moveDown(1.2);
  doc.fontSize(10);
  addLine(doc, "Handle this file as sensitive data.");

  doc.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  await pool.end();
  console.log(`Credentials PDF saved to: ${outputPath}`);
}

main().catch(async (error) => {
  console.error("Failed to export credentials PDF:", error.message);
  try {
    await pool.end();
  } catch {}
  process.exit(1);
});
