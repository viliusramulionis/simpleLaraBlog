<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Posts;

class PostsController extends Controller
{
    public function index() {
        return Posts::with('user')->latest()->get();
    }

    public function single(int $id) {
        return Posts::with('user')->find($id);
    }

    public function create(Request $request) {
        $request->validate([
            'title' => ['string'],
            'content' => ['string'],
            'image' => ['string'],
            'user_id' => ['integer']
        ]);

        Posts::create($request->all());
        return 'Post successfully created';
    }

    public function update(int $id, Request $request) {
        $request->validate([
            'title' => ['string'],
            'content' => ['string'],
            'image' => ['string'],
            'user_id' => ['integer']
        ]);

        Posts::find($id)->update($request->all());
        return 'Post successfully updated';
    }

    public function delete(int $id) {
        Posts::find($id)->delete();
        return 'Post successfully deleted';
    }
}
