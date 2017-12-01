import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Login from '@/components/common/login';

import Assets from '@/components/assets/assets';

import Projects from '@/components/projects/projects';
import ProjectEdit from '@/components/projects/edit';
import ProjectAdd from '@/components/projects/add';

import Resources from '@/components/resources/resources';
import ResourceEdit from '@/components/resources/edit';
import ResourceAdd from '@/components/resources/add';

import Users from '@/components/users/users';
import UserEdit from '@/components/users/edit';
import UserAdd from '@/components/users/add';

import Audits from '@/components/audits/audit';
import AuditsEdit from '@/components/audits/edit';

export default new Router({
  routes: [
    { path: '/', component: Login },
    { path: '/login', component: Login },
	
    { path: '/assets', component: Assets },
	
	{ path: '/projects', component: Projects },
    { path: '/project-edit', component: ProjectEdit },
    { path: '/project-add', component: ProjectAdd },
	
    { path: '/resources', component: Resources },
    { path: '/resource-edit', component: ResourceEdit },
    { path: '/resource-add', component: ResourceAdd },	

    { path: '/users', component: Users },
    { path: '/user-edit', component: UserEdit },
    { path: '/user-add', component: UserAdd },
	
	{ path: '/audits', component: Audits },
	{ path: '/audit-edit', component: AuditsEdit }
  ]
})
