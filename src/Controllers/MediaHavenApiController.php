<?php

namespace GlueAgency\MediaHaven\Controllers;

use GlueAgency\MediaHaven\Plugin;
use GuzzleHttp\Client;
use craft\web\Controller;
use Craft;
use yii\web\Response;

class MediaHavenApiController extends Controller
{
    public function actionIndex($endpoint)
    {
        $settings = $this->plugin()->settings;

        $client = new Client([
            'base_uri' => $settings->endpoint,
            'auth' => [$settings->username, $settings->password],
        ]);

        $request = Craft::$app->request;
        $queryString = $request->queryString;

        $guzzleResponse = $client->request('GET', "${endpoint}?${queryString}");

        $response = Craft::$app->response;
        $response->format = Response::FORMAT_JSON;
        $response->content = $guzzleResponse->getBody()->getContents();

        return $response;
    }

    protected function plugin()
    {
        return Plugin::getInstance();
    }
}
