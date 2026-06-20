<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cv extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'title',
        'email',
        'phone',
        'address',
        'website',
        'summary',
        'photo_url',
        'template_id',
        'theme_color'
    ];

    /**
     * Get experiences for the CV.
     */
    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }

    /**
     * Get educations for the CV.
     */
    public function educations()
    {
        return $this->hasMany(Education::class);
    }

    /**
     * Get skills for the CV.
     */
    public function skills()
    {
        return $this->hasMany(Skill::class);
    }
}
