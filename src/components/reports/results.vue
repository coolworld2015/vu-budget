<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
 					<report-results></report-results>
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
import reportResults from '@/components/reports/report-results';
import inputsFooter from '@/components/reports/footer';

export default {
  name: 'reports',
  data () {
    return {
      route: 'Reports'
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
		reportResults,
		inputsFooter
	}
}
</script>
