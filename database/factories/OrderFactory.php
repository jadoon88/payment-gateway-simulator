<?php

namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Helpers\Helper;

class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $next_payment_method_id=intVal(Helper::get_next_payment_method_id());
        echo "NEXT ID:".$next_payment_method_id;
        return [
            'customer_name' => $this->faker->name(),
            'shipping_address' => $this->faker->address(),
            'shipping_phone' => $this->faker->phoneNumber(),
            'shipping_city' => $this->faker->city(),
            'shipping_country' => $this->faker->country(),
            'line_items' => json_encode(
                [
                    ["title" => "t-shirt", "price" => '100', "quantity" => '1'],
                    ["title" => "pants", "price" => '101', "quantity" => '3'],
                    ]
            ),

            'total' => 300,
            'currency' => $this->faker->currencyCode(),
            'status' => "processing",
            'payment_gateway' => $next_payment_method_id,

           
        ];
    }
}
