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
            <input type="text" class="form-control" id="senderSurname" placeholder="InvoiceID" v-model="invoiceID">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть прізвище відправника.
            </div>
          </div>       
   		  
		  <div class="form-group">
            <label for="senderSurname">Date</label>
            <input type="text" class="form-control" id="senderSurname" placeholder="Date" v-model="date">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть прізвище відправника.
            </div>
          </div>
		  
		  <div class="form-group">
            <label for="typeId">Project</label>
			<select class="form-control" v-model="projectID" v-on:change="changeDepartment">
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
			<select class="form-control" v-model="employeeID" v-on:change="changeDepartment">
			  <option v-for="option in employees" v-bind:value="option.id" v-bind:data-name="option.name">
				{{ option.name }}
			  </option>
			</select>
          </div>  		
		  
		  <div class="form-group">
            <label for="typeId">Resource</label>
			<select class="form-control" v-model="resourceID" v-on:change="changeDepartment">
			  <option v-for="option in resources" v-bind:value="option.id" v-bind:data-name="option.name">
				{{ option.name }}
			  </option>
			</select>
          </div>        

		  
          <div class="form-group">
            <label for="senderName">Price</label>
            <input type="text" class="form-control" id="senderName" placeholder="Price" v-model="price">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>
		  
          <div class="form-group">
            <label for="senderName">Quantity</label>
            <input type="text" class="form-control" id="senderName" placeholder="Quantity" v-model="quantity">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>

          <div class="form-group">
            <label for="senderPatronymic">Description</label>
            <textarea type="text" class="form-control" id="senderPatronymic1" placeholder="Description" v-model="description"></textarea>
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть по-батькові відправника.
            </div>
          </div>
 		  
          <div class="form-group">
            <label for="senderName">Total</label>
            <input type="text" class="form-control" id="senderName" placeholder="Total" v-model="total" readonly>
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>
		  
		  <div class="d-flex justify-content-center" style="margin-top: 30px;">
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
			invoiceID: '',
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
			loading: true
		}
	},
	created() {
		this.getProjects();
		this.getDepartments();
		this.notification = {
			title: 'Something went wrong',
			message: 'Server responded with status code error',
			important: true
		}
		this.notification1 = {
			title: 'Item created',
			message: `Item was created successfully`
		}
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
		addItem() {
			this.loading = true;
			this.$http.post(appConfig.URL + 'inputs/add', {                
					id: + new Date,
					invoiceID: this.invoiceID,
					date: this.date,
					price: this.price,				
					quantity: this.quantity,	
					total: this.total,	
					description: this.description,
					
					project: this.projectName,
					projectID: this.projectID,						
					
					department: this.departmentName,
					departmentID: this.departmentID,					
					
					employee: this.employeeName,
					employeeID: this.employeeID,
					
					product: this.productName,
					productID: this.productID,
					
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
	    changeDepartment (e) {
			if(e.target.options.selectedIndex > -1) {
				this.departmentName = e.target.options[e.target.options.selectedIndex].dataset.name
			}
		  },	
	}
}
</script>
