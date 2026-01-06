<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::where('is_active', true)
            ->latest()
            ->get()
            ->map(function ($category) {
                return [
                    'id'    => $category->id,
                    'name'  => $category->name,
                    'slug'  => $category->slug,
                    'icon'  => $category->icon
                        ? asset('storage/categories/' . $category->icon)
                        : null,
                    'description' => $category->description,
                ];
            });

        return Inertia::render('Home', [
            'categories' => $categories,
        ]);
    }
}
