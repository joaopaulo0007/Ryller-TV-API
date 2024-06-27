const express=require('express')
const router=express.Router()
import { getTimes,getStatisticas } from "./controllers"
router.post('/user/search',getTimes)
router.post('/user/search/statistics',getStatisticas)

export default router