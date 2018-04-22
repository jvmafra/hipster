import express from 'express';
import { ReportService }  from '../service/ReportService';
import auth from './auth';
import {ReportValidator} from '../util/ReportValidator'
var sendEmail = require('../service/MailService').sendEmail;

const router = express.Router();

/**
 * POST cadastra report
 */
router.post('/', async (req, res) => {
    const report = req.body;
    const validacao = await ReportValidator.isValid(report);
  
    if (!validacao.return) {res.status(400).json(validacao.message);}
    else{
      try {
        const data = await ReportService.registerReport(report);
        sendEmail(JSON.stringify(report));
        res.status(200).json(data);
      } catch(err) {
        res.status(400).json(err.message);
      }
    }
  
});

/**
 * GET consulta todos os reports
 */
router.get('/', async (req, res) => {
    try {
      const data = await ReportService.retrieveReports();
      res.status(200).json(data);
    } catch(err) {
      res.status(400).json(err.message);
    }
});

/**
 * DELETE todos os reports
 */
router.delete('/', async (req, res) => {
    try {
      const data = await ReportService.removeReports();
      res.status(200).json(data);
    } catch(err) {
      res.status(400).json(err.message);
    }
});

/**
 * GET consulta uma report especifico
 */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const data = await ReportService.retrieveReport(id);
      res.status(200).json(data);
    } catch(err) {
      res.status(400).json(err.message);
    }
});

/**
 * DELETE reports pelo id
 */
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const data = await ReportService.removeReport(id);
      res.status(200).json(data);
    } catch(err) {
      res.status(400).json(err.message);
    }
  });

module.exports = router;