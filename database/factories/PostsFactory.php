<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Posts>
 */
class PostsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => fake()->sentence(10),
            'content' => fake()->paragraph(60),
            'image' => 'https://source.unsplash.com/random/1200x700?sig='.rand(0, 19999999),
            'user_id' => 1
        ];
    }
}
