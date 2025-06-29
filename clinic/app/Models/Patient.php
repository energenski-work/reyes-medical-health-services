<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    /** @use HasFactory<\Database\Factories\PatientFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'age',
        'gender',
        'address',
        'phone',
        'email',
        'facebook',
        'other_contacts',
    ];
}
