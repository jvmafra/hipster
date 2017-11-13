import express from 'express';
import {UsuarioService}  from '../service/UsuarioService';

const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/cerveja', (req, res) => {

  res.send('vamos beber');
});


router.get('/usuario/:username', (req, res) => {
  const id = req.params.id;
  // res.send(UsuarioService.consultaUsuario('gustavo.hqo@gmail.com'))
  res.send(`O id Passado foi ${id}`);
});

router.post('/usuario', async (req, res) => {
  const usuario = {
    nome: 'Gustavo Oliveira', email: 'gustavo.hqo@gmail.com',
    senha: '12345678', dataNascimento: '18/09/1990'
  };

  const retorno = await UsuarioService.cadastraUsuario(usuario);
  res.send(retorno);
});

module.exports = router;
