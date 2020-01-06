<?php

namespace App\Http\Controllers;

use App\Models\Accidentes;
use App\Clases\Estado;
use App\Models\Cargos;
use App\Models\Trabajadores;
use Illuminate\Http\Request;

class AccidentesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Obtener Actividades
     *
     * @param string $id identificador del cargo a obtener
     *
     * @return \Illuminate\Http\JsonResponse contiene los datos y estado de la respuesta;
     */
    public function obtener($id)
    {
        $accidente = Accidentes::where('id', $id)->first();
        $idtrabajador = $accidente->id_trabajador;
        $trabajador = Trabajadores::where('id', $idtrabajador)->first();
        $accidente['trabajador'] = $trabajador->nombre;
        $idcargo = $trabajador->id_cargo;
        $cargo = Cargos::where('id', $idcargo)->first();
        $accidente['id_cargo'] = $idcargo;
        $accidente['cargo'] = $cargo->nombre;
        return $this->json(true, $accidente, "", Estado::OK);
    }

    public function obtenerTodas($activo)
    {
        $accidentes = Accidentes::activos($activo , 10);
        foreach ($accidentes as $p) {
            $idtrabajador = $p['id_trabajador'];
            $trabajador = Trabajadores::where('id', $idtrabajador)->first();
            $p['trabajador'] = $trabajador->nombre;
            $p['edad'] = $trabajador->edad;
            $p['sexo'] = $trabajador->sexo;
            $p['imagen'] = json_decode($trabajador->imagen);
            $p['tipo'] = $this->getNombreTipoAccidente($p['id_tipo_accidente']);
            $p['causa'] = $this->getNombreCausa($p['id_causa']);
            $idcargo = $trabajador->id_cargo;
            $cargo = Cargos::where('id', $idcargo)->first();
            $p['cargo'] = $cargo->nombre;
        }
        return $this->json(true, $accidentes->toArray());
    }

    public function verificarCodigo(Request $peticion, $id){
        $codigo = $peticion->get('codigo');
        if($id === null) {
            $result = Accidentes::where('codigo', $codigo)->first();
        }else{
            $result = Accidentes::where('codigo', $codigo)->where('id', '<>', $id )->first();
        }
        if(!is_null($result)){
            return true;
        }
        return false;
    }

    public function verificarCodigoTrabajador(Request $peticion, $id){
        $id_trabajador = $peticion->get('id_trabajador');
        $codigo = $peticion->get('codigo');
        if($id === null) {
            $result = Accidentes::where('codigo', $codigo)->where('id_trabajador', $id_trabajador)->first();
        }else{
            $result = Accidentes::where('codigo', $codigo)->where('id_trabajador', $id_trabajador)->where('id', '<>', $id )->first();
        }
        if(!is_null($result)){
            return true;
        }
        return false;
    }

    public function verificarTrabajadorFecha(Request $peticion, $id){
        $id_trabajador = $peticion->get('id_trabajador');
        $fecha = $peticion->get('fecha');
        if($id === null) {
            $result = Accidentes::where('id_trabajador', $id_trabajador)->where('fecha', $fecha)->first();
        }else{
            $result = Accidentes::where('id_trabajador', $id_trabajador)->where('fecha', $fecha)->where('id', '<>', $id )->first();
        }
        if(!is_null($result)){
            return true;
        }
        return false;
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function crear(Request $peticion)
    {
        $result = $this->verificarCodigo($peticion, null);
        if($result){
            $mensaje = __('Ya existe un accidente con ese código.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $result = $this->verificarTrabajadorFecha($peticion, null);
        if($result){
            $mensaje = __('Ya existe un accidente con ese trabajador en la misma fecha.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $result = $this->verificarCodigoTrabajador($peticion, null);
        if($result){
            $mensaje = __('Ya existe un accidente para ese trabajador con ese mismo código.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $accidente = Accidentes::create($peticion->all());
        $mensaje = __('El accidente ha sido creado satisfactoriamente');
        return $this->json(true, $accidente, $mensaje, Estado::CREADO);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Actividades  $accidentes
     * @return \Illuminate\Http\Response
     */
    public function editar(Request $peticion, $id)
    {
        $result = $this->verificarCodigo($peticion, $id);
        if($result){
            $mensaje = __('Ya existe una accidente con ese código.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $result = $this->verificarTrabajadorFecha($peticion, $id);
        if($result){
            $mensaje = __('Ya existe un accidente con ese trabajador en la misma fecha.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $result = $this->verificarCodigoTrabajador($peticion, $id);
        if($result){
            $mensaje = __('Ya existe un accidente para ese trabajador con ese mismo código.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $this->validate($peticion, ['codigo' => 'required']);
        Accidentes::findOrFail($id)->update($peticion->all());
        $datos = $peticion->all();
        $datos['id'] = $id;
        $mensaje = __('El accidente ha sido modificado satisfactoriamente');
        return $this->json(true, $datos, $mensaje, Estado::MODIFICADO);
    }

    public function eliminar($id)
    {
        $accidente = Accidentes::find($id);
        if($accidente) {
            $accidente->delete();
        }
        $mensaje = __('El accidente ha sido borrada satisfactoriamente');
        return $this->json(true, [], $mensaje, Estado::OK);
    }

    public function getNombreTipoAccidente($id)
    {
        $nombre = 'Simple';
        if($id == 2){
            $nombre = 'Mortal';
        }
        if($id == 3){
            $nombre = 'Múltiple';
        }
        return $nombre;
    }

    public function getNombreCausa($id)
    {
        $nombre = 'Técn.';
        if($id == 2){
            $nombre = 'Org.';
        }
        if($id == 3){
            $nombre = 'Cond.';
        }
        return $nombre;
    }
}
