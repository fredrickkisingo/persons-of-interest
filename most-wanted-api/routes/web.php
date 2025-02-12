<?php

use Illuminate\Support\Facades\Route;

// routes/web.php

Route::get('/{any}', function () {
    return view('app'); // This will load your main Vue app in the 'app.blade.php' view
})->where('any', '.*');

