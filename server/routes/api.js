import express from 'express';
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
  res.status(200).json(await UsuarioService.consultaUsuario(username));
});


/**
 * POST cadastra usuário
 */
router.post('/v1/usuario', async (req, res) => {
  const usuario = req.body;
  try {
    const data = await UsuarioService.registerUser(usuario);
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err.message);
  }
});

/**
 * PUT autentica usario
 */
// router.put('/login', async (req, res) => {
//   const usuario = req.body;
//   const username = req.params.username;
//   const password = req.params.password;
//   try {
//     const retorno = await UsuarioService.autenticaUsuario(username, password);
//     res.status(200).json(retorno);
//   } catch(err) {
//     console.log(err)
//     res.status(404).json(err.message);
//   }
// });

router.post('/login', auth.login);


/**
 * PUT edita usuário
 */
router.put('/v1/usuario/:username', async (req, res) => {
  const usuario = req.body;
  const username = req.params.username;
  try {
    const retorno = await UsuarioService.editaUsuario(username, usuario);
    res.status(200).json(retorno);
  }catch(err) {
    console.log(err)
    res.status(404).json(err.message);
  }
});

module.exports = router;

