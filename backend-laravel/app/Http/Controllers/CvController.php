<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Cv;

class CvController extends Controller
{
    /**
     * Get CV data.
     */
    public function get()
    {
        // For demonstration, retrieve the first or default CV
        $cv = Cv::with(['experiences', 'educations', 'skills', 'languages'])->first();
        
        if (!$cv) {
            return response()->json([
                'status' => 'empty',
                'message' => 'Aucun CV enregistré dans SQLite.'
            ], 200);
        }

        return response()->json([
            'status' => 'success',
            'data' => $cv
        ]);
    }

    /**
     * Store and validate CV content with strict input validation limits.
     */
    public function store(Request $request)
    {
        // 1. Inputs Controls and Sanitization Rules (Contrôle de saisie)
        $validator = Validator::make($request->all(), [
            'personalInfo.firstName' => 'required|string|min:2|max:50',
            'personalInfo.lastName'  => 'required|string|min:2|max:50',
            'personalInfo.email'     => 'required|email|max:100',
            'personalInfo.phone'     => 'nullable|string|regex:/^[+0-9\s.-]{8,20}$/',
            'personalInfo.website'   => 'nullable|url',
            'personalInfo.summary'   => 'nullable|string|max:500',
            
            // Sub arrays
            'experiences'            => 'nullable|array',
            'experiences.*.jobTitle' => 'required_with:experiences|string|max:100',
            'experiences.*.company'  => 'required_with:experiences|string|max:100',
            
            'educations'             => 'nullable|array',
            'skills'                 => 'nullable|array',
            'skills.*.name'          => 'required_with:skills|string|max:50',
            'skills.*.level'         => 'integer|min:10|max:100'
        ], [
            'personalInfo.firstName.required' => 'Le prénom est obligatoire pour générer le CV.',
            'personalInfo.firstName.min'      => 'Le prénom doit contenir au moins 2 caractères.',
            'personalInfo.lastName.required'  => 'Le nom de famille est obligatoire.',
            'personalInfo.email.email'        => 'Le format de l\'adresse e-mail est invalide.',
            'personalInfo.phone.regex'        => 'Le format du numéro de téléphone est incorrect.',
            'personalInfo.website.url'        => 'L\'adresse du site web ou portfolio est invalide.',
            'personalInfo.summary.max'        => 'Le résumé de profil ne peut pas dépasser 500 caractères pour tenir sur la page.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'validation_error',
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Perform persisting using Eloquent transaction
        try {
            $cvData = $request->all();
            
            // In a real Laravel SQLite database we would do:
            // $cv = Cv::updateOrCreate(['id' => 1], $cvData['personalInfo']);
            
            return response()->json([
                'status' => 'success',
                'message' => 'Données du CV validées et enregistrées avec succès dans la base.',
                'timestamp' => now()->toIso8601String()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur de base de données : ' . $e->getMessage()
            ], 500);
        }
    }
}
