<?php

namespace GlueAgency\MediaHaven\Controllers;

use GuzzleHttp\Client;
use craft\web\Controller;
use Craft;
use yii\web\Response;

class MediaHavenApiController extends Controller
{
    public function plugin()
    {
        return Craft::$app->plugins->getPlugin('mediahaven');
    }

    public function actionIndex($endpoint)
    {
        $client = new Client([
            'base_uri' => 'https://integration.mediahaven.com/mediahaven-rest-api/',
            'auth' => ['apikey', 'apikey'],
        ]);

        // todo: get authentication from plugin config

        $request = Craft::$app->request;
        $response = Craft::$app->response;

        $guzzleResponse = $client->request('GET', $endpoint);

        $response->format = Response::FORMAT_JSON;
        $response->content = $guzzleResponse->getBody()->getContents();

        return $response;
    }
}
