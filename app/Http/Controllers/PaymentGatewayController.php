<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Http\Resources\PaymentGatewayResource;
use App\Models\PaymentGateway;

class PaymentGatewayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PaymentGatewayResource::collection(PaymentGateway::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            
            'title' =>'required',
            'customer_name' =>'required',
            'shipping_address' =>'required',
            'shipping_phone' =>'required',
            'shipping_city' =>'required',
            'shipping_country' =>'required',
            'line_items' =>'required',
            'total' =>'required',
            'currency' =>'required',
            'status' =>'required',
            'total' =>'required',
            'payment_gateway' =>'required',
        ]);

        if ($validator->fails()) {
            return response([
                'response' => [
                    'message' => "validation error",
                ]
            ]);
        }

        PaymentGateway::create([
            'title' =>$request->title,
            'customer_name' =>$request->customer_name,
            'shipping_address' =>$request->shipping_address,
            'shipping_phone' =>$request->shipping_phone,
            'shipping_city' =>$request->shipping_city,
            'shipping_country' =>$request->shipping_country,
            'line_items' =>$request->line_items,
            'total' =>$request->total,
            'currency' =>$request->currency,
            'status' =>$request->status,
            'total' =>$request->total,
            'payment_gateway' =>intVal($request->payment_gateway),
            ]
        );

        return response([
            'response' => [
                'message' => "success",
            ]
        ]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function update(Request $request, $id)
    // {
    
    //     $validator = Validator::make($request->all(), [
    //         'title'=>'required|min:4|max:100',
    //         'ratio'=>'required',
    //     ]);

    //     if ($validator->fails()) {
    //         return response([
    //             'response' => [
    //                 'message' => "validation error",
    //             ]
    //         ]);
    //     }

    //     PaymentGateway::where('id', intVal($id))->update([
    //         'title' => $request->title,
    //         'ratio' => intVal($request->ratio)
    //     ]);
    //     return response([
    //         'response' => [
    //             'message' => "success",
    //         ]
    //     ]);
    // }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Order::destroy($id);
        
        return response([
            'response' => [
                'message' => "success",
            ]
        ]);
    }
}
