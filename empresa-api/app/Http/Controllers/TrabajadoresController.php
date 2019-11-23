<?php

namespace App\Http\Controllers;

use App\Models\Cargos;
use App\Clases\Estado;
use App\Models\Trabajadores;
use Illuminate\Http\Request;

class TrabajadoresController extends Controller
{

    public function obtener($id)
    {
        $trabajadores = Trabajadores::findOrFail($id, ['id', 'codigo', 'nombre', 'apellidos', 'sexo', 'edad', 'activo']);
        return $this->json(true, $trabajadores, "", Estado::OK);
    }


    public function obtenerTodas($activo)
    {
        $trabajadores = Trabajadores::activos($activo , 200);
       foreach ($trabajadores as $p) {
            $idcargo =  $p->id_cargo;
            $cargo = Cargos::where('id', $idcargo)->first();
            $p['cargo'] = $cargo->nombre;
        }
        return $this->json(true, $trabajadores->toArray());
    }

    public function verificar(Request $peticion, $id){
        $nombre = $peticion->get('nombre');
        $apellidos = $peticion->get('apellidos');
        if($id === null) {
            $result = Trabajadores::where('nombre', $nombre)->where('apellidos', $apellidos)->first();
        }else{
            $result = Trabajadores::where('nombre', $nombre)->where('apellidos', $apellidos)->where('id', '<>', $id )->first();
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
        $result = $this->verificar($peticion, null);
        if($result){
            $mensaje = __('Ya existe un trabajador con ese nombre.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $actividad = Trabajadores::create($peticion->all());
        $mensaje = __('El trabajador ha sido creado satisfactoriamente');
        return $this->json(true, $actividad, $mensaje, Estado::CREADO);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Actividades  $actividades
     * @return \Illuminate\Http\Response
     */
    public function editar(Request $peticion, $id)
    {
        $result = $this->verificar($peticion, $id);
        if($result){
            $mensaje = __('Ya existe una actividad con ese nombre.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $this->validate($peticion, ['nombre' => 'required']);
        Trabajadores::findOrFail($id)->update($peticion->all());
        $datos = $peticion->all();
        $datos['id'] = $id;
        $mensaje = __('El trabajador ha sido modificado satisfactoriamente');
        return $this->json(true, $datos, $mensaje, Estado::MODIFICADO);
    }

    public function eliminar($id)
    {
        $trabajador = Trabajadores::find($id);
        if($trabajador) {
            $trabajador->activo = false;
            $trabajador->save();
        }
        $mensaje = __('El trabajador ha sido borrado satisfactoriamente');
        return $this->json(true, [], $mensaje, Estado::OK);
    }
}
