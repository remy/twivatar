# Twivatar

Twivatar is a RESTful API to a Twitter user's avatar built out of frustration of external Twitter apps breaking when the avatar url is stored, and then changed by that user later on Twitter - the result is a broken image on that app unless they constantly check for profile changes.

## Usage

`<img src="https://twivatar.glitch.me/[screen_name]" />`

Alternatively you can specify the size image you want from:

* mini (24x24)
* normal (48x48 - default)
* bigger (73x73)
* original

`<img src="https://twivatar.glitch.me/[screen_name]/[size]" />`

## Behind the scenes

This is a simple one script app that stores the url of the avatar. When the avatar is requested for x user, it runs the following logic:

1. Get the mobile HTML from twitter
* Run the HTML through cheerio and find the .Avatar element
* Request the image URL and pipe to the response
* All requests also include CORS headers so you can manipulate in a canvas

## License

MIT: [http://rem.mit-license.org](http://rem.mit-license.org)
