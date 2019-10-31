<?php


namespace App\Scopes;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class ActiveScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        $builder->where('activo', true);
    }

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('activo', function ($query) {
            return $query->where('activo', true);
        });
    }
}
