<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<outputs-header></outputs-header> 
					<outputs-items></outputs-items>
				</section>
				<outputs-footer></outputs-footer> 
			</main>
		</div>

	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import outputsHeader from '@/components/outputs/header';
import outputsItems from '@/components/outputs/items';
import outputsFooter from '@/components/outputs/footer';

export default {
  name: 'outputs',
  data () {
    return {
      route: 'Outputs'
    }
  },
	created() {
		if (!appConfig.access_token) {
			this.$router.push('/login');
		} 	
		appConfig.route = this.route;			
	},
	components: {
		navbar,
		outputsHeader,
		outputsItems,
		outputsFooter
	}
}
</script>
