<?php
/**
 * Created by PhpStorm.
 * User: Tony
 * Date: 5/1/2019
 * Time: 07:41 PM
 */

namespace App\Models\Traits;

/**
 * Trait DeleteRelationsTrait
 * Eliminar relaciones antes de eliminar el modelo
 * @package App\Models\Traits
 */
trait DeleteRelationsTrait
{
    protected $relacionesEliminar = [];

    /**
     * @return array
     */
    public function getRelacionesEliminar(): array
    {
        return $this->relacionesEliminar;
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($model) {
            foreach ($model->getRelacionesEliminar() as $relacion) {
                $model->$relacion()->delete();
            }
        });
    }

    /**
     * Establece las relaciones a eliminar antes de eliminar el modelo
     *
     * @param array $relaciones
     * @return $this
     */
    public function deletingRelations(array $relaciones)
    {
        $this->relacionesEliminar = $relaciones;

        return $this;
    }
}
