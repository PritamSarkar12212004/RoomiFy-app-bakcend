import {
  searchMain,
  searchFilter,
  searchNearby,
  searchDirectMain
} from "../../controllers/Univarsal/SearchController.js";
import express from "express";
const router = express.Router();
router.post("/search/main", searchMain);
router.post("/search/direct", searchDirectMain);
router.post("/search/filter", searchFilter);
router.post("/search/nearby", searchNearby);
export default router;
