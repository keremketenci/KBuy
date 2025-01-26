<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'role' => 'admin',
            'password' => 'password',
        ]);

        // Create sellers
        User::factory()->create([
            'name' => 'Seller',
            'email' => 'seller@mail.com',
            'role' => 'seller',
            'password' => 'password',
        ]);

        User::factory(50)->create([
            'role' => 'seller',
        ]);

        // Create user
        User::factory()->create([
            'name' => 'User',
            'email' => 'user@mail.com',
            'role' => 'user',
            'password' => 'password',
        ]);
    }
}