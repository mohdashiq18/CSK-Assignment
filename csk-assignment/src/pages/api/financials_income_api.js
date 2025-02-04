import Handler from '@/utils/handelFileUPload';
export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req, res) {

  if (req.method === 'POST') {
    await Handler(req, res, "financial_income");
  } else if (req.method === 'GET') {
    await Handler(req, res, "financial_income");

  } else {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
