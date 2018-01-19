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
	name: 'reports-edit',
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
		if (!appConfig.report) {
			this.$router.push('/reports');
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
				if (appConfig.report) {
					this.id = appConfig.report.id;
					this.invoiceID = appConfig.report.invoiceID;
					this.date = appConfig.report.date;
					this.project = appConfig.report.project;
					this.projectID = appConfig.report.projectID;
					this.employee = appConfig.report.employee;
					this.employeeID = appConfig.report.employeeID;
					this.department = appConfig.report.department;
					this.departmentID = appConfig.report.departmentID;
					this.product = appConfig.report.product;
					this.productID = appConfig.report.productID;
					this.price = ((+appConfig.report.price).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
					this.quantity = ((+appConfig.report.quantity).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
					this.sum = ((+appConfig.report.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
					this.description = appConfig.report.description;
				}
			}
		},
		goBack() {
			this.$router.push('/report-details');
		} 
	}
}
</script>
