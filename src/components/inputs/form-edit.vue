<template>
  <div v-if="loading">
    <div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
      <img src="../../assets/img/loading.gif">
    </div>
  </div>

  <div v-else>
	<div style="margin: auto; width: 25%; font-size: 22px; font-weight: bold; margin-bottom: 10px;">
		<div style="text-align: center; padding-right: 40px;">InvoiceID: {{ invoiceID }}</div>
	</div>
    <form class="payment-form payment-form--create d-flex justify-content-stretch" autocomplete="off">
      <fieldset class="sender-data form-section-wrapper">
        <div class="form-section" style="width: 100%;">
          <div class="form-group">
            <label for="senderSurname">InvoiceID</label>
            <input type="text" class="form-control" id="senderSurname" placeholder="invoiceID" v-model="invoiceID" readonly>
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть прізвище відправника.
            </div>
          </div>
		  
          <div class="form-group">
            <label for="senderName">Date</label>
            <input type="text" class="form-control" id="senderName" placeholder="date" v-model="date" readonly>
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>
		  
          <div class="form-group">
            <label for="senderName">Project</label>
            <input type="text" class="form-control" id="senderName" placeholder="Project" v-model="project" readonly>
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>
		  
          <div class="form-group">
            <label for="senderName">Department</label>
            <input type="text" class="form-control" id="senderName" placeholder="Department" v-model="department" readonly>
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>		  
		  
          <div class="form-group">
            <label for="senderName">Employee</label>
            <input type="text" class="form-control" id="senderName" placeholder="Employee" v-model="employee" readonly>
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>	
		  
          <div class="form-group">
            <label for="senderName">Product</label>
            <input type="text" class="form-control" id="senderName" placeholder="Product" v-model="product" readonly>
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>		  
		  
          <div class="form-group">
            <label for="senderName">Price</label>
            <input type="text" class="form-control" id="senderName" placeholder="Price" v-model="price" readonly>
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>		 
		  
          <div class="form-group">
            <label for="senderName">Quantity</label>
            <input type="text" class="form-control" id="senderName" placeholder="Quantity" v-model="quantity" readonly>
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>
		  
          <div class="form-group">
            <label for="senderPatronymic">Description</label>
            <input type="text" class="form-control" id="senderPatronymic1" placeholder="Description" v-model="description" readonly>
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть по-батькові відправника.
            </div>
          </div>
		  
          <div class="form-group">
            <label for="senderName">Total</label>
            <input type="text" class="form-control" id="senderName" placeholder="Total" v-model="sum" readonly>
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>
 
		  <div class="d-flex justify-content-center" style="margin-top: 30px;">
			<button class="btn btn-danger" v-on:click="goBack" style="margin: 10px; width: 100px; font-size: 14px;">Back</button>
			<button class="btn btn-danger" v-on:click="deleteConfirm" style="margin: 10px; width: 100px; font-size: 14px;">Delete</button>
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
	name: 'inputs-edit',
	data() {
		return {
			invoiceID: '',
			employee: '',
			date: '',
			description: '',
			sum: '',
			loading: false
		}
	},
	created() {
		if (!appConfig.input) {
			this.$router.push('/inputs');
		} else {
			this.setData();
			this.notification = {
				title: 'Something went wrong',
				message: 'Server responded with status code error',
				important: true
			}
			this.notification1 = {
				title: 'Item deleted',
				message: `Item was deleted successfully`
			}			
			this.notification2 = {
				title: 'Item updated',
				message: `Item was updated successfully`
			}
		}
	},
	methods: {
		setData() {
			if (appConfig) {
				if (appConfig.input) {
					this.id = appConfig.input.id;
					this.invoiceID = appConfig.input.invoiceID;
					this.date = appConfig.input.date;
					this.project = appConfig.input.project;
					this.projectID = appConfig.input.projectID;
					this.employee = appConfig.input.employee;
					this.employeeID = appConfig.input.employeeID;
					this.department = appConfig.input.department;
					this.departmentID = appConfig.input.departmentID;
					this.product = appConfig.input.product;
					this.productID = appConfig.input.productID;
					this.price = ((+appConfig.input.price).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
					this.quantity = ((+appConfig.input.quantity).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
					this.sum = ((+appConfig.input.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
					this.description = appConfig.input.description;
				}
			}
		},
		goBack() {
			this.$router.push('/inputs');
		},
		deleteConfirm() {
			appConfig.$emit('showModal', {
			  elName: 'modal-confirmation',
			  confirm: this.deleteItem,
			  html: `Are you sure want to delete resource <span class="confirm-amount">${ this.invoiceID }?</span>`
			})
		},
		deleteItem() {
			this.loading = true;
			this.$http.post(appConfig.URL + 'inputs/delete', {
				id: appConfig.input.id,
				date: appConfig.input.date,
				project: appConfig.input.project,
				projectID: appConfig.input.projectID,
				employee: appConfig.input.employee,
				employeeID: appConfig.input.employeeID,
				department: appConfig.input.department,
				departmentID: appConfig.input.departmentID,
				product: appConfig.input.product,
				productID: appConfig.input.productID,
				invoiceID: appConfig.input.invoiceID,
				price: appConfig.input.price,
				quantity: appConfig.input.quantity,
				total: appConfig.input.total,
				description: appConfig.input.description,
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
		updateItem() {
			this.loading = true;
			this.$http.post(appConfig.URL + 'inputs/update', {                
				id: this.id,
				name: this.name,
				phone: this.phone,
				address: this.address,
				department: appConfig.input.department,
				departmentID: appConfig.input.departmentID,
				sum: appConfig.input.sum,
				description: this.description,
				authorization: appConfig.access_token
			})
			.then(result => {
				if (result.body.error) {
				appConfig.notifications.items.push(this.notification);
				} else {
				appConfig.notifications.items.push(this.notification2);
				}
				this.$router.push('/inputs');
			})
			.catch((error)=> {
				appConfig.notifications.items.push(this.notification);
				this.$router.push('/inputs');
			})
		},
	}
}
</script>
