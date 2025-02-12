<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class FetchFunctionsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_fetches_wanted_persons_successfully()
    {
        Http::fake([
            env('FBI_API_URL') . '/wanted/v1/list?page=1&perPage=10' => Http::response([
                'items' => [
                    [
                        'title' => 'John Doe',
                        'description' => 'Wanted for bank robbery',
                        'images' => [['thumb' => 'thumb.jpg', 'original' => 'image.jpg']],
                        'hair' => 'Brown',
                        'eyes' => 'Blue',
                        'race' => 'White',
                        'nationality' => 'American',
                        'uid' => '1234',
                        'subjects' => ['Robbery'],
                        'caution' => 'Armed and dangerous',
                        'alert' => 'High alert',
                        'weight' => '180 lbs',
                        'details' => 'Some details',
                        'files' => [['name' => 'Case File', 'url' => 'file.pdf']],
                    ],
                ],
            ], 200),
        ]);

        $response = $this->getJson('/api/fetch-wanted-persons?page=1&perPage=10');

        $response->assertStatus(200)
            ->assertJson(['status' => 'success']);
    }

    /** @test */
    public function it_fetches_wanted_person_details_successfully()
    {
        Http::fake([
            env('FBI_API_URL') . '/wanted/v1/list' => Http::response([
                'items' => [
                    [
                        'uid' => '1234',
                        'title' => 'Black Eyed Pea',
                        'description' => 'Wanted for bank robbery',
                        'caution' => 'Armed and dangerous',
                        'field_offices' => ['New York'],
                        'images' => [['thumb' => 'thumb.jpg', 'original' => 'image.jpg']],
                        'hair_color' => 'Brown',
                        'eyes' => 'Blue',
                        'race' => 'White',
                        'nationality' => 'American',
                        'occupations' => ['Bank Robber'],
                        'aliases' => ['JD'],
                        'external_links' => [],
                    ],
                ],
            ], 200),
        ]);

        $response = $this->getJson('/api/fetch-wanted-person-details/1234');

        $response->assertStatus(200)
            ->assertJson(['status' => 'success']);
    }

    /** @test */
    public function it_returns_error_when_fbi_api_fails()
    {
        Http::fake([
            env('FBI_API_URL') . '/wanted/v1/list?page=1&perPage=10' => Http::response(null, 500),
        ]);

        $response = $this->getJson('/api/fetch-wanted-persons?page=1&perPage=10');

        $response->assertStatus(500)
            ->assertJson(['status' => 'error']);
    }
}
