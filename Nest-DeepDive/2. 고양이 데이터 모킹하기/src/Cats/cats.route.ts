import { Cat, CatType } from "./cats.model";
import { Router } from 'express'
import { createCat, deleteCat, readAllcats, readCat, updateCat, updatePartialCat } from "./cats.service";

const router = Router();

// 서비스 로직과 route 분리
router.get("/cats", readAllcats);

router.get("/cats/:id", readCat);

router.post("/cats", createCat);

router.put("/cats/:id", updateCat);

router.patch("/cats/:id", updatePartialCat);

router.delete("/cats/:id", deleteCat);

// 위에서 등록된 router를 export 시켜준다.
export default router