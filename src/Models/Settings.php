<?php

namespace GlueAgency\MediaHaven\Models;

use craft\base\Model;

class Settings extends Model
{
    public $username = 'apikey';

    public $password = 'apikey';

    public $endpoint = 'https://integration.mediahaven.com/mediahaven-rest-api/';
}
