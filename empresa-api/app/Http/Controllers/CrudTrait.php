<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequestWithTags;
use App\Models\ApModel;
use Illuminate\Http\Request;

/**
 * Trait CrudTrait
 * Realiza las operaciones de insertar, actualizar y eliminar un modelo a partir de un request
 * @package App\Http\Controllers
 */
trait CrudTrait
{
    /**
     * Asigna al modelo los atributos del request ($model::fill) y ejecuta $model::saveOrFail
     *
     * @param Request $request
     * @param ApModel $model
     * @return ApModel
     * @throws \Throwable
     */
    public function fillAndSave(Request $request, ApModel $model)
    {
        $model->fill($request->all());
        $model->saveOrFail();

        return $model;
    }

    /**
     * Asigna al modelo los atributos del request ($model::fill) y ejecuta $model::saveOrFail
     * y asigna las etiquetas
     *
     * @param Request $request
     * @param ApModel $model
     * @param $tagType
     * @return ApModel
     * @throws \Throwable
     */
    public function fillAndSaveWithTags(RequestWithTags $request, ApModel $model, $tagType)
    {
        $tags = $request->tags();

        $model = $this->fillAndSave($request, $model);

        if ($request->has('tags')) {
            $model->syncTagsWithType($tags, $tagType);
        }

        return $model;
    }
}
