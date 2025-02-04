
import formidable from 'formidable';
import * as XLSX from 'xlsx';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, 
  },
};



export default async function Handler(req, res,jsonFileName) {
    const dataFilePath = path.join(process.cwd(), 'data', `${jsonFileName}.json`);
  if (req.method === 'POST') {
    try {
      const form = formidable({
        uploadDir: './tmp', 
        keepExtensions: true,
        multiples: false, 
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing file:', err);
          return res.status(500).json({ success: false, error: 'File parsing error' });
        }

        if (!files.file || !files.file[0]) {
          return res.status(400).json({ success: false, error: 'No file uploaded' });
        }

        const file = files.file[0];
        const filePath = file.filepath;

        try {
          const fileBuffer = await fs.readFile(filePath);
          const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

          const sheetName = workbook.SheetNames[0];
          const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

          await fs.writeFile(dataFilePath, JSON.stringify(excelData, null, 2));

          await fs.unlink(filePath);

          return res.status(200).json({ success: true, message: 'File uploaded and data saved' });
        } catch (fileError) {
          console.error('Error reading Excel file:', fileError);
          return res.status(500).json({ success: false, error: 'Error reading the Excel file' });
        }
      });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }  else if (req.method === 'GET') {
      try {
        try {
          await fs.access(dataFilePath);
        } catch (err) {
          return res.status(404).json({ success: false, error: 'No data found' });
        }
  
        const data = await fs.readFile(dataFilePath, 'utf8');
        const jsonData = JSON.parse(data);
  
        return res.status(200).json({ success: true, data: jsonData });
      } catch (error) {
        console.error('Error reading data file:', error);
        return res.status(500).json({ success: false, error: 'Error reading the data file' });
      }
    } else {
      return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
}



