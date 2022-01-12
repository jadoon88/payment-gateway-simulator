<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentGatewayController;
use App\Http\Controllers\OrderController;
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

Route::resource('gateways', PaymentGatewayController::class);
Route::resource('orders', OrderController::class);

Route::get('fake-order', function () {

    $order = Order::factory()->create();
    return $order;
});



Route::get('ratio-simulation', function () {

    //$order = factory(App\Models\Order::class)->make();

    
    $ratios = Helper::get_gateway_ratios_array();
    $ratios_sorted_by_priority = $ratios;

    arsort($ratios_sorted_by_priority);

    Setting::updateOrCreate(
        [
            'key' =>"ratios_sorted_by_priority"
        ],
        [
        'key' =>"ratios_sorted_by_priority",
        'value' =>json_encode($ratios_sorted_by_priority),
        ]
    );
    Setting::updateOrCreate(
        [
            'key' =>"ratios_sorted_by_priority_master"
        ],
        [
        'key' =>"ratios_sorted_by_priority_master",
        'value' =>json_encode($ratios_sorted_by_priority),
        ]
    );

   // $ratios_sorted_by_priority_master = $ratios_sorted_by_priority;
    

    //dd($ratios_sorted_by_priority);
    //Assigning first order

    $orders= array();

    $orders_count = 0;

    while (true) {

        $current_payment_gateway_key = "";
        $current_payment_gateway_value = "";

        $ratios_sorted_by_priority = 
        Setting::where("key", "ratios_sorted_by_priority")
        ->first()->toArray();

        $ratios_sorted_by_priority=json_decode($ratios_sorted_by_priority["value"], true);

        //dd($ratios_sorted_by_priority);

        foreach ($ratios_sorted_by_priority as $key => $value){

            $current_payment_gateway_key = $key;
            $current_payment_gateway_value = intVal($value);
            break;
        }
        if($current_payment_gateway_value > 0)
        {
            echo "current payment gateway value:".$current_payment_gateway_value."<br>";
            //Adding the order
            array_push($orders, $current_payment_gateway_key);
            $orders_count++;
            $current_payment_gateway_value--;
            echo "current payment gateway value after decreament:".$current_payment_gateway_value."<br>";
            echo "orders count:".$orders_count."<br>";
            $ratios_sorted_by_priority[$current_payment_gateway_key] = $current_payment_gateway_value;

            Setting::updateOrCreate(
                [
                    'key' =>"ratios_sorted_by_priority"
                ],
                [
                'key' =>"ratios_sorted_by_priority",
                'value' =>json_encode($ratios_sorted_by_priority),
                ]
            );


        }
        else{

            unset($ratios_sorted_by_priority[$current_payment_gateway_key]);
            Setting::updateOrCreate(
                [
                    'key' =>"ratios_sorted_by_priority"
                ],
                [
                'key' =>"ratios_sorted_by_priority",
                'value' =>json_encode($ratios_sorted_by_priority),
                ]
            );
        }
        print_r($ratios_sorted_by_priority);

        if(empty($ratios_sorted_by_priority))
        {
            echo "array is empty";
            $ratios_sorted_by_priority = $ratios_sorted_by_priority_master;
            Setting::updateOrCreate(
                [
                    'key' =>"ratios_sorted_by_priority"
                ],
                [
                'key' =>"ratios_sorted_by_priority",
                'value' =>json_encode($ratios_sorted_by_priority_master),
                ]
            );
        }
        

        if($orders_count == 3)
        {
            break;
        }


      }

      dd($orders);

    



});
