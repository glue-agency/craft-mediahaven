<?php

namespace GlueAgency\MediaHaven\Controllers;

use craft\elements\Asset;
use craft\helpers\FileHelper;
use craft\helpers\Assets;
use craft\web\Controller;
use Craft;

class AssetsController extends Controller
{
    public function actionStore()
    {
        $request = Craft::$app->request;

        $originalFileName = $request->post('originalFileName');
        $mediaObjectId = $request->post('mediaObjectId');
        $imagePath = $request->post('imagePath');
        $title = $request->post('title');

        $tempFilePath = $this->moveFileToTempFolder($imagePath, $originalFileName);

        $volume = Craft::$app->volumes->getAllVolumes()[0];

        $filename = Assets::prepareAssetName($originalFileName);

        $folderId = Craft::$app->assets->ensureFolderByFullPathAndVolume(
            '',
            $volume
        );

        $asset = new Asset();
        $asset->tempFilePath = $tempFilePath;
        $asset->filename = $filename;
        $asset->newFolderId = $folderId;
        $asset->volumeId = $volume->id;
        $asset->avoidFilenameConflicts = true;
        $asset->setScenario(Asset::SCENARIO_CREATE);

        $result = Craft::$app->elements->saveElement($asset);

        return $this->asJson([
            'id' => $asset->id,
            'filename' => $asset->filename,
            'title' => $asset->title,
            'thumb' => $asset->getThumbUrl(200),
            'mediaObjectId' => $mediaObjectId,
        ]);
    }

    protected function moveFileToTempFolder($url, $filename)
    {
        $pathService = Craft::$app->getPath();
        $targetDir = $pathService->getTempAssetUploadsPath() . '/mediahaven/';
        $targetPath = $targetDir . $filename;

        FileHelper::createDirectory($targetDir);

        $fileHandle = fopen($url, 'r');
        file_put_contents($targetPath, $fileHandle);

        return $targetPath;
    }
}
