<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<inputs-header></inputs-header> 
					<inputs-items></inputs-items>
				</section>
				<inputs-footer></inputs-footer> 
			</main>
		</div>

	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import inputsHeader from '@/components/inputs/header';
import inputsItems from '@/components/inputs/items';
import inputsFooter from '@/components/inputs/footer';

export default {
  name: 'inputs',
  data () {
    return {
      route: 'Inputs'
    }
  },
	created() {
		appConfig.getAccessToken();
		if (appConfig.access_token == 'login') {
			this.$router.push('login');
		}
		
		appConfig.route = this.route;			
	},
	components: {
		navbar,
		inputsHeader,
		inputsItems,
		inputsFooter
	}
}
</script>
