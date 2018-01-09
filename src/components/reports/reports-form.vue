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
			<select class="form-control" v-model="projectID" v-on:change="changeProject"
				v-on:keypress="clearWarning"
				v-bind:class="{ warning: fieldsErrors.project }">
				<option v-for="option in projects" v-bind:value="option.id" v-bind:data-name="option.name">
				{{ option.name }}
			  </option>
			</select>
          </div>            
		  
		  <div class="form-group">
            <label for="typeId">Department</label>
			<select class="form-control" v-model="departmentID" v-on:change="changeDepartment"
				v-on:keypress="clearWarning"
				v-bind:class="{ warning: fieldsErrors.department }">
				<option v-for="option in departments" v-bind:value="option.id" v-bind:data-name="option.name">
				{{ option.name }}
			  </option>
			</select>
          </div>  		  
		  
		  <div class="form-group">
            <label for="typeId">Employee</label>
			<select class="form-control" v-model="employeeID" v-on:change="changeEmployee"
				v-on:keypress="clearWarning"
				v-bind:class="{ warning: fieldsErrors.employee }">
				<option v-for="option in employees" v-bind:value="option.id" v-bind:data-name="option.name">
				{{ option.name }}
			  </option>
			</select>
          </div>  		
          		         		  
		  <div class="form-group">
            <label for="senderSurname">First Day</label>
            <input type="date" class="form-control" placeholder="First Day" 
				v-model="date1"
				v-on:keypress="clearWarning"
				v-bind:class="{ warning: fieldsErrors.date }">
          </div>
          		         		  
		  <div class="form-group">
            <label for="senderSurname">Last Day</label>
            <input type="date" class="form-control" id="senderSurname" placeholder="Last Day" 
				v-model="date2"
				v-on:keypress="clearWarning"
				v-bind:class="{ warning: fieldsErrors.date }">
          </div>		  
 		  
		  <div style="font-weight: bold; font-size: 14px; color: #dc3545; margin-top: 15px; text-align: center;">
		    <span v-show="invalidValue" style="margin-left: 0px;">Value required - please provide.</span>
		  </div>
		  <div class="d-flex justify-content-center" style1="margin-top: 30px;">
			<button class="btn btn-danger" v-on:click="addItem" style="margin: 10px; width: 100px; font-size: 14px;">Submit</button>
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
		this.getResources();
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
		let time = d.toTimeString().split(' ');
		//this.date = todayDate + ' ' + time[0];
		this.date2 = todayDate;
		console.log(this.date2)
	},
	methods: {
		goBack() {
			this.$router.push('/inputs');
		},
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
		getResources() {
			this.$http.get(appConfig.URL + 'goods/get', {headers: {'Authorization': appConfig.access_token}})
				.then(result => {			 
					this.resources = result.data.sort(this.sort);
					this.resources.unshift({id:0, name:'Select resource'});
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
		addItem() {
			if (this.invoiceID == '') {
				this.fieldsErrors.invoiceID = true;
				this.invalidValue = true;
			}			
			
			if (this.date == '') {
				this.fieldsErrors.date = true;
				this.invalidValue = true;
			}		
			
			if (this.price == '') {
				this.fieldsErrors.price = true;
				this.invalidValue = true;
			}				
			
			if (this.quantity == '') {
				this.fieldsErrors.quantity = true;
				this.invalidValue = true;
			}				
			
			if (this.projectID == 0) {
				this.fieldsErrors.project = true;
				this.invalidValue = true;
			}				
			
			if (this.departmentID == 0) {
				this.fieldsErrors.department = true;
				this.invalidValue = true;
			}				
			
			if (this.employeeID == 0) {
				this.fieldsErrors.employee = true;
				this.invalidValue = true;
			}				
			
			if (this.resourceID == 0) {
				this.fieldsErrors.resource = true;
				this.invalidValue = true;
			}				
			
			if (this.description == '') {
				this.fieldsErrors.description = true;
				this.invalidValue = true;
			}			
			
			if (this.isNumber(this.price) != true) {
				this.fieldsErrors.price = true;
				this.invalidValue = true;
			}			
			
			if (this.isNumber(this.quantity) != true) {
				this.fieldsErrors.quantity = true;
				this.invalidValue = true;
			}			
			
			if (this.isNumber(this.sum) != true) {
				this.fieldsErrors.total = true;
				this.invalidValue = true;
			}
			
			if (this.invalidValue) {
				return;
			}
			
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
		clearWarning() {
			this.fieldsErrors.invoiceID = false;
			this.fieldsErrors.date = false;
			this.fieldsErrors.price = false;
			this.fieldsErrors.quantity = false;
			this.fieldsErrors.project = false;
			this.fieldsErrors.department = false;
			this.fieldsErrors.employee = false;
			this.fieldsErrors.resource = false;
			this.fieldsErrors.description = false;
			this.fieldsErrors.total = false;
			this.invalidValue = false;
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
				let arrEmployees = [].concat(this.employees);
				let filteredEmployees = arrEmployees.filter((el) => el.departmentID == e.target.value);
				this.filteredEmployees = [{id:0, name:'Select employee'}].concat(filteredEmployees);
			}
		  },		  
		  changeEmployee (e) {
			this.clearWarning();
			if(e.target.options.selectedIndex > -1) {
				this.employeeName = e.target.options[e.target.options.selectedIndex].dataset.name
			}
		  },		  
		  changeResource (e) {
			this.clearWarning();
			if(e.target.options.selectedIndex > -1) {
				this.resourceName = e.target.options[e.target.options.selectedIndex].dataset.name
				this.price = ((+e.target.options[e.target.options.selectedIndex].dataset.price).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			}
		  },		  
		  changeTotal (e) {
			this.sum = (+this.price)*(+this.quantity)
			this.total = ((+this.sum).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
		  },
		isNumber(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}
	}
}
</script>
