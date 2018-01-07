<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results" style="overflow:auto;">
					<reports-form></reports-form>
				</section>
			</main>
		</div>

	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import reportsForm from '@/components/reports/reports-form';

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
		reportsForm
	}
}
</script>
