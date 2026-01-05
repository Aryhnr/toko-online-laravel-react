<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductBadge extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'label',
        'variant',
        'position',
    ];

    public $timestamps = false; // karena schema tidak pakai timestamps

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
