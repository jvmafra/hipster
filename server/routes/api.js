import express from 'express';
import {UserValidator} from '../util/UserValidator'
import { UsuarioService }  from '../service/UsuarioService';
import { PublicationService }  from '../service/PublicationService';
import auth from './auth';
import token from '../service/tokenService';
/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */

const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works!');
});

/**
 * @FIXME cada conjunto de rotas deverá ser extraido desse documento
 * para ser criado seus respectivos documentos de acordo com o módulo
 * ao qual pertence. Por exemplo: userRote.js (todas as rotas de usuario)
 */

/**
 * GET consulta todos os usuários
 *
 * @FIXME rota de teste, deverá ser desativada
 */
router.get('/v1/usuario', async (req, res) => {
  res.status(200).json(await UsuarioService.consultaUsuarios());
});

/**
 * GET consulta usuário por username
 */
router.get('/v1/usuario/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const retorno = await UsuarioService.consultaUsuario(username);
    res.status(200).json(retorno);
  } catch (err){
    res.status(400).json(err.message);
  }
});


/**
 * POST cadastra usuário
 */
router.post('/usuario', async (req, res) => {
  const usuario = req.body;
  try {
    const data = await UsuarioService.registerUser(usuario);
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err.message);
  }
});

router.post('/login', auth.login);

/**
 * PUT edita usuário
 */
router.put('/v1/usuario', async (req, res) => {
  const usuario = req.body;

  let result;
  let validacao;
  validacao = UserValidator.isValid(usuario);
  result = validacao.retorno;

  if (!result) res.status(400).json(validacao.mensagem);
  else{
    const username = token.getUsername(req);
    try {
      const retorno = await UsuarioService.editaUsuario(username, usuario);
      res.status(200).json(retorno);
    }catch(err) {
      res.status(400).json(err.message);
    }
  }
});

/**
 * DELETE remove usuário
 */
router.delete('/v1/usuario', async (req, res) => {
  const username = token.getUsername(req);

  try {
    const retorno = await UsuarioService.removeUsuario(username);
    res.status(200).json(retorno);
  } catch(err) {
    res.status(400).json(err.message);
  }
});

router.get('/v1/search', async (req, res) => {
  const query = req.query;

  try {
    const dataP = await PublicationService.searchByText(query);
    const dataU = await UsuarioService.searchByText(query);
    const data = dataU.concat(dataP)

    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
