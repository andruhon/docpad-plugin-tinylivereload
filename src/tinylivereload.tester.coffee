module.exports = (testers) ->

	class MyTester extends testers.ServerTester

		config:
			pluginName: 'docpad-plugin-tinylivereload'

		testCustom: (next) ->
			tester = @

			@