<?php

namespace App\Helpers;
use App\Models\PaymentGateway;
use App\Models\Setting;
//use App\Http\Resources\PaymentGatewayResource;

class Helper
{
    public static function get_next_payment_method_id()
    {
        $ratios = Helper::get_gateway_ratios_array();
        $ratios_sorted_by_priority = $ratios;
        arsort($ratios_sorted_by_priority);

        $recommended_payment_gateway_id=2;
        $should_return = true;

        $current_payment_gateway_key = "";
        $current_payment_gateway_value = "";

        $ratios_sorted_by_priority = 
        Setting::where("key", "ratios_sorted_by_priority")
        ->first()->toArray();


        $ratios_sorted_by_priority=json_decode($ratios_sorted_by_priority["value"], true);

       

        foreach ($ratios_sorted_by_priority as $key => $value){

            $current_payment_gateway_key = $key;
            $current_payment_gateway_value = intVal($value);
            break;
        }
        if($current_payment_gateway_value > 0)
        {
            $current_payment_gateway_value--;
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

            return intVal($current_payment_gateway_key);

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
            $should_return=false;
            
        }

        if(empty($ratios_sorted_by_priority))
        {
         
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
            $should_return=false;
            
        }

        if($should_return)
        {
            echo "Returning value:".intVal($recommended_payment_gateway_id);
            return intVal($recommended_payment_gateway_id);
        }
        else
        {
            
            return Self::get_next_payment_method_id();
            
        }
        
    }

    public static function get_gateway_ratios_array()
    {
        $payment_methods_raw= PaymentGateway::all()->toArray();
        $payment_methods_cleansed=array();

        for($i=0; $i<count($payment_methods_raw);$i++)
        {
            $payment_methods_cleansed[$payment_methods_raw[$i]["id"]] = $payment_methods_raw[$i]["ratio"];
        }

        return $payment_methods_cleansed;
    }
}



?>