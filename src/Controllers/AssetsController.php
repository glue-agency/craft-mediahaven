<?php

namespace GlueAgency\MediaHaven\Controllers;

use GlueAgency\MediaHaven\MediaHavenField;
use GlueAgency\MediaHaven\Traits\PreparesAssetForJavascript;
use craft\elements\Asset;
use craft\helpers\FileHelper;
use craft\helpers\Assets;
use craft\web\Controller;
use Craft;

class AssetsController extends Controller
{
    use PreparesAssetForJavascript;

    public function actionStore()
    {
        $request = Craft::$app->request;

        $originalFileName = $request->post('originalFileName');
        $mediaObjectId = $request->post('mediaObjectId');
        $imagePath = $request->post('imagePath');
        $fieldId = $request->post('fieldId');
        $title = $request->post('title');

        $field = Craft::$app->fields->getFieldById((int) $fieldId);

        $folder = $this->getFolderForField($field);
        $filename = Assets::prepareAssetName(basename($imagePath));
        $tempFilePath = $this->moveFileToTempFolder($imagePath, $filename);

        $asset = $this->createAsset($tempFilePath, $filename, $title, $folder);

        return $this->asJson($this->prepareAssetForJavascript($asset, [
            'mediaObjectId' => $mediaObjectId
        ]));
    }

    protected function getFolderForField(MediaHavenField $field)
    {
        $assets = Craft::$app->assets;
        $uploadLocationSource = $field->mediaHavenUploadLocationSource;
        $uploadLocationSubpath = $field->mediaHavenUploadLocationSubpath;

        $rootFolderUid = substr(
            $uploadLocationSource,
            strpos($uploadLocationSource, ':') + 1
        );
        $rootFolder = $assets->getFolderByUid($rootFolderUid);

        $folderId = $assets->ensureFolderByFullPathAndVolume(
            $uploadLocationSubpath,
            $rootFolder->volume
        );

        if ((int) $rootFolder->id == $folderId) {
            return $rootFolder;
        }

        return $assets->getFolderById($folderId);
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

    protected function createAsset($tempFilePath, $filename, $title, $folder)
    {
        $asset = new Asset();
        $asset->tempFilePath = $tempFilePath;
        $asset->filename = $filename;
        $asset->title = $title;
        $asset->newFolderId = $folder->id;
        $asset->volumeId = $folder->volumeId;
        $asset->avoidFilenameConflicts = true;
        $asset->setScenario(Asset::SCENARIO_CREATE);

        return Craft::$app->elements->saveElement($asset) ? $asset : false;
    }
}
