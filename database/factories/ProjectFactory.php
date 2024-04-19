<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => fake()->company(),
            'content' => fake()->realText(320),
            'yellow' => 'AS' . fake()->numberBetween(1000, 9999),
            'dir' => fake()->lastName()
        ];
    }
}
