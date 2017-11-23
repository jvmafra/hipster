import express from 'express';
import {UserValidator} from '../util/UserValidator'
import { UsuarioService }  from '../service/UsuarioService';
import auth from './auth';
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
  let queryUser = async function () {
    const retorno = await UsuarioService.consultaUsuario(username);
    res.status(200).json(retorno);
  };

  try {
    await queryUser();
  } catch (err){
    res.status(400).json(err.message);
  }
});

/**
 * POST cadastra usuário
 */
router.post('/usuario', async (req, res) => {
  const usuario = req.body;
  let registerUser = async function () {
    const data = await UsuarioService.registerUser(usuario);
    res.status(200).json(data);
  };

  try {
    await registerUser();
  } catch(err) {
    res.status(400).json(err.message);
  }
});

router.post('/login', auth.login);

/**
 * PUT edita usuário
 */
router.put('/v1/usuario/:username', async (req, res) => {
  const usuario = req.body;

  let result;
  let validacao;
  validacao = UserValidator.isValid(usuario);
  result = validacao.retorno;

  let editUser = async function () {
    const retorno = await UsuarioService.editaUsuario(username, usuario);
    res.status(200).json(retorno);
  };

  if (!result) {
    res.status(400).json(validacao.mensagem);

  } else{
    const username = req.params.username;
    try {
      await editUser();
    }catch(err) {
      res.status(400).json(err.message);
    }
  }
});

/**
 * DELETE remove usuário
 */
router.delete('/usuario/:username', async (req, res) => {
  const username = req.params.username;

  let removeUser = async function () {
    const retorno = await UsuarioService.removeUsuario(username);
    res.status(200).json(retorno);
  };

  try {
    await removeUser();
  } catch(err) {
    res.status(400).json(err.message);
  }

});


module.exports = router;
