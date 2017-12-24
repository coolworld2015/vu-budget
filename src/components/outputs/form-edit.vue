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
	name: 'outputs-edit',
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
		if (!appConfig.output) {
			this.$router.push('/outputs');
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
				if (appConfig.output) {
					this.id = appConfig.output.id;
					this.invoiceID = appConfig.output.invoiceID;
					this.date = appConfig.output.date;
					this.project = appConfig.output.project;
					this.projectID = appConfig.output.projectID;
					this.employee = appConfig.output.employee;
					this.employeeID = appConfig.output.employeeID;
					this.department = appConfig.output.department;
					this.departmentID = appConfig.output.departmentID;
					this.product = appConfig.output.product;
					this.productID = appConfig.output.productID;
					this.price = ((+appConfig.output.price).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
					this.quantity = ((+appConfig.output.quantity).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
					this.sum = ((+appConfig.output.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
					this.description = appConfig.output.description;
				}
			}
		},
		goBack() {
			this.$router.push('/outputs');
		},
		deleteConfirm() {
			appConfig.$emit('showModal', {
			  elName: 'modal-confirmation',
			  confirm: this.deleteItem,
			  html: `Are you sure want to delete invoiceID <span class="confirm-amount">${ this.invoiceID }?</span>`
			})
		},
		deleteItem() {
			this.loading = true;
			this.$http.post(appConfig.URL + 'outputs/delete', {
				id: appConfig.output.id,
				date: appConfig.output.date,
				project: appConfig.output.project,
				projectID: appConfig.output.projectID,
				employee: appConfig.output.employee,
				employeeID: appConfig.output.employeeID,
				department: appConfig.output.department,
				departmentID: appConfig.output.departmentID,
				product: appConfig.output.product,
				productID: appConfig.output.productID,
				invoiceID: appConfig.output.invoiceID,
				price: appConfig.output.price,
				quantity: appConfig.output.quantity,
				total: appConfig.output.total,
				description: appConfig.output.description,
				authorization: appConfig.access_token
			})
			.then(result => {
				if (result.body.error) {
				appConfig.notifications.items.push(this.notification);
				} else {
				appConfig.notifications.items.push(this.notification1);
				}
				this.$router.push('/outputs');
			})
			.catch((error)=> {
				appConfig.notifications.items.push(this.notification);
				this.$router.push('/outputs');
			})
		},
		updateItem() {
			this.loading = true;
			this.$http.post(appConfig.URL + 'outputs/update', {                
				id: this.id,
				name: this.name,
				phone: this.phone,
				address: this.address,
				department: appConfig.output.department,
				departmentID: appConfig.output.departmentID,
				sum: appConfig.output.sum,
				description: this.description,
				authorization: appConfig.access_token
			})
			.then(result => {
				if (result.body.error) {
				appConfig.notifications.items.push(this.notification);
				} else {
				appConfig.notifications.items.push(this.notification2);
				}
				this.$router.push('/outputs');
			})
			.catch((error)=> {
				appConfig.notifications.items.push(this.notification);
				this.$router.push('/outputs');
			})
		},
	}
}
</script>
