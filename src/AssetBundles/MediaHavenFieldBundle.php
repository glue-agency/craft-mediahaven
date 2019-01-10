<?php

namespace GlueAgency\MediaHaven\AssetBundles;

use craft\web\AssetBundle;

class MediaHavenFieldBundle extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = "@GlueAgency/MediaHaven/AssetBundles/dist";

        $this->js = [
            'test.js',
        ];

        parent::init();
    }
}
