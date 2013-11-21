# TinyLiveReload Plugin for [DocPad](http://docpad.org)

DocPad plugin that adds the ability to do livereload with Chrome plugin and without adding any additional code to your html.

## Installation

	docpad install tinylivereload

As for the livereload client, you need to install the browser extension:
http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-
(**note**: you need to listen on port 35729 to be able to use with your
brower extension)

or add the livereload script tag manually:
http://feedback.livereload.com/knowledgebase/articles/86180-how-do-i-add-the-script-tag-manually-
(and here you can choose whatever port you want)

## Configuration

Currently only `port` option is available:

```coffeescript
#docpad.coffee
docpadConfig = {

	[...]

	plugins:
		tinylivereload:
			port: 35729 #set your port here

	[...]
}
# Export our DocPad Configuration
module.exports = docpadConfig
```


## Dependencies

* https://github.com/mklabs/tiny-lr