<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'customer_name' => $this->customer_name,
            'shipping_address' => $this->shipping_address,
            'shipping_phone' => $this->shipping_phone,
            'shipping_city' => $this->shipping_city,
            'shipping_country' => $this->shipping_country,
            'line_items' => $this->line_items,
            'total' => $this->total,
            'currency' => $this->currency,
            'status' => $this->status,
            'payment_gateway' => $this->payment_gateway,
        ];
        
    }
}
