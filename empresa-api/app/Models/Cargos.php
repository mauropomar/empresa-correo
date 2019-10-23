<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cargos extends Model
{
    protected $attributes = [
        'creado_por' => 1,
        'modificado_por' => 1,
    ];

    protected $table = 'cargos';

    protected $fillable = ['id','nombre', 'descripcion', 'activo',  'creado_por', 'modificado_por'];
}
