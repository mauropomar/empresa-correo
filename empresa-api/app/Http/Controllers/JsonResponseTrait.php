<?php
/**
 * Created by PhpStorm.
 * User: Tony
 * Date: 25/10/2018
 * Time: 10:47 PM
 */

namespace App\Http\Controllers;

use App\Clases\Estado;
use Illuminate\Http\JsonResponse;

trait JsonResponseTrait
{
    /**
     * Para estandarizar las salidas JSON, todas los metodos en las controladoras y middlewares deben usar este metodo.
     * devuelve la respuesta con el formato:
     * {"success" : true|false, "msg" : mensaje, "data" : datos}
     *
     * @param bool   $success   Indica exito o fracaso de la ejecucion(true => satisfactorio, false => accion no
     *                          realizada o insatisfactoria

     * @param array  $datos     Datos que se enviaran al cliente
     * @param string $mensaje   Mensaje a mostrar al cliente
     * @param int    $codEstado Codigo de estado de la ejecucion.
     *
     * @return JsonResponse Respuesta enviada al cliente
     */
    public function json($success = true, $datos = [], $mensaje = '', $codEstado = Estado::OK)
    {
        $response = ['success' => $success, 'msg' => __($mensaje), 'data' => $datos];

        return response()->json($response, $codEstado);
    }

    public function jsonEstadoCreado($datos = [])
    {
        return $this->json(true, $datos, '', Estado::CREADO);
    }

    public function jsonEstadoModificado($datos = [])
    {
        return $this->json(true, $datos, '', Estado::MODIFICADO);
    }

    public function jsonEstadoOK($datos = [])
    {
        return $this->json(true, $datos, '', Estado::OK);
    }
}
