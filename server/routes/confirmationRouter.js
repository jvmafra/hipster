import express from 'express';
import {ConfirmationService} from "../service/ConfirmationService";
import {UsuarioService} from "../service/UsuarioService";
import * as erro from '../util/ErroHandler';

const router = express.Router();

router.get('/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const token = await ConfirmationService.retrieveRegistrationToken(uuid);
    let usuario = await UsuarioService.consultaUsuario(token.ownerUsername);

    let usuariosAtivos = await UsuarioService.retrieveActivedUserByEmail(usuario.email);

    if (typeof usuariosAtivos !== 'undefined' && usuariosAtivos.length > 0) {
      throw Error(erro.CONFIRMATION.CONFIRMATION_ERROR_EMAIL); 
       
    } else {      
      const usuarioNovo = {active: true};
      UsuarioService.editaUsuario(usuario.username, usuarioNovo);
      await ConfirmationService.deleteToken(uuid);      
      
      res.status(200).json(token);
    }

  } catch(err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
