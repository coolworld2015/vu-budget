<template>
  <div v-if="loading">
    <div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
      <img src="../../assets/img/loading.gif">
    </div>
  </div>

  <div v-else>
	<div style="margin: auto; width: 25%; font-size: 22px; font-weight: bold; margin-bottom: 10px;">
		<div style="text-align: center; padding-right: 40px;">New input</div>
	</div>
    <form class="payment-form payment-form--create d-flex justify-content-stretch" autocomplete="off">
      <fieldset class="sender-data form-section-wrapper">
        <div class="form-section" style="width: 100%;">
          		  
		  <div class="form-group">
            <label for="senderSurname">InvoiceID</label>
            <input type="text" class="form-control" id="senderSurname" placeholder="InvoiceID" 
				v-model="invoiceID"
				v-on:keypress="clearWarning"
				v-bind:class="{ warning: fieldsErrors.invoiceID }">
          </div>       
   		  
		  <div class="form-group">
            <label for="senderSurname">Date</label>
            <input type="text" class="form-control" id="senderSurname" placeholder="Date" 
				v-model="date"
				v-on:keypress="clearWarning"
				v-bind:class="{ warning: fieldsErrors.date }">
          </div>
		  
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
            <label for="typeId">Resource</label>
			<select class="form-control" v-model="resourceID" v-on:change="changeResource"
				v-bind:class="{ warning: fieldsErrors.resource }">
				<option v-for="option in resources" v-bind:value="option.id" v-bind:data-name="option.name" v-bind:data-price="option.price">
				{{ option.name }}
			  </option>
			</select>
          </div>        

          <div class="form-group">
            <label for="senderName">Price</label>
            <input type="text" class="form-control" id="senderName" placeholder="Price" 
				v-model="price"
				v-on:keypress="clearWarning"
				v-on:keyup="changeTotal"
				v-bind:class="{ warning: fieldsErrors.price }">
          </div>
		  
          <div class="form-group">
            <label for="senderName">Quantity</label>
            <input type="text" class="form-control" id="senderName" placeholder="Quantity" 
				v-model="quantity"
				v-on:keypress="clearWarning"
				v-on:keyup="changeTotal"
				v-bind:class="{ warning: fieldsErrors.quantity }">
          </div>

          <div class="form-group">
            <label for="senderPatronymic">Description</label>
            <textarea type="text" class="form-control" id="senderPatronymic1" placeholder="Description" 
				v-model="description" 
				v-on:keypress="clearWarning"
				v-bind:class="{ warning: fieldsErrors.description }"></textarea>
          </div>
 		  
          <div class="form-group" style="margin-bottom: 30px;">
            <label for="senderName">Total</label>
            <input type="text" class="form-control" id="senderName" placeholder="Total" 
				v-model="total"  readonly>
          </div>
		  <div style="font-weight: bold; font-size: 14px; color: #dc3545; margin-top: 15px; text-align: center;">
		    <span v-show="invalidValue" style="margin-left: 0px;">Value required - please provide.</span>
		  </div>
		  <div class="d-flex justify-content-center" style1="margin-top: 30px;">
			<button class="btn btn-danger" v-on:click="addItem" style="margin: 10px; width: 100px; font-size: 14px;">Submit</button>
			<button class="btn btn-danger" v-on:click="goBack" style="margin: 10px; width: 100px; font-size: 14px;">Back</button>
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
			date: '',
			price: '',
			quantity: '',
			projects: [{id:0, name:'Select project'}],			
			projectID: 0,
			departments: [{id:0, name:'Select department'}],
			departmentID: 0,			
			employees: [{id:0, name:'Select employee'}],
			employeeID: 0,			
			resources: [{id:0, name:'Select resource'}],
			resourceID: 0,
			description: '',
			total: '0.00',
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
				description: false
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
        let todayDate = d.getMonth() + 1 + '/' + (d.getDate()) + '/' + d.getFullYear();
		let time = d.toTimeString().split(' ');
		this.date = todayDate + ' ' + time[0];
	},
	methods: {
		goBack() {
			this.$router.push('/inputs');
		},
		getProjects() {
			this.$http.get(appConfig.URL + 'projects/get', {headers: {'Authorization': appConfig.access_token}})
				.then(result => {			 
					this.projects = result.data.sort(this.sort);
					this.projects.unshift({id:0, name:'Select project'});
					this.loading = false;
				}).catch((error)=> {
					appConfig.notifications.items.push(this.notification);
					this.loading = false;
				})
		},		
		getDepartments() {
			this.$http.get(appConfig.URL + 'departments/get', {headers: {'Authorization': appConfig.access_token}})
				.then(result => {			 
					this.departments = result.data.sort(this.sort);
					this.departments.unshift({id:0, name:'Select department'});
					this.loading = false;
				}).catch((error)=> {
					appConfig.notifications.items.push(this.notification);
					this.loading = false;
				})
		},		
		getEmployees() {
			this.$http.get(appConfig.URL + 'employees/get', {headers: {'Authorization': appConfig.access_token}})
				.then(result => {			 
					this.employees = result.data.sort(this.sort);
					this.employees.unshift({id:0, name:'Select employee'});
					this.loading = false;
				}).catch((error)=> {
					appConfig.notifications.items.push(this.notification);
					this.loading = false;
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
				})
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
					total: this.total,	
					
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
			let total = (+this.price)*(+this.quantity)
			this.total = ((+total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
 
		  }
	}
}
</script>
