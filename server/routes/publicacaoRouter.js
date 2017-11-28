import express from 'express';
import { PublicacaoService }  from '../service/PublicacaoService';
import auth from './auth';

const router = express.Router();


/**
 * GET consulta uma publicacao especifica
 */
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const data = await PublicacaoService.consultaPublicacoes(id);
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err.message);
  }
});

/**
 * GET consulta todas publicaçoes
 */
router.get('/', async (req, res) => {
  try {
    const data = await PublicacaoService.consultaPublicacao();
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err.message);
  }
});

/**
 * DELETE todas publicaçoes
 */
router.delete('/', async (req, res) => {
  try {
    const data = await PublicacaoService.removePublicacao();
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err.message);
  }
});

/**
 * POST cadastra publicacao
 */
router.post('/', async (req, res) => {
  const publicacao = req.body;
  try {
    const data = await PublicacaoService.registraPublicacao(publicacao);
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
