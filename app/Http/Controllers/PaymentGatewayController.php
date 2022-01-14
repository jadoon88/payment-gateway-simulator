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
            'ratio' =>'required',
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
            'ratio' =>intVal($request->ratio),
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
        PaymentGateway::destroy($id);
        
        return response([
            'response' => [
                'message' => "success",
            ]
        ]);
    }
}
