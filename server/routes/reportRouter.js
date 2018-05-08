import express from 'express';
import { ReportService }  from '../service/ReportService';
import {ReportValidator} from '../util/ReportValidator'
import {EmailService} from "../service/EmailService";


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
        EmailService.sendReportMail(JSON.stringify(report));
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
 * GET consulta um report especifico
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

module.exports = router;
