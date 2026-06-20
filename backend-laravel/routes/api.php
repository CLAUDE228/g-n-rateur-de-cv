<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CvController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\PdfController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('api')->group(function () {
    // CV Resource Route Actions
    Route::get('/cv', [CvController::class, 'get']);
    Route::post('/cv', [CvController::class, 'store']);
    Route::post('/cv/autosave', [CvController::class, 'autosave']);
    
    // Pdf Export Route Actions
    Route::post('/generate-pdf', [PdfController::class, 'generate']);
    Route::get('/preview', [PdfController::class, 'preview']);

    // Templates Choice Actions
    Route::get('/templates', [TemplateController::class, 'index']);
});
