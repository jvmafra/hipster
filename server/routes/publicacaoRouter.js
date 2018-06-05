import express from 'express';
import { PublicationService }  from '../service/PublicationService';
import auth from './auth';
import {PublicationValidator} from '../util/PublicationValidator'
import token from '../service/tokenService';

const router = express.Router();

/**
 * GET consulta todas publicaçoes. Essa consulta pode ter params de: ordenação e fitler
 */
router.get('/', async (req, res) => {
  const query = req.query;

  try {
    const username = token.getUsername(req)
    const data = await PublicationService.search(query, username);
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err.message);
  }
});

/**
 * GET consulta todas publicaçoes por text. Essa consulta pode ter params de: ordenação e fitler
 */
router.get('/searchByText', async (req, res) => {
  const query = req.query;

  try {
    const username = token.getUsername(req)
    const data = await PublicationService.searchByText(query, username);
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err.message);
  }
});
/**
 * GET consulta uma publicacao especifica
 */
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const query = req.query;

  try {
    const data = await PublicationService.retrievePublication(id, query);
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err.message);
  }
});

/**
 * GET consulta todas publicaçoes de um usuário
 */
router.get('/user/:username', async (req, res) => {
  const query = req.query;

  try {
    const data = await PublicationService.retrieveUserPublications(ownerUsername);
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
    const data = await PublicationService.removePublications();
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err.message);
  }
});

/**
 * DELETE publicação pelo id
 */
router.delete('/:id', async (req, res) => {
  const publicationID = req.params.id;
  try {
    const data = await PublicationService.removePublication(publicationID);
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err.message);
  }
});

/**
 * POST cadastra publicacao
 */
router.post('/', async (req, res) => {
  const publication = req.body;
  const validacao = await PublicationValidator.isValid(publication);

  if (!validacao.return) {res.status(400).json(validacao.message);}
  else{
    try {
      const username = token.getUsername(req);
      const data = await PublicationService.registerPublication(publication, username);
      res.status(200).json(data);
    } catch(err) {
      res.status(400).json(err.message);
    }
  }

});

/**
 * PUT edita publicacao pelo id
 */
router.put('/:id', async (req, res) => {

  const id = req.params.id;
  const novaPublicacao = req.body;

    try {
      const retorno = await PublicationService.editPublication(id, novaPublicacao);
      res.status(200).json(retorno);
    } catch(err) {
      res.status(400).json(err.message);
    }

});

module.exports = router;
