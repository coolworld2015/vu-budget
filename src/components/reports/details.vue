<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
 
					<report-details></report-details>
				</section>
 
			</main>
		</div>

	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import inputsHeader from '@/components/inputs/header';
import reportDetails from '@/components/reports/report-details';
import inputsFooter from '@/components/inputs/footer';

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
		reportDetails,
		inputsFooter
	}
}
</script>
