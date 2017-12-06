<template>
   <aside class="navigation-sidebar" v-bind:class="{ shown: isActive }">
		<nav class="h-100 fp-navbar" onclick="event.preventDefault();return false">
			<ul class="h-100 fp-nav-right">
				<li v-on:click="changeView()">  
					<img src="../../assets/img/logo.jpg" style="width: 60px; height: 50px; margin-right: 10px; margin-top: -5px; margin-left: 5px;" 
						v-on:click="changeView()" 
					/>  
					<span style="font-weight: bold; color: white; font-size: 20px; text-shadow: #000 0.15em 0.15em 0.15em;">
						Budget 
					</span>
				</li>  								 
				<li class="fp-nav-item fp-nav-item-right">
				  <a class="fp-nav-link menu-block-header" href="#">Budget</a>
				</li>				
				
				<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('assets')" 
					v-bind:class="{ active: assets }">
					<a class="fp-nav-link" href="#">Assets</a>
				</li>				
			
				<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('projects')" 
					v-bind:class="{ active: projects }">
					<a class="fp-nav-link" href="#">Projects</a>
				</li>		
				
				<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('departments')" 
					v-bind:class="{ active: departments }">
					<a class="fp-nav-link" href="#">Departments</a>
				</li>			
				
				<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('employees')" 
					v-bind:class="{ active: employees }">
					<a class="fp-nav-link" href="#">Employees</a>
				</li>
  				
				<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('resources')" 
					v-bind:class="{ active: resources }">
					<a class="fp-nav-link" href="#">Resources</a>
				</li> 	
				
				<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('audits')" 
					v-bind:class="{ active: audits }">
					<a class="fp-nav-link" href="#">Audits</a>
				</li>
				<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('users')" 
					v-bind:class="{ active: users }">
					<a class="fp-nav-link" href="#">Users</a>
				</li>				
				<li class="fp-nav-item fp-nav-item-right" v-on:click="changeRoute('')" 
					v-bind:class="{ active: logout }">
					<a class="fp-nav-link" href="#">Logout</a>
				</li>
			</ul>
			
			<ul class="h-100 fp-nav-left">
				<li class="fp-nav-item fp-nav-item-left li-border-bottom" v-on:click="changeView()">
					<a class="fp-nav-link" href="#" id="showNav" title="Base 09">BU</a>
					<span class="hot-key-hint">~</span>
				</li>
				<li class="fp-nav-item fp-nav-item-left">
				  <a class="fp-nav-link" href="#"></a>
				  <span class="hot-key-hint">1</span>
				</li>
				
				<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('assets')" 
					v-bind:class="{ active: assets }">
					<a class="fp-nav-link" href="#" title="Assets">AS</a>
					<span class="hot-key-hint">2</span>
				</li>				
 				
				<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('projects')" 
					v-bind:class="{ active: projects }">
					<a class="fp-nav-link" href="#" title="Projects">PR</a>
					<span class="hot-key-hint">2</span>
				</li> 				
				
				<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('departments')" 
					v-bind:class="{ active: departments }">
					<a class="fp-nav-link" href="#" title="Departments">DE</a>
					<span class="hot-key-hint">2</span>
				</li>	
				
				<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('employees')" 
					v-bind:class="{ active: employees }">
					<a class="fp-nav-link" href="#" title="Employees">EM</a>
					<span class="hot-key-hint">2</span>
				</li>
				
				<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('resources')" 
					v-bind:class="{ active: resources }">
					<a class="fp-nav-link" href="#" title="Resources">RE</a>
					<span class="hot-key-hint">2</span>
				</li> 				

				<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('audits')" 
					v-bind:class="{ active: audits }">
					<a class="fp-nav-link" href="#" title="Audits">AU</a>
					<span class="hot-key-hint">4</span>
				</li>
				<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('users')" 
					v-bind:class="{ active: users }">
					<a class="fp-nav-link" href="#" title="Users">US</a>
					<span class="hot-key-hint">5</span>
				</li>				
				<li class="fp-nav-item fp-nav-item-left" v-on:click="changeRoute('')" 
					v-bind:class="{ active: logout }">
					<a class="fp-nav-link" href="#" title="Logout">LO</a>
					<span class="hot-key-hint">5</span>
				</li>
			</ul>
		</nav>
	</aside> 
</template>

<script>
import appConfig from '../../main'

export default {
  name: 'navbar',
			data: function () {
			  return {
				searchQuery: '',
				route: appConfig.route,
				isActive: false,
				assets: null,
				projects: null,
				departments: null,
				employees: null,
				resources: null,
				audits: null,
				users: null,
				login: null,
				logout: null,
				test: null,
				test1: null,
				test2: null,
				test3: null,
				test4: null,
				test5: null,
			  }
			},
			created() {
				this.init();
			},	
			methods: {
				init() {
					if (this.route == 'Assets') {
						this.assets = true;
					} else {
						this.assets = false;
					}					
					
					if (this.route == 'Projects') {
						this.projects = true;
					} else {
						this.projects = false;
					}		
					
					if (this.route == 'Departments') {
						this.departments = true;
					} else {
						this.departments = false;
					}					
					
					if (this.route == 'Employees') {
						this.employees = true;
					} else {
						this.employees = false;
					}
										
					if (this.route == 'Resources') {
						this.resources = true;
					} else {
						this.resources = false;
					}
					
					if (this.route == 'Audits') {
						this.audits = true;
					} else {
						this.audits = false;
					}		
					
					if (this.route == 'Users') {
						this.users = true;
					} else {
						this.users = false;
					}				
					
					if (this.route == 'Test') {
						this.test = true;
					} else {
						this.test = false;
					}					
					
					if (this.route == 'Test1') {
						this.test1 = true;
					} else {
						this.test1 = false;
					}				
					
					if (this.route == 'Test2') {
						this.test2 = true;
					} else {
						this.test2 = false;
					}					
					
					if (this.route == 'Test3') {
						this.test3 = true;
					} else {
						this.test3 = false;
					}			
					
					if (this.route == 'Test4') {
						this.test4 = true;
					} else {
						this.test4 = false;
					}					
					
					if (this.route == 'Test5') {
						this.test5 = true;
					} else {
						this.test5 = false;
					}					

				},				
				changeView() {			
					if (this.isActive !== false) {
						this.isActive = false;
					}
					else {
						this.isActive = true;
					}
				},
				searchClear() {
					this.searchQuery = '';
					bus.$emit('searchQuery', this.searchQuery);
				},
				changeRoute(route) {
					event.preventDefault();
					//this.$router.push({ path: route});
					this.$router.push('/' + route);
					return false;
				}
			}
		}
 
</script>
 
