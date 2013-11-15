# Export Plugin
tinylr = require('tiny-lr')

module.exports = (BasePlugin) ->
	# Define Plugin
	class TinyLiveReload extends BasePlugin
		# Plugin name
		name: 'tinylivereload'
		lrServer: null
		lrClient: null
		lastGenerateTime: null

		serverAfter: (opts) ->
			docpad.log('info','tinylivereload serverAfter')

			port = 35729

			@lrServer = tinylr()

			@lrServer.removeAllListeners('error')
			@lrServer.on('error',((err)->
				console.error('TinyLR error:',err)
			))
			@lrServer.listen(port,((err)->
				console.error(err) if err
				console.log('LR is listerning on port '+port);
			))

			@lrServer.changed({body:{files:['']}}); #reload page on docpad restart

			@lastGenerateTime = new Date()

			#@lrServer.reload({})
			#@lrClient.hello();

			# @lrClient = tinylr().client
			#console.log(@lrServer.clients)

			@

		generateAfter: (opts) ->
			docpad.log('generate',docpad.generateStarted, @generateStart)
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
			@