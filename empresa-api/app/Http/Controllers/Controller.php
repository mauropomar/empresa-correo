<?php

namespace App\Http\Controllers;

use App\Clases\Estado;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, JsonResponseTrait;
    const LIMITE_REGISTROS = 50000;

    /**
     * Para estandarizar las salidas JSON, todas los metodos en las controladoras y middlewares deben usar este metodo.
     * Se hace estatico para que pueda ser utilizado desde los middlewares
     *
     * @param bool $success Indica exito o fracaso de la ejecucion(true => satisfactorio, false => accion no
     *                          realizada
     * @param array $datos Datos que se enviaran al cliente
     * @param string $mensaje Describe el estado de la ejecucion
     * @param int $codEstado Codigo de estado de la ejecucion.
     *
     * @return JsonResponse Respuesta enviada al cliente
     */
    public static function json($success = true, $datos = [], $mensaje = '', $codEstado = Estado::OK)
    {
        // $datos puede ser una TablaIplus
        if ($datos instanceof ITablaIplus) {
            $datos = $datos->obtener();
        }

        $response = ['success' => $success, 'msg' => __($mensaje), 'data' => $datos];

        if (self::isPaginateData($datos)) {
            $datos['success'] = $success;
            $datos['msg'] = $mensaje;
            $response = $datos;
        }
        return response()->json($response, $codEstado);
    }

    /**
     * Determina si son datos paginados.
     *
     * @param mixed $data
     *
     * @return bool
     */
    public static function isPaginateData($data)
    {
        if ($data instanceof LengthAwarePaginator) {
            return true;
        }
        if (is_array($data)) {
            $paginateKeys = ['total', 'data', 'from', 'per_page'];
            $dataKeys = array_keys($data);
            $total = count(array_intersect($paginateKeys, $dataKeys));

            return ($total == count($paginateKeys));
        }
        return false;
    }

    public function upload($peticion, $folder, $field = 'imagen')
    {
        $nombre = $this->getStringAleatorio(10);
        $imagen = $peticion->get($field);
        $path = $imagen;
        $pos = strpos($imagen, 'data');
        if ($pos !== false) {
            /* $exploded = explode(',', $peticion->get('imagen'));
            $decode = base64_decode($exploded[1]);
            if (str_contains($exploded[0], 'jpeg'))
                $extension = 'jpg';
            else
                $extension = 'png';
            $fileName = $nombre . '.' . $extension;
            Storage::disk('public')->put($folder.$fileName, $decode);
            $path = Storage::disk('public')->url($folder.$fileName); */
        } else {
            $posy = strpos($imagen, 'silueta');
            $path = ($posy === false) ? $imagen : "";
        }
        return $path;
    }

    public function uploadImage($valorField, $folder, $field = 'imagen')
    {
        $nombre = $this->getStringAleatorio(10);
        $imagen = $valorField;
        $path = $imagen;
        $pos = strpos($imagen, 'data');
        if ($pos !== false) {
            /* $exploded = explode(',', $peticion->get('imagen'));
            $decode = base64_decode($exploded[1]);
            if (str_contains($exploded[0], 'jpeg'))
                $extension = 'jpg';
            else
                $extension = 'png';
            $fileName = $nombre . '.' . $extension;
            Storage::disk('public')->put($folder.$fileName, $decode);
            $path = Storage::disk('public')->url($folder.$fileName); */
        } else {
            $posy = strpos($imagen, 'silueta');
            $path = ($posy === false) ? $imagen : "";
        }
        return $path;
    }

    public function getStringAleatorio($n)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $n; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $randomString .= $characters[$index];
        }
        return strtolower($randomString);
    }


}
