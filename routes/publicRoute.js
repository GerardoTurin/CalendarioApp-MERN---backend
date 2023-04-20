import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";




const publicRoute = Router();



publicRoute.get("*", (req, res) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    res.sendFile(path.join(__dirname, "../public/index.html"));
});



export { publicRoute }