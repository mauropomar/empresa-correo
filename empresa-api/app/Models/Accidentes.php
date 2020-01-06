<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Accidentes extends ApModel
{
    protected $table = 'accidentes';

    protected $fillable = ['id', 'codigo', 'fecha', 'id_trabajador', 'id_tipo_accidente', 'id_causa', 'activo',  'creado_por', 'modificado_por', 'creado', 'modificado'];

}
