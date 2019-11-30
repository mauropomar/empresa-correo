<?php

namespace App\Http\Controllers;

use App\Models\Cargos;
use App\Clases\Estado;
use App\Models\Actividades;
use App\Models\Trabajadores;
use App\Models\TrabajadoresCargos;
use Illuminate\Http\Request;

class TrabajadoresController extends Controller
{

    public function obtener($id)
    {
        $trabajador = Trabajadores::findOrFail($id, ['id', 'codigo', 'id_cargo', 'nombre', 'apellidos', 'imagen', 'sexo', 'edad', 'activo']);
        $trabajador['imagen'] = json_decode($trabajador['imagen']);
        return $this->json(true, $trabajador, "", Estado::OK);
    }


    public function obtenerTodas($activo)
    {
        $trabajadores = Trabajadores::activos($activo, 200);
        foreach ($trabajadores as $p) {
            $p['imagen'] = json_decode($p['imagen']);
            $idcargo = $p->id_cargo;
            $cargo = Cargos::where('id', $idcargo)->first();
            $p['cargo'] = $cargo->nombre;
        }
        return $this->json(true, $trabajadores->toArray());
    }

    public function obtenerPorTrabajador(Request $peticion)
    {
        $idtrabajador = $peticion->get("idtrabajador");
        $idcargo = $peticion->get("idcargo");
        $actividades = Actividades::where('id_cargo', $idcargo)->where('activo', 1)->get();
        foreach ($actividades as $p) {
            $existe = TrabajadoresCargos::where('id_trabajador', $idtrabajador)->where('id_cargo', $idcargo)->where('id_actividad', $p['id'])->exists();
            $p['select'] = $existe;
        }
        return $this->json(true, $actividades->toArray());
    }

    public function encodeImage($file)
    {
        //  $imagen = $file.strpos('empty');

        $imagen = json_encode($file);
        return $imagen;
    }

    public function verificar(Request $peticion, $id)
    {
        $codigo = $peticion->get('codigo');
        if ($id === null) {
            $result = Trabajadores::where('codigo', $codigo)->first();
        } else {
            $result = Trabajadores::where('codigo', $codigo)->where('id', '<>', $id)->first();
        }
        if (!is_null($result)) {
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
        if ($result) {
            $mensaje = __('Ya existe un trabajador con ese código.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $peticion['imagen'] = $this->encodeImage($peticion->get('imagen'));
        $trabajador = Trabajadores::create($peticion->all());
        $actividades = $peticion->get('actividades');
        $idtrabajador = $trabajador['id'];
        $this->updateTrabajadorCargo($peticion, $idtrabajador);
        $mensaje = __('El trabajador ha sido creado satisfactoriamente');
        return $this->json(true, $trabajador, $mensaje, Estado::CREADO);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Actividades $actividades
     * @return \Illuminate\Http\Response
     */
    public function editar(Request $peticion, $id)
    {
        $result = $this->verificar($peticion, $id);
        if ($result) {
            $mensaje = __('Ya existe un trabajador con ese código.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $this->validate($peticion, ['nombre' => 'required']);
        $peticion['imagen'] = $this->encodeImage($peticion->get('imagen'));
        Trabajadores::findOrFail($id)->update($peticion->all());
        $datos = $peticion->all();
        $this->updateTrabajadorCargo($peticion, $id);
        $mensaje = __('El trabajador ha sido modificado satisfactoriamente');
        return $this->json(true, $datos, $mensaje, Estado::MODIFICADO);
    }

    public function updateTrabajadorCargo($peticion, $id){
        $actividades = $peticion->get('actividades');
        $idcargo = $peticion->get("id_cargo");
        $trabcargo = TrabajadoresCargos::where('id_trabajador', $id)->delete();
        foreach ($actividades as $act) {
            $trabcargo = new TrabajadoresCargos();
            if($act['select'] === true) {
                $trabcargo->fill([
                    'id_trabajador' => $id,
                    'id_cargo' => $idcargo,
                    'id_actividad' => $act['id'],
                    'creado_por' => 1,
                    'modificado_por' => 1
                ]);
                $trabcargo->save();
            }
        }
    }


    public function eliminar($id)
    {
        $trabajador = Trabajadores::find($id);
        if ($trabajador) {
            $trabajador->activo = false;
            $trabajador->save();
        }
        $mensaje = __('El trabajador ha sido borrado satisfactoriamente');
        return $this->json(true, [], $mensaje, Estado::OK);
    }


}
