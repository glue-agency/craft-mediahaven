<?php

namespace GlueAgency\MediaHaven;

use GlueAgency\MediaHaven\Traits\PreparesAssetForJavascript;
use craft\base\ElementInterface;
use craft\fields\Assets;
use Craft;

class MediaHavenField extends Assets
{
    use PreparesAssetForJavascript;

    public $username;

    public $password;

    public $ingestSpaceId;

    public $departmentId;

    /**
     * @inheritdoc
     */
    public $useSingleFolder;

    /**
     * @inheritdoc
     */
    public $singleUploadLocationSource;

    /**
     * @inheritdoc
     */
    public $singleUploadLocationSubpath;

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
            ]
        );
    }
}
