<?php

namespace GlueAgency\MediaHaven\Traits;

use craft\elements\Asset;

trait PreparesAssetForJavascript
{
    public function prepareAssetForJavascript(Asset $asset, array $extraData = []): array
    {
        return array_merge([
            'id' => $asset->id,
            'filename' => $asset->filename,
            'title' => $asset->title,
            'thumb' => $asset->getThumbUrl(200),
            'width' => $asset->width,
            'height' => $asset->height,
            'site_id' => $asset->siteId,
            'status' => $asset->status,
            'url' => $asset->url,
        ], $extraData);
    }
}
