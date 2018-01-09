<template>
	<section class="activated-payments d-flex justify-content-start align-items-center shown" id="activatedPayments">
		<div class="activated-payments-item">
			<span class="selected-payments" id="activatedPaymentsBox" style="width: 44px;">{{ inputsCount }}</span>
			Records
		</div>		
		
		<div class="activated-payments-item">
			<span class="selected-payments" id="activatedPaymentsBox" style="width: 100px; margin-left1: 400px;">{{ inputsTotal }}</span>
			Inputs
		</div>			
		
		<div class="activated-payments-item">
			<span class="selected-payments" id="activatedPaymentsBox" style="width: 44px;">{{ outputsCount }}</span>
			Records
		</div>		
		
		<div class="activated-payments-item">
			<span class="selected-payments" id="activatedPaymentsBox" style="width: 100px; margin-left1: 400px;">{{ outputsTotal }}</span>
			Outputs
		</div>		
		
		<div class="activated-payments-item">
			<span class="selected-payments" id="activatedPaymentsBox" style="width: 100px; margin-left1: 400px;">{{ total }}</span>
			Total
		</div>	

	</section>	
</template>

<script>
import appConfig from '../../main';

export default {
	name: 'inputs-footer',
	data() {
	  return {
		inputsCount: 0,
		inputsTotal: 0,
		inputs: 0,
		outputsCount: 0,
		outputsTotal: 0,
		outputs: 0,
		total: 0
	  }
	},
	created() {
		appConfig.$on('inputsCount', inputsCount => {
			
			this.inputsCount = inputsCount;
		})			
		appConfig.$on('outputsCount', outputsCount => {
			this.outputs = outputsCount;
			this.outputsCount = outputsCount;
		})			
		appConfig.$on('inputsTotal', inputsTotal => {
			this.inputs = inputsTotal;
			this.inputsTotal = ((+inputsTotal).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			this.total = (+this.inputs) - (+this.outputs);
			this.total = ((+this.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
		})			
		appConfig.$on('outputsTotal', outputsTotal => {
			this.outputs = outputsTotal;
			this.outputsTotal = ((+outputsTotal).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			this.total = (+this.inputs) - (+this.outputs);
			this.total = ((+this.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
		})		
	},
	methods: {		
		addItem(){
			this.$router.push('input-add');
		}	
	}
}
</script>
