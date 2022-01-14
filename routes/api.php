<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentGatewayController;
use App\Http\Controllers\OrderController;
use App\Http\Resources\OrderResource;
use App\Http\Resources\OrderCollection;
use App\Models\Order;
use App\Models\Setting;
use App\Helpers\Helper;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/orders-desc', function () {
    return new OrderCollection(Order::orderByDesc('id')->get());
});

Route::get('/drop-orders', function () {
    Order::query()->delete();
});



Route::resource('gateways', PaymentGatewayController::class);
Route::resource('orders', OrderController::class);

Route::get('fake-order', function () {

    $order = Order::factory()->create();
    return $order;
});
