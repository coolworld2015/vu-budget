<template>
  <div v-if="loading">
    <div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
      <img src="../../assets/img/loading.gif">
    </div>
  </div>

  <div v-else>
	<div style="margin: auto; width: 25%; font-size: 22px; font-weight: bold; margin-bottom: 10px;">
		<div style="text-align: center; padding-right: 40px;">Reports</div>
	</div>
    <form class="payment-form payment-form--create d-flex justify-content-stretch" autocomplete="off">
      <fieldset class="sender-data form-section-wrapper">
        <div class="form-section" style="width: 100%;">

		  
		  <div class="form-group">
            <label for="typeId">Project</label>
			<select class="form-control" v-model="projectID" v-on:change="changeProject">
				<option v-for="option in projects" v-bind:value="option.id" v-bind:data-name="option.name">
				{{ option.name }}
			  </option>
			</select>
          </div>            
		  
		  <div class="form-group">
            <label for="typeId">Department</label>
			<select class="form-control" v-model="departmentID" v-on:change="changeDepartment">
				<option v-for="option in departments" v-bind:value="option.id" v-bind:data-name="option.name">
				{{ option.name }}
			  </option>
			</select>
          </div>  		  
		  
		  <div class="form-group">
            <label for="typeId">Employee</label>
			<select class="form-control" v-model="employeeID" v-on:change="changeEmployee">
				<option v-for="option in employees" v-bind:value="option.id" v-bind:data-name="option.name">
				{{ option.name }}
			  </option>
			</select>
          </div>  		
          		         		  
		  <div class="form-group">
            <label for="senderSurname">First Day</label>
            <input type="date" class="form-control" placeholder="First Day" 
				v-model="date1"
				v-bind:class="{ warning: fieldsErrors.date }">
          </div>
          		         		  
		  <div class="form-group">
            <label for="senderSurname">Last Day</label>
            <input type="date" class="form-control" id="senderSurname" placeholder="Last Day" 
				v-model="date2"
				v-bind:class="{ warning: fieldsErrors.date }">
          </div>		  
 		  
		  <div style="font-weight: bold; font-size: 14px; color: #dc3545; margin-top: 15px; text-align: center;">
		    <span v-show="invalidValue" style="margin-left: 0px;">Value required - please provide.</span>
		  </div>
		  <div class="d-flex justify-content-center" style1="margin-top: 30px;">
			<button class="btn btn-danger" v-on:click="showDetails" style="margin: 10px; width: 100px; font-size: 14px;">Submit</button>
		  </div>
 
        </div>
      </fieldset>
    </form>

  </div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';

export default {
	name: 'inputs-add',
	data() {
		return {
			invoiceID: (appConfig.inputs.items.length + 1).toString(),
			date1: '2018-01-01',
			date2: '',
			price: '',
			quantity: '',
			projects: [{id:0, name:'All projects'}],			
			projectID: 0,
			departments: [{id:0, name:'All departments'}],
			departmentID: 0,			
			employees: [],
			filteredEmployees: [{id:0, name:'All employees'}],
			employeeID: 0,			
			resources: [{id:0, name:'Select resource'}],
			resourceID: 0,
			description: '',
			total: '0.00',
			sum: 0,
			loading: true,
			invalidValue: false,
			fieldsErrors: {
				invoiceID: false,
				date: false,
				price: false,
				quantity: false,
				project: false,
				department: false,
				employee: false,
				resource: false,
				description: false,
				total: false
			},
		}
	},
	created() {
		this.getProjects();
		this.getDepartments();
		this.getEmployees();
		this.notification = {
			title: 'Something went wrong',
			message: 'Server responded with status code error',
			important: true
		}
		this.notification1 = {
			title: 'Item created',
			message: `Item was created successfully`
		}
		let d = new Date;
		let mm = d.getMonth() + 1;
		let dd = d.getDate();
		
		if(dd<10) {	dd='0'+dd; } 
		if(mm<10) {	mm='0'+mm; } 
        let todayDate = d.getFullYear() + '-' + mm + '-' + dd;
		this.date2 = todayDate;
	},
	methods: {
		getProjects() {
			this.$http.get(appConfig.URL + 'projects/get', {headers: {'Authorization': appConfig.access_token}})
				.then(result => {			 
					this.projects = result.data.sort(this.sort);
					this.projects.unshift({id:0, name:'All projects'});
					this.loading = false;
				}).catch((error)=> {
					appConfig.notifications.items.push(this.notification);
					this.loading = false;
					this.$router.push('login');
				})
		},		
		getDepartments() {
			this.$http.get(appConfig.URL + 'departments/get', {headers: {'Authorization': appConfig.access_token}})
				.then(result => {			 
					this.departments = result.data.sort(this.sort);
					this.departments.unshift({id:0, name:'All departments'});
					this.loading = false;
				}).catch((error)=> {
					appConfig.notifications.items.push(this.notification);
					this.loading = false;
					this.$router.push('login');
				})
		},		
		getEmployees() {
			this.$http.get(appConfig.URL + 'employees/get', {headers: {'Authorization': appConfig.access_token}})
				.then(result => {			 
					this.employees = result.data.sort(this.sort);
					this.employees.unshift({id:0, name:'All employees'});
					this.loading = false;
				}).catch((error)=> {
					appConfig.notifications.items.push(this.notification);
					this.loading = false;
					this.$router.push('login');
				})
		},
		sort(a, b) {
			let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
			if (nameA < nameB) {
				return -1
			}
			if (nameA > nameB) {
				return 1
			}
			return 0;
		},
		showDetails(item){
			appConfig.report = item;
			this.$router.push('report-results');
		},
		addItem() {
			this.loading = true;
			this.$http.post(appConfig.URL + 'inputs/add', {                
					id: + new Date,
					invoiceID: this.invoiceID,
					date: this.date,
					price: this.price,				
					quantity: this.quantity,	
					description: this.description,
					total: this.sum,	
					
					project: this.projectName,
					projectID: this.projectID,						
					
					department: this.departmentName,
					departmentID: this.departmentID,					
					
					employee: this.employeeName,
					employeeID: this.employeeID,
					
					product: this.resourceName,
					productID: this.resourceID,
					
					authorization: appConfig.access_token
				})
				.then(result => {
					if (result.body.error) {
						appConfig.notifications.items.push(this.notification);
					} else {
						appConfig.notifications.items.push(this.notification1);
					}
					this.$router.push('/inputs');
				})
				.catch((error)=> {
					appConfig.notifications.items.push(this.notification);
					this.$router.push('/inputs');
				})
		},
	    changeProject (e) {
			this.clearWarning();
			if(e.target.options.selectedIndex > -1) {
				this.projectName = e.target.options[e.target.options.selectedIndex].dataset.name
			}
		  },	    
		  changeDepartment (e) {
			this.clearWarning();
			if(e.target.options.selectedIndex > -1) {
				this.departmentName = e.target.options[e.target.options.selectedIndex].dataset.name
			}
		  },		  
		  changeEmployee (e) {
			this.clearWarning();
			if(e.target.options.selectedIndex > -1) {
				this.employeeName = e.target.options[e.target.options.selectedIndex].dataset.name
			}
		  }
	}
}
</script>
