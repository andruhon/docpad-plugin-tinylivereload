# Export Plugin
tinylr = require('tiny-lr')

module.exports = (BasePlugin) ->
	# Define Plugin
	class TinyLiveReload extends BasePlugin
		# Plugin name
		name: 'tinylivereload'
		lrServer: null
		lastGenerateTime: null

		config:
			port: 35729

		serverAfter: (opts) ->
			config = @config
			port = config.port
			docpad.log('info','Starting TinyLiveReload')

			@lrServer = tinylr()

			@lrServer.removeAllListeners('error')
			@lrServer.on('error',((err)->
				docpad.log('error','TinyLiveReload error:',err)
			))
			@lrServer.listen(port,((err)->
				console.error(err) if err
				docpad.log('info','TinyLiveReload is listerning on port '+port)
			))

			@lrServer.changed({body:{files:['']}}); #reload page on docpad restart

			@lastGenerateTime = new Date()

			@

		generateAfter: (opts) ->
			return @ if !@lrServer
			files = []
			collection = docpad.getDatabase().findAll({
				mtime: {
					$gte: @lastGenerateTime
				}
			})

			if collection.models.length>0
				for model in collection.models
					do (model) ->
						files.push(model.attributes.url)


			@lastGenerateTime = new Date()

			files=[''] if files.length==0

			@lrServer.changed({body:{files:files}});
			docpad.log('info','changed files are sent')

			@