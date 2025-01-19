import express from 'express';
import {deletemail, enterthemail, getlistmail } from '../controllers/controlmail.js';
const router =express.Router();  

// Define a basic route
router.post('',enterthemail);
router.get('',getlistmail)
router.delete('/:mail',deletemail)

export default router;