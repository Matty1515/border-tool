// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
	  enabled: true,
	},
	css: ["~/assets/css/reset.css", "~/assets/css/main.css"],
	app: {
	  head: {
		link: [
		  {
			rel: 'stylesheet',
			href: 'https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css'
		  }
		]
	  }
	}
  });
  