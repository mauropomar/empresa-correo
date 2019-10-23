<?php
namespace App\Clases;

/**
 * Clase para codificar los codigos de estado de la aplicacion
 *
 * @package App\Clases
 * @autor Tony
 * @codeCoverageIgnore
 */
class Estado
{
    //codigos 200 aqui
    const OK = 200;
    const CREADO = 201;
    const ACEPTADO = 202;
    const MODIFICADO = 202;
    //codigos 400 aqui
    const NO_AUTENTICADO = 401;
    const NO_AUTORIZADO = 403;
    const NO_ENCONTRADO = 404;
    const DATOS_INVALIDOS = 422;
    //codigos 500 aqui
    const ERROR = 500;
}
