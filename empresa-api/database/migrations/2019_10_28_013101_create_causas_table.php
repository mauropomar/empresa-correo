<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCausasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('causas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('abr', 10 );
            $table->string('nombre', 50 );
            $table->longText('descripcion')->nullable();
            $table->timestamp('creado')->nullable();
            $table->timestamp('modificado')->nullable();
            $table->integer('creado_por')->nullable();
            $table->integer('modificado_por')->nullable();
            $table->boolean('activo')->default(true);
        });
        DB::table('causas')->insert(array(
            'abr'=> 'Técn',
            'nombre'=> 'Técnico',
            'descripcion'=> 'Técnico',
            'creado'=> date('Y-m-d H:m:s'),
            'modificado'=> date('Y-m-d H:m:s'),
            'creado_por'=> 1,
            'modificado_por'=> 1,
            'activo'=> true
        ));
        DB::table('causas')->insert(array(
            'abr'=> 'Org.',
            'nombre'=> 'Orgánico',
            'descripcion'=> 'Orgánico',
            'creado'=> date('Y-m-d H:m:s'),
            'modificado'=> date('Y-m-d H:m:s'),
            'creado_por'=> 1,
            'modificado_por'=> 1,
            'activo'=> true
        ));
        DB::table('causas')->insert(array(
            'abr'=> 'Cond.',
            'nombre'=> 'Condicionado',
            'descripcion'=> 'Condicionado',
            'creado'=> date('Y-m-d H:m:s'),
            'modificado'=> date('Y-m-d H:m:s'),
            'creado_por'=> 1,
            'modificado_por'=> 1,
            'activo'=> true
        ));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('causas');
    }
}
