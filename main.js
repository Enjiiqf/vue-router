import Vue from 'vue';//汇入Vue架构
import VueRouter from 'vue-router';

import App from './app.vue';//汇入app.vue组件

Vue.use(VueRouter);

const Routers = [
	{
		path: '/index',
		meta: {
			title: '首页'
		},
		component: (resolve) => require(['./views/index.vue'],resolve)
	},
	{
		path: '/about',
		meta: {
			title: '关于'
		},
		component: (resolve) => require(['./views/about.vue'],resolve)
	},
	{
		path: '*',//当存取的路径不存在时，重新导向到首页
		redirect: '/index'
	},
	{
		path: '/user/:id',//存取localhost：8080/user会重新导向到index，需要带一个id才能到user.vue例如localhost:8080/user/123456
		meta: {
			title: '个人首页'
		},
		component: (resolve) => require(['./views/user.vue'],resolve)
	}
];
const RouterConfig = {
	//使用HTML5的History路由模式，通过/来设定路径，不过不设定mode，就会使用#来设定路径
	mode: 'history',
	routes: Routers
};
const router = new VueRouter(RouterConfig);
//vue-router提供了导览钩子beforeEach和afterEach,它们会在路由即将改变前和改变后触发
//所以设定标题可以在beforeEach钩子完成
router.beforeEach((to, from, next) => {
	window.document.title = to.meta.title;
		next();
});
// router.afterEach((to, from, next) => {
// 	window.scrollTo(0,0);
// })

//建立Vue根实例
new Vue ({
	el: '#app',
	router: router,
	
	render: h=>h(App)
});
