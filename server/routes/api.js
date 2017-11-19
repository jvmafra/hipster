import express from 'express';
import {UsuarioService}  from '../service/UsuarioService';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import config from '../config'

/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */


  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({message: 'Not authorized for admin access'});
    }
  }
  


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
  res.status(200).json(await UsuarioService.consultaUsuario(username));
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
    console.log(err)
    res.status(400).json(err.message);
  }
});

module.exports = router;
//module.exports = jwtCheck;
//module.exports = adminCheck;
