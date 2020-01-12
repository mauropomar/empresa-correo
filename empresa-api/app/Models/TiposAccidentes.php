<?php

namespace App;

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class TiposAccidentes extends ApModel
{
    protected $table = 'tipos_accidentes';

    protected $fillable = ['id','nombre', 'descripcion', 'activo',  'creado_por', 'modificado_por', 'creado', 'modificado'];

}
