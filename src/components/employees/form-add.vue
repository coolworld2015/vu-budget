<template>
  <div v-if="loading">
    <div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
      <img src="../../assets/img/loading.gif">
    </div>
  </div>

  <div v-else>
	<div style="margin: auto; width: 25%; font-size: 22px; font-weight: bold; margin-bottom: 10px;">
		<div style="text-align: center; padding-right: 40px;">New employee</div>
	</div>
    <form class="payment-form payment-form--create d-flex justify-content-stretch" autocomplete="off">
      <fieldset class="sender-data form-section-wrapper">
        <div class="form-section" style="width: 100%;">
          
		  <div class="form-group">
            <label for="typeId">Department</label>
			<select class="form-control" v-model="departmentID" v-on:change="changeDepartment">
			  <option v-for="option in departments" v-bind:value="option.id" v-bind:data-name="option.name">
				{{ option.name }}
			  </option>
			</select>
          </div>        
		  
		  <div class="form-group">
            <label for="senderSurname">Name</label>
            <input type="text" class="form-control" id="senderSurname" placeholder="Name" v-model="name">
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
            <label for="senderName">Phone</label>
            <input type="text" class="form-control" id="senderName" placeholder="Phone" v-model="phone">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>

          <div class="form-group">
            <label for="senderPatronymic">Description</label>
            <input type="text" class="form-control" id="senderPatronymic1" placeholder="Description" v-model="description">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть по-батькові відправника.
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
	name: 'employees-add',
	data() {
		return {
			name: '',
			address: '',
			phone: '',
			description: '',
			loading: true,
			departments: [{id:0, name:'Select department'}],
			departmentName: '',
			departmentID: 0,
		}
	},
	created() {
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
			this.$router.push('/employees');
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
			this.$http.post(appConfig.URL + 'employees/add', {                
					id: + new Date,
					name: this.name,
					address: this.address,
					phone: this.phone,
					department: this.departmentName,
					departmentID: this.departmentID,
					sum: '0.00',
					description: this.description,
					authorization: appConfig.access_token
				})
				.then(result => {
					if (result.body.error) {
						appConfig.notifications.items.push(this.notification);
					} else {
						appConfig.notifications.items.push(this.notification1);
					}
					this.$router.push('/employees');
				})
				.catch((error)=> {
					appConfig.notifications.items.push(this.notification);
					this.$router.push('/employees');
				})
		},
	    changeDepartment (e) {
			if(e.target.options.selectedIndex > -1) {
				this.departmentName = e.target.options[e.target.options.selectedIndex].dataset.name
			}
		  },	
		  sort(a, b) {
			let nameA = a.name, nameB = b.name;
			if (nameA < nameB) {
				return -1
			}
			if (nameA > nameB) {
				return 1
			}
			return 0;
		}	
	}
}
</script>
