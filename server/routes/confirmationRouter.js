import express from 'express';
import {ConfirmationService} from "../service/ConfirmationService";
import {UsuarioService} from "../service/UsuarioService";
const router = express.Router();

router.get('/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const token = await ConfirmationService.retrieveRegistrationToken(uuid);
    let usuario = await UsuarioService.consultaUsuario(token.ownerUsername);
    const usuarioNovo = {active: true};

    await UsuarioService.editaUsuario(usuario.username, usuarioNovo);
    await ConfirmationService.deleteToken(uuid);
    res.status(200).json(token);
  } catch(err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

module.exports = router;
