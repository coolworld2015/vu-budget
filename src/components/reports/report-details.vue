<template>
  <div v-if="status === 'loading'">
    <div
      style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
      <img src="../../assets/img/loading.gif">
    </div>
  </div>

  <div v-else-if="status === 'show'" class="search-results-content">
	<div style="border-style: groove; float: left; width: 49%; margin:1px;">
    <div class="payment" v-for="item in inputs" v-on:click="showDetails(item)">
		  <div class="search-results-item search-results-choose" style="width: 5%;"><span class="circle"></span></div>

		  <div class="search-results-item search-results-sender" style="width: 15%;">{{ item.invoiceID }}</div>
		  <div class="search-results-item search-results-sender" style="width: 20%; right: 15px;">{{ item.project }}</div>
		  <div class="search-results-item search-results-sender" style="width: 20%; right: 40px;">{{ item.date }}</div>
		  <div class="search-results-item search-results-sender" style="width: 20%; right: 10px;">{{ item.description }}</div>
		  <div class="search-results-item search-results-transfer" style="width: 20%;">{{((+item.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}}</div>

	</div> 
	</div>    
	
	<div style="border-style: groove; float: left; width: 49%; margin:1px;">
	<div class="payment" v-for="item in outputs" v-on:click="showDetails(item)">
      <div class="search-results-item search-results-choose" style="width: 5%;"><span class="circle"></span></div>

      <div class="search-results-item search-results-sender" style="width: 15%;">{{ item.invoiceID }}</div>
      <div class="search-results-item search-results-sender" style="width: 20%; right: 15px;">{{ item.project }}</div>
      <div class="search-results-item search-results-sender" style="width: 20%; right: 40px;">{{ item.date }}</div>
      <div class="search-results-item search-results-sender" style="width: 20%; right: 10px;">{{ item.description }}</div>
      <div class="search-results-item search-results-transfer" style="width: 20%;">{{((+item.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}}</div>
	
	</div>
    </div>
  </div>

  <div v-else-if="status === 'error'">
    <div
      style="position: relative; top: 200px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; color: red; font-weight: bold; font-size:24px">
      Something went wrong
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import appConfig from '../../main';

export default {
	name: 'report-details',
	data() {
	  return {
		inputs: [],
		outputs: [],
		filteredItems: [],
		recordsCount: 20,
		positionY: 0,
		status: 'loading',
		clicked: false
	  }
	},
	created() {
		this.getInputs();
		this.getOutputs()
		
		this.notification = {
			title: 'Something went wrong',
			message: 'Server responded with status code error',
			important: true
		}
	},
	methods: {
		getInputs() {
			this.$http.get(appConfig.URL + 'inputs/get', {headers: {'Authorization': appConfig.access_token}})
				.then(result => {
					appConfig.inputs.items = result.data.sort(this.sort);
					this.inputs = result.data.sort(this.sort).slice(0, 20);
					this.filteredItems = result.data.sort(this.sort);
					this.status = 'show';
					appConfig.$emit('inputsCount', result.data.length);
					let total = 0;
					this.inputs.forEach((el) => total += +el.total);
					appConfig.$emit('inputsTotal', total);
					setTimeout(()=>{document.querySelector('.search-results-content').addEventListener('scroll', this.handleScroll)}, 100);
				}).catch((error)=> {
				console.log(error)
					appConfig.notifications.items.push(this.notification);
					this.status = 'show';
					this.$router.push('login');
				})
		},		
		getOutputs() {
			this.$http.get(appConfig.URL + 'outputs/get', {headers: {'Authorization': appConfig.access_token}})
				.then(result => {
					appConfig.outputs.items = result.data.sort(this.sort);
					this.outputs = result.data.sort(this.sort).slice(0, 20);
					this.filteredItems = result.data.sort(this.sort);
					this.status = 'show';
					appConfig.$emit('outputsCount', result.data.length);
					let total = 0;
					this.outputs.forEach((el) => total += +el.total);
					appConfig.$emit('outputsTotal', total);
					setTimeout(()=>{document.querySelector('.search-results-content').addEventListener('scroll', this.handleScroll)}, 100);
				}).catch((error)=> {
				console.log(error)
					appConfig.notifications.items.push(this.notification);
					this.status = 'show';
					this.$router.push('login');
				})
		},
		handleScroll() {
			var position = document.querySelector('.search-results-content').scrollTop;
			var items, positionY, recordsCount;
			recordsCount = this.recordsCount;
			positionY = this.positionY;
			items = this.filteredItems.slice(0, recordsCount);
			
			if (position > positionY) {
				this.items = items;
				this.recordsCount = recordsCount + 10;
				this.positionY = positionY + 400;
			}
		},
		onItem(item) {
			if (this.clicked) {
				this.clicked = false;
			} else {
				this.clicked = true;
			}
		},			
		showDetails(item){
			appConfig.input = item;
			this.$router.push('input-edit');
		},
		sort(a, b) {
			let nameA = +a.invoiceID, nameB = +b.invoiceID;
			if (nameA < nameB) {
				return 1
			}
			if (nameA > nameB) {
				return -1
			}
			return 0;
		}				
	}
}
</script>
