<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->string('shipping_address');
            $table->string('shipping_phone');
            $table->string('shipping_city');
            $table->string('shipping_country');
            $table->string('line_items');
            $table->string('total');
            $table->string('currency');
            $table->string('status');
            $table->unsignedBigInteger('payment_gateway');
            $table->foreign('payment_gateway')->references('id')->on('payment_gateways');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
