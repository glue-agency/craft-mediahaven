<?php

namespace GlueAgency\MediaHaven;

use craft\base\ElementInterface;
use craft\fields\Assets;
use Craft;

class MediaHavenField extends Assets
{
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

    public function getInputHtml($value, ElementInterface $element = null): string
    {
        $name = $this->handle;
        $id = Craft::$app->view->formatInputId($name);
        $namespacedName = Craft::$app->view->namespaceInputName($name);
        $namespacedId = Craft::$app->view->namespaceInputId($id);
        $files = array_map(function ($asset) {
            return [
                'id' => $asset->id,
                'filename' => $asset->filename,
                'title' => $asset->title,
                'thumb' => $asset->getThumbUrl(200),
            ];
        }, $element->{$name}->all());

        return Craft::$app->view->renderTemplate(
            'mediahaven/_input', [
                'field' => $this,
                'settings' => $this->settings,
                'value' => $value,
                'name' => $name,
                'id' => $id,
                'namespacedName' => $namespacedName,
                'namespacedId' => $namespacedId,
                'files' => $files,
            ]
        );
    }
}
