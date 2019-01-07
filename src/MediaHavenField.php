<?php

namespace GlueAgency\MediaHaven;

use craft\base\Field;
use Craft;

class MediaHavenField extends Field
{
    public static function displayName(): string
    {
        return 'MediaHaven';
    }

    public function getSettingsHtml()
    {
        return Craft::$app->view->renderTemplate(
            'mediahaven/_settings', [
                'field' => $this,
            ]
        );
    }
}
