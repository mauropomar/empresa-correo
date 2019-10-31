<?php

namespace App\Models;

use App\Events\ModelSaved;
use Illuminate\Database\Eloquent\Model;
use Watson\Validating\Injectors\UniqueWithInjector;
use Watson\Validating\ValidatingTrait;

/**
 * Class ApModel
 * @package App\Models
 */
class ApModel extends Model
{
   // use ValidatingTrait, UniqueWithInjector;

    protected $primaryKey = 'id';
    public $timestamps = true;

    const CREATED_AT = 'creado';
    const UPDATED_AT = 'modificado';

    /**
     * Whether the model should throw a ValidationException if it
     * fails validation. If not set, it will default to false.
     *
     * @var boolean
     */
    protected $throwValidationExceptions = true;

    protected $rules = [];

    protected $dispatchesEvents = [
        'saved' => ModelSaved::class
    ];

    protected $appends = [];

    public function dump()
    {
        dump($this->toArray());
    }

    public function setAttributeFromRelations(...$relations)
    {
        foreach ($relations as $rel){
            $this->setAttribute($rel, $this->{$rel});
        }
    }

    public function scopeModificados($query, $fechaCliente)
    {
        return $query->where(ApModel::UPDATED_AT, '>', $fechaCliente);
    }

    public function scopeActivos($query, $activo)
    {
        return $query->where(ApModel::Activo, $activo);
    }

    public function getActivoAttribute()
    {
        if($this->attributes['activo']) {
            return 1;
        }
        return 0;
    }

    public function removeEvent($event)
    {
        unset($this->dispatchesEvents[$event]);
    }
}
