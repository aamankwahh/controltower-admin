
import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

let routes = [{
	name: 'main',
	path: '/',
	component: () => import('layouts/MainLayout.vue'),
	children: [
		//Dashboard routes



		//aircraft routes
		{ path: '/aircraft', name: 'aircraftlist', component: () => import('pages/aircraft/list.vue'), props: true },
		{ path: '/aircraft/index/:fieldName?/:fieldValue?', component: () => import('pages/aircraft/list.vue'), props: true },
		{ path: '/aircraft/view/:id', name: 'aircraftview', component: () => import('pages/book/view.vue'), props: true },
		{ path: '/aircraft/add', name: 'aircraftadd', component: () => import('pages/book/add.vue'), props: true },
		{ path: '/aircraft/edit/:id', name: 'aircraftedit', component: () => import('pages/book/edit.vue'), props: true },

		//traffic routes
		{ path: '/traffic', name: 'trafficlist', component: () => import('pages/traffic/list.vue'), props: true },
		{ path: '/traffic/index/:fieldName?/:fieldValue?', component: () => import('pages/traffic/list.vue'), props: true },
		{ path: '/traffic/view/:id', name: 'trafficview', component: () => import('pages/book/view.vue'), props: true },
		{ path: '/traffic/add', name: 'trafficadd', component: () => import('pages/book/add.vue'), props: true },
		{ path: '/traffic/edit/:id', name: 'trafficedit', component: () => import('pages/book/edit.vue'), props: true },

//user routes
		{ path: '/user', name: 'userlist', component: () => import('pages/user/list.vue'), props: true },
		{ path: '/user/index/:fieldName?/:fieldValue?', component: () => import('pages/user/list.vue'), props: true },
		{ path: '/user/view/:id', name: 'userview', component: () => import('pages/user/view.vue'), props: true },
		{ path: '/index/register', name: 'useruserregister', component: () => import('pages/index/userregister.vue'), props: true },
		{ path: '/account/edit', name: 'useraccountedit', component: () => import('pages/account/accountedit.vue'), props: true },
		{ path: '/account', name: 'useraccountview', component: () => import('pages/account/accountview.vue'), props: true },
		{ path: '/user/add', name: 'useradd', component: () => import('pages/user/add.vue'), props: true },
		{ path: '/user/edit/:id', name: 'useredit', component: () => import('pages/user/edit.vue'), props: true },

		
		
//Password reset routes
		{ path: '/index/forgotpassword', name: 'forgotpassword', component: () => import('pages/index/forgotpassword.vue') },
		{ path: '/index/resetpassword', name: 'resetpassword', component: () => import('pages/index/resetpassword.vue') },
		{ path: '/index/resetpassword_completed', name: 'resetpassword_completed', component: () => import('pages/index/resetpassword_completed.vue') },
		
		

//Error pages
		{ path:  '/error/forbidden', name: 'forbidden',  component: () => import('pages/errors/forbidden.vue') },
		{ path: '/error/notfound',  name: 'notfound', component: () => import('pages/errors/pagenotfound.vue') }
	],
	
	},
	{ path: '/:catchAll(.*)*', component: () => import('pages/errors/pagenotfound.vue') }
];

export default route(async function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)
	
	let mainRoute = routes.find(x => x.name = "main");
	
	let loginToken = store.getters["auth/getLoginToken"];
	if(loginToken){
		try{
			await store.dispatch('auth/getUserData'); //get current user data from api on page load
		}
		catch(e){
			store.dispatch('auth/logout'); //token might have expired
			console.error(e);
		}
	}

	const user = store.state.auth.user;
	if(user){
		const homeRoute = {path: '/', alias: '/home', name: 'home', component: () => import('pages/home/home.vue') }
		mainRoute.children.push(homeRoute);
	}
	else{
		const indexRoute = { path: '/',  alias: '/home', name: 'index', component: () => import('pages/index/index.vue') }
		mainRoute.children.push(indexRoute);
	}


	const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })
  return Router
})




