# Twivatar

Twivatar is a RESTful API to a Twitter user's avatar built out of frustration of external Twitter apps breaking when the avatar url is stored, and then changed by that user later on Twitter - the result is a broken image on that app unless they constantly check for profile changes.

## Usage

`<img src="http://twivatar.org/[screen_name]" />`

Alternatively you can specify the size image you want from:

* mini (24x24)
* normal (48x48 - default)
* bigger (73x73)
* original

`<img src="http://twivatar.org/[screen_name]/[size]" />`

## License

MIT: http://rem.mit-license.org