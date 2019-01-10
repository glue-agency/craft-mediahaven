<?php

namespace GlueAgency\MediaHaven\AssetBundles;

use craft\web\AssetBundle;
use craft\web\assets\garnish\GarnishAsset;

class MediaHavenFieldBundle extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = "@GlueAgency/MediaHaven/AssetBundles/dist";

        $this->depends = [
            GarnishAsset::class,
        ];

        $this->js = [
            'mediaHavenField.js',
        ];

        parent::init();
    }
}
