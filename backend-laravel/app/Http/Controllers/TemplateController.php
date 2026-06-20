<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TemplateController extends Controller
{
    /**
     * Retrieve list of corporate/creative layout profiles.
     */
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'templates' => [
                [
                    'id' => 'professional',
                    'name' => 'Professionnel / Classique',
                    'tag' => 'ATS-friendly',
                    'description' => 'Mise en page épurée idéale pour passer les filtres automatiques.'
                ],
                [
                    'id' => 'modern',
                    'name' => 'Moderne / Design',
                    'tag' => 'Créatif',
                    'description' => 'Double colonne élégante avec accentuation de vos points forts.'
                ]
            ]
        ]);
    }
}
