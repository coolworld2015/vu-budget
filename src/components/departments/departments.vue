<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<departments-header></departments-header> 
					<departments-items></departments-items>
				</section>
				<departments-footer></departments-footer> 
			</main>
		</div>

	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import departmentsHeader from '@/components/departments/header';
import departmentsItems from '@/components/departments/items';
import departmentsFooter from '@/components/departments/footer';

export default {
  name: 'projects',
  data () {
    return {
      route: 'Departments'
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
		departmentsHeader,
		departmentsItems,
		departmentsFooter
	}
}
</script>
