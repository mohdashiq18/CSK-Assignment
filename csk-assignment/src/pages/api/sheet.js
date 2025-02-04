import { addSheetData } from "../../utils/googleSheet";

export default async function handler(req, res) {
  try {
if(req.method === "POST") {
        const { name, email, message,phone,quantity,intrest } = req.body;
    
        try {
          await addSheetData([name, email,phone,quantity, message,intrest]);
          res.status(200).json({ message: "Data Successfully Add " });
        } catch (error) {
          res.status(500).json({ error: "Error: " + error.message });
        }
      } else {
        res.status(405).json({ error: "Only Post Method Required" });
      }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to load data" });
  }
}
