<?php

namespace GlueAgency\MediaHaven;

use GlueAgency\MediaHaven\Models\Settings;
use craft\events\RegisterComponentTypesEvent;
use craft\events\RegisterUrlRulesEvent;
use craft\services\Fields;
use craft\web\UrlManager;
use yii\base\Event;
use Craft;

class Plugin extends \craft\base\Plugin
{
    public $controllerNamespace = '\GlueAgency\MediaHaven\Controllers';

    public function init()
    {
        Craft::setAlias('@/GlueAgency/MediaHaven', __DIR__);

        parent::init();

        Event::on(
            Fields::class,
            Fields::EVENT_REGISTER_FIELD_TYPES,
            function(RegisterComponentTypesEvent $event) {
                $event->types[] = MediaHavenField::class;
            }
        );

        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['mediahaven/api/<endpoint:(.*)>'] = 'mediahaven/media-haven-api';
                $event->rules['mediahaven/assets'] = 'mediahaven/assets/store';
            }
        );
    }

    protected function createSettingsModel()
    {
        return new Settings();
    }
}
