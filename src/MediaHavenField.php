<?php

namespace GlueAgency\MediaHaven;

use craft\base\ElementInterface;
use craft\base\Field;
use Craft;

class MediaHavenField extends Field
{
    public $username;

    public $password;

    public $ingestSpaceId;

    public $departmentId;

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

        return Craft::$app->view->renderTemplate(
            'mediahaven/_input', [
                'field' => $this,
                'settings' => $this->settings,
                'value' => $value,
                'name' => $name,
                'id' => $id,
                'namespacedName' => $namespacedName,
                'namespacedId' => $namespacedId,
            ]
        );
    }
}
