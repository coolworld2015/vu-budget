<template>
  <div v-if="loading">
    <div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
      <img src="../../assets/img/loading.gif">
    </div>
  </div>

  <div v-else>
	<div style="margin: auto; width: 25%; font-size: 22px; font-weight: bold; margin-bottom: 10px;">
		<div style="text-align: center; padding-right: 40px;">{{ name }}</div>
	</div>
    <form class="payment-form payment-form--create d-flex justify-content-stretch" autocomplete="off">
      <fieldset class="sender-data form-section-wrapper">
        <div class="form-section" style="width: 100%;">
          <div class="form-group">
            <label for="senderSurname">Name</label>
            <input type="text" class="form-control" id="senderSurname" placeholder="Name" v-model="name" readonly>
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть прізвище відправника.
            </div>
          </div>

          <div class="form-group">
            <label for="senderName">Address</label>
            <input type="text" class="form-control" id="senderName" placeholder="Address" v-model="address">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>

          <div class="form-group">
            <label for="senderPatronymic">Phone</label>
            <input type="text" class="form-control" id="senderPatronymic1" placeholder="Phone" v-model="phone">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть по-батькові відправника.
            </div>
          </div>
		  
          <div class="form-group">
            <label for="senderPatronymic">Description</label>
            <input type="text" class="form-control" id="senderPatronymic1" placeholder="Description" v-model="description">
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
			<button class="btn btn-danger" v-on:click="updateItem" style="margin: 10px; width: 100px; font-size: 14px;">Submit</button>
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
	name: 'projects-edit',
	data() {
		return {
			name: '',
			address: '',
			phone: '',
			description: '',
			sum: '',
			loading: false
		}
	},
	created() {
		if (!appConfig.project) {
			this.$router.push('/projects');
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
				if (appConfig.project) {
					this.id = appConfig.project.id;
					this.name = appConfig.project.name;
					this.address = appConfig.project.address;
					this.phone = appConfig.project.phone;
					this.sum = ((+appConfig.project.sum).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
					this.description = appConfig.project.description;
				}
			}
		},
		goBack() {
			this.$router.push('/projects');
		},
		deleteConfirm() {
			appConfig.$emit('showModal', {
			  elName: 'modal-confirmation',
			  confirm: this.deleteItem,
			  html: `Are you sure want to delete resource <span class="confirm-amount">${ this.name }?</span>`
			})
		},
		deleteItem() {
			this.loading = true;
			this.$http.post(appConfig.URL + 'projects/delete', {
				id: this.id,
				authorization: appConfig.access_token
			})
			.then(result => {
				if (result.body.error) {
				appConfig.notifications.items.push(this.notification);
				} else {
				appConfig.notifications.items.push(this.notification1);
				}
				this.$router.push('/projects');
			})
			.catch((error)=> {
				appConfig.notifications.items.push(this.notification);
				this.$router.push('/projects');
			})
		},
		updateItem() {
			this.loading = true;
			this.$http.post(appConfig.URL + 'projects/update', {                
				id: this.id,
				name: this.name,
				phone: this.phone,
				address: this.address,
				sum: appConfig.project.sum,
				description: this.description,
				authorization: appConfig.access_token
			})
			.then(result => {
				if (result.body.errors) {
				appConfig.notifications.items.push(this.notification);
				} else {
				appConfig.notifications.items.push(this.notification2);
				}
				this.$router.push('/projects');
			})
			.catch((error)=> {
				appConfig.notifications.items.push(this.notification);
				this.$router.push('/projects');
			})
		},
	}
}
</script>
