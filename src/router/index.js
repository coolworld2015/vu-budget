import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Login from '@/components/common/login';

import Assets from '@/components/assets/assets';

import Inputs from '@/components/inputs/inputs';
import InputEdit from '@/components/inputs/edit';
import InputAdd from '@/components/inputs/add';

import Outputs from '@/components/outputs/outputs';
import OutputEdit from '@/components/outputs/edit';
import OutputAdd from '@/components/outputs/add';

import Projects from '@/components/projects/projects';
import ProjectEdit from '@/components/projects/edit';
import ProjectAdd from '@/components/projects/add';

import Departments from '@/components/departments/departments';
import DepartmentEdit from '@/components/departments/edit';
import DepartmentAdd from '@/components/departments/add';

import Employees from '@/components/employees/employees';
import EmployeeEdit from '@/components/employees/edit';
import EmployeeAdd from '@/components/employees/add';

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
	
	{ path: '/inputs', component: Inputs },
    { path: '/input-edit', component: InputEdit },
    { path: '/input-add', component: InputAdd },	
	
	{ path: '/outputs', component: Outputs },
    { path: '/output-edit', component: OutputEdit },
    { path: '/output-add', component: OutputAdd },		
	
	{ path: '/projects', component: Projects },
    { path: '/project-edit', component: ProjectEdit },
    { path: '/project-add', component: ProjectAdd },	
	
	{ path: '/departments', component: Departments },
    { path: '/department-edit', component: DepartmentEdit },
    { path: '/department-add', component: DepartmentAdd },
	
	{ path: '/employees', component: Employees },
    { path: '/employee-edit', component: EmployeeEdit },
    { path: '/employee-add', component: EmployeeAdd },
	
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
