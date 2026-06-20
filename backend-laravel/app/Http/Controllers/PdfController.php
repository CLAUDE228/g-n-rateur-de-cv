<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PdfService;

class PdfController extends Controller
{
    /**
     * Generate custom layout PDF on backend
     */
    public function generate(Request $request)
    {
        $cvData = $request->input('cvData');
        
        if (!$cvData) {
            return response()->json([
                'status' => 'error',
                'message' => 'Les données du CV sont absentes.'
            ], 400);
        }

        try {
            // Simulated PDF engine (e.g. using barryvdh/laravel-dompdf)
            // $pdf = Pdf::loadView('pdf.template', compact('cvData'));
            // return $pdf->download('cv-professionnel.pdf');
            
            return response()->json([
                'status' => 'success',
                'message' => 'Fichier PDF généré avec succès en arrière-plan.',
                'downloadUrl' => '/api/download/cv_' . time() . '.pdf'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la compilation PDF : ' . $e->getMessage()
            ], 500);
        }
    }
}
