<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        // Check if the authenticated user's role matches the required role
        if (Auth::check() && Auth::user()->role === $role) {
            return $next($request);
        }

        // Redirect to the appropriate dashboard if roles don't match
        return redirect()->route(Auth::user()->role . '.dashboard');
    }
}