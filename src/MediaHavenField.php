<?php

namespace GlueAgency\MediaHaven;

use GlueAgency\MediaHaven\Traits\PreparesAssetForJavascript;
use craft\base\ElementInterface;
use craft\fields\Assets;
use Craft;

class MediaHavenField extends Assets
{
    use PreparesAssetForJavascript;

    public $mediaHavenUploadLocationSource;

    public $mediaHavenUploadLocationSubpath;

    public function init()
    {
        parent::init();
        $this->inputTemplate = 'mediahaven/_input';
    }

    public static function displayName(): string
    {
        return 'MediaHaven';
    }

    public function getSettingsHtml()
    {
        return Craft::$app->view->renderTemplate(
            'mediahaven/_settings', [
                'field' => $this,
                'settings' => $this->settings,
                'pluralElementType' => "Assets",
            ]
        );
    }
}
