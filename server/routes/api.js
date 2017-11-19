import express from 'express';
import {UsuarioService}  from '../service/UsuarioService';


const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works!');
});

router.get('/cerveja', (req, res) => {

  res.send('vamos beber!');
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
router.get('/usuario', async (req, res) => {
  res.status(200).json(await UsuarioService.consultaUsuarios());
});

/**
 * GET consulta usuário por username
 */
router.get('/usuario/:username', async (req, res) => {
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
    const retorno = await UsuarioService.cadastraUsuario(usuario);
    res.status(200).json(retorno);
  }catch(err) {
    res.status(400).json(err.message);
  }
});

/**
 * PUT edita usuário
 */
router.put('/usuario/:username', async (req, res) => {
  const usuario = req.body;
  const username = req.params.username;
  try {
    const retorno = await UsuarioService.editaUsuario(username, usuario);
    res.status(200).json(retorno);
  }catch(err) {
    res.status(400).json(err.message);
  }
});

/**
 * DELETE remove usuário
 */
router.delete('/usuario/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const retorno = await UsuarioService.removeUsuario(username);
    res.status(200).json(retorno);
  } catch(err) {
    res.status(400).json(err.message);
  }

});


module.exports = router;
